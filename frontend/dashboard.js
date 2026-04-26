const API_URL = "http://localhost:8000";

// ===== AUTH GUARD =====
const session = JSON.parse(localStorage.getItem('kac_session') || 'null');
if (!session) {
  // User not logged in, redirect to auth page
  window.location.href = 'auth.html';
}

// Set user info
document.getElementById('userName').textContent = session.name;
document.getElementById('userEmail').textContent = session.email;
document.getElementById('userAv').textContent = session.name.charAt(0).toUpperCase();

function logout() {
  localStorage.removeItem('kac_session');
  window.location.href = 'index.html';
}

// ===== DISEASE NAME TRANSLATION =====
function translateDiseaseName(diseaseName) {
  // Try to get translation, fallback to original name
  const translated = t(diseaseName);
  return translated !== diseaseName ? translated : diseaseName.replace(/_/g, ' ');
}

// ===== SIDEBAR TOGGLE =====
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}

// ===== TABS =====
const tabTitles = {
  detect: ['detectDisease', 'uploadSubtitle'],
  history: ['scanHistory', 'historySubtitle'],
  fertilizer: ['fertilizerRecommendation', 'fertilizerSubtitle'],
  crops: ['supportedCrops', 'cropsSubtitle']
};

document.querySelectorAll('.side-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const tab = link.dataset.tab;
    
    // Update active link
    document.querySelectorAll('.side-link').forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    
    // Show tab
    document.querySelectorAll('.tab-panel').forEach(t => t.hidden = true);
    document.getElementById(`tab-${tab}`).hidden = false;
    
    // Update title
    document.getElementById('tabTitle').textContent = t(tabTitles[tab][0]);
    document.getElementById('tabSub').textContent = t(tabTitles[tab][1]);
    
    // Load history if needed
    if (tab === 'history') renderHistory();
    
    // Load fertilizer if needed
    if (tab === 'fertilizer') initFertilizerTab();
    
    // Close sidebar on mobile
    document.getElementById('sidebar').classList.remove('open');
  });
});

// ===== HEALTH CHECK =====
async function checkHealth() {
  const dot = document.getElementById('statusDot');
  const text = document.getElementById('statusText');
  try {
    const res = await fetch(`${API_URL}/health`);
    const data = await res.json();
    if (data.model_ready) {
      dot.className = 'sdot online';
      text.textContent = t('modelReady');
    } else {
      dot.className = 'sdot offline';
      text.textContent = t('modelNotLoaded');
    }
  } catch {
    dot.className = 'sdot offline';
    text.textContent = t('serverOffline');
  }
}
checkHealth();
setInterval(checkHealth, 15000);

// ===== UPLOAD =====
const uploadZone = document.getElementById('uploadZone');
const fileInput = document.getElementById('fileInput');
const uploadEmpty = document.getElementById('uploadEmpty');
const uploadImg = document.getElementById('uploadImg');
const previewImg = document.getElementById('previewImg');
const analyzeBtn = document.getElementById('analyzeBtn');
const resultBox = document.getElementById('resultBox');
const errorBox = document.getElementById('errorBox');

let selectedFile = null;
let lastImageDataURL = null;
let cameraStream = null;
let currentMode = 'upload';

function switchMode(mode) {
  currentMode = mode;
  const uploadBtn = document.getElementById('uploadBtn');
  const cameraBtn = document.getElementById('cameraBtn');
  const uploadZone = document.getElementById('uploadZone');
  const cameraZone = document.getElementById('cameraZone');
  
  if (mode === 'upload') {
    uploadBtn.classList.add('active');
    cameraBtn.classList.remove('active');
    uploadZone.hidden = false;
    cameraZone.hidden = true;
    stopCamera();
  } else {
    cameraBtn.classList.add('active');
    uploadBtn.classList.remove('active');
    uploadZone.hidden = true;
    cameraZone.hidden = false;
    startCamera();
  }
  
  resultBox.hidden = true;
  errorBox.hidden = true;
  analyzeBtn.disabled = true;
}

async function startCamera() {
  try {
    const video = document.getElementById('cameraVideo');
    cameraStream = await navigator.mediaDevices.getUserMedia({ 
      video: { facingMode: 'environment' } 
    });
    video.srcObject = cameraStream;
  } catch (err) {
    showError('Camera access denied. Please allow camera permissions.');
  }
}

function stopCamera() {
  if (cameraStream) {
    cameraStream.getTracks().forEach(track => track.stop());
    cameraStream = null;
  }
}

function capturePhoto() {
  const video = document.getElementById('cameraVideo');
  const canvas = document.getElementById('cameraCanvas');
  const ctx = canvas.getContext('2d');
  
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx.drawImage(video, 0, 0);
  
  canvas.toBlob(blob => {
    selectedFile = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' });
    lastImageDataURL = canvas.toDataURL('image/jpeg');
    
    // Show preview in upload zone
    previewImg.src = lastImageDataURL;
    uploadEmpty.hidden = true;
    uploadImg.hidden = false;
    analyzeBtn.disabled = false;
    
    // Switch back to upload view to show preview
    switchMode('upload');
  }, 'image/jpeg');
}

uploadZone.addEventListener('click', () => fileInput.click());

uploadZone.addEventListener('dragover', e => {
  e.preventDefault();
  uploadZone.classList.add('drag-over');
});

uploadZone.addEventListener('dragleave', () => {
  uploadZone.classList.remove('drag-over');
});

uploadZone.addEventListener('drop', e => {
  e.preventDefault();
  uploadZone.classList.remove('drag-over');
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith('image/')) loadPreview(file);
});

fileInput.addEventListener('change', () => {
  if (fileInput.files[0]) loadPreview(fileInput.files[0]);
});

function loadPreview(file) {
  selectedFile = file;
  const reader = new FileReader();
  reader.onload = e => {
    lastImageDataURL = e.target.result;
    previewImg.src = e.target.result;
    uploadEmpty.hidden = true;
    uploadImg.hidden = false;
    analyzeBtn.disabled = false;
    resultBox.hidden = true;
    errorBox.hidden = true;
  };
  reader.readAsDataURL(file);
}

// ===== ANALYZE =====
analyzeBtn.addEventListener('click', async () => {
  if (!selectedFile) return;

  const btnTxt = analyzeBtn.querySelector('.btn-txt');
  const btnLoad = analyzeBtn.querySelector('.btn-load');

  btnTxt.hidden = true;
  btnLoad.hidden = false;
  analyzeBtn.disabled = true;
  resultBox.hidden = true;
  errorBox.hidden = true;

  const formData = new FormData();
  formData.append('image', selectedFile);

  try {
    const res = await fetch(`${API_URL}/predict`, { method: 'POST', body: formData });
    const data = await res.json();

    if (data.error) {
      showError(data.error);
    } else {
      showResult(data);
      saveToHistory(data);
    }
  } catch {
    showError('Could not connect to the server. Make sure the backend is running on port 8000.');
  } finally {
    btnTxt.hidden = false;
    btnLoad.hidden = true;
    analyzeBtn.disabled = false;
  }
});

function showResult(data) {
  const isHealthy = data.disease.toLowerCase().includes('healthy');
  const ico = document.getElementById('resultIco');

  ico.className = isHealthy ? 'result-ico' : 'result-ico danger';
  ico.innerHTML = isHealthy 
    ? "<i class='bx bx-check-shield'></i>" 
    : "<i class='bx bx-shield-quarter'></i>";

  document.getElementById('diseaseName').textContent = translateDiseaseName(data.disease);
  document.getElementById('confText').textContent = `${data.confidence}%`;
  
  // Show detailed information
  if (!isHealthy) {
    // Symptoms
    const symptomsList = document.getElementById('symptomsList');
    symptomsList.innerHTML = data.symptoms.map(s => `<li>${s}</li>`).join('');
    
    // Treatment Steps
    const treatmentSteps = document.getElementById('treatmentSteps');
    treatmentSteps.innerHTML = data.treatment.map(t => `<li>${t}</li>`).join('');
    
    // Prevention Tips
    const preventionList = document.getElementById('preventionList');
    preventionList.innerHTML = data.prevention.map(p => `<li>${p}</li>`).join('');
    
    // Fertilizer Guide
    document.getElementById('fertName').textContent = data.fertilizer.name;
    document.getElementById('fertDosage').textContent = data.fertilizer.dosage;
    document.getElementById('fertFrequency').textContent = data.fertilizer.frequency;
    document.getElementById('fertMethod').textContent = data.fertilizer.method;
    
    // Recovery Time
    document.getElementById('recoveryText').textContent = data.recovery_time;
    
    document.getElementById('symptomsSection').hidden = false;
    document.getElementById('treatmentSection').hidden = false;
    document.getElementById('preventionSection').hidden = false;
    document.getElementById('fertilizerSection').hidden = false;
    document.getElementById('recoverySection').hidden = false;
  } else {
    document.getElementById('symptomsSection').hidden = true;
    document.getElementById('treatmentSection').hidden = true;
    document.getElementById('preventionSection').hidden = true;
    document.getElementById('fertilizerSection').hidden = true;
    document.getElementById('recoverySection').hidden = true;
  }

  resultBox.hidden = false;

  // Animate confidence bar
  const fill = document.getElementById('confFill');
  fill.style.width = '0%';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      fill.style.width = `${data.confidence}%`;
    });
  });
}

function showError(msg) {
  document.getElementById('errorText').textContent = msg;
  errorBox.hidden = false;
}

function formatLabel(label) {
  // Create translation mapping for disease names
  const diseaseTranslations = {
    'Potato___Late_blight': { en: 'Potato — Late Blight', hi: 'आलू — लेट ब्लाइट', mr: 'बटाटा — लेट ब्लाइट' },
    'Potato___Early_blight': { en: 'Potato — Early Blight', hi: 'आलू — अर्ली ब्लाइट', mr: 'बटाटा — अर्ली ब्लाइट' },
    'Potato___healthy': { en: 'Potato — Healthy', hi: 'आलू — स्वस्थ', mr: 'बटाटा — निरोगी' },
    'Tomato_Early_blight': { en: 'Tomato — Early Blight', hi: 'टमाटर — अर्ली ब्लाइट', mr: 'टोमॅटो — अर्ली ब्लाइट' },
    'Tomato_Late_blight': { en: 'Tomato — Late Blight', hi: 'टमाटर — लेट ब्लाइट', mr: 'टोमॅटो — लेट ब्लाइट' },
    'Tomato_Bacterial_spot': { en: 'Tomato — Bacterial Spot', hi: 'टमाटर — बैक्टीरियल स्पॉट', mr: 'टोमॅटो — बॅक्टेरियल स्पॉट' },
    'Tomato_Leaf_Mold': { en: 'Tomato — Leaf Mold', hi: 'टमाटर — लीफ मोल्ड', mr: 'टोमॅटो — लीफ मोल्ड' },
    'Tomato_Septoria_leaf_spot': { en: 'Tomato — Septoria Leaf Spot', hi: 'टमाटर — सेप्टोरिया लीफ स्पॉट', mr: 'टोमॅटो — सेप्टोरिया लीफ स्पॉट' },
    'Tomato_Spider_mites_Two_spotted_spider_mite': { en: 'Tomato — Spider Mites', hi: 'टमाटर — स्पाइडर माइट्स', mr: 'टोमॅटो — स्पायडर माइट्स' },
    'Tomato__Target_Spot': { en: 'Tomato — Target Spot', hi: 'टमाटर — टारगेट स्पॉट', mr: 'टोमॅटो — टार्गेट स्पॉट' },
    'Tomato__Tomato_YellowLeaf__Curl_Virus': { en: 'Tomato — Yellow Leaf Curl Virus', hi: 'टमाटर — येलो लीफ कर्ल वायरस', mr: 'टोमॅटो — यलो लीफ कर्ल व्हायरस' },
    'Tomato__Tomato_mosaic_virus': { en: 'Tomato — Mosaic Virus', hi: 'टमाटर — मोज़ेक वायरस', mr: 'टोमॅटो — मोझेक व्हायरस' },
    'Tomato_healthy': { en: 'Tomato — Healthy', hi: 'टमाटर — स्वस्थ', mr: 'टोमॅटो — निरोगी' },
    'Pepper__bell___Bacterial_spot': { en: 'Pepper — Bacterial Spot', hi: 'मिर्च — बैक्टीरियल स्पॉट', mr: 'मिरची — बॅक्टेरियल स्पॉट' },
    'Pepper__bell___healthy': { en: 'Pepper — Healthy', hi: 'मिर्च — स्वस्थ', mr: 'मिरची — निरोगी' }
  };

  const lang = getCurrentLanguage();
  if (diseaseTranslations[label] && diseaseTranslations[label][lang]) {
    return diseaseTranslations[label][lang];
  }
  
  // Fallback to original formatting
  return label.replace(/___/g, ' — ').replace(/_/g, ' ');
}

// ===== HISTORY =====
function saveToHistory(data) {
  const history = JSON.parse(localStorage.getItem('kac_history') || '[]');
  history.unshift({
    disease: data.disease,
    confidence: data.confidence,
    symptoms: data.symptoms,
    treatment: data.treatment,
    prevention: data.prevention,
    fertilizer: data.fertilizer,
    recovery_time: data.recovery_time,
    image: lastImageDataURL,
    date: new Date().toLocaleString(),
    user: session.email
  });
  localStorage.setItem('kac_history', JSON.stringify(history.slice(0, 50)));
}

function renderHistory() {
  const history = JSON.parse(localStorage.getItem('kac_history') || '[]')
    .filter(h => h.user === session.email);
  
  const list = document.getElementById('historyList');
  const empty = document.getElementById('historyEmpty');
  const count = document.getElementById('historyCount');

  if (history.length === 0) {
    list.innerHTML = '';
    empty.hidden = false;
    count.textContent = '';
    return;
  }

  empty.hidden = true;
  const scanWord = history.length > 1 ? t('scans') : t('scan');
  count.textContent = `${history.length} ${scanWord}`;

  list.innerHTML = history.map(h => {
    const isHealthy = h.disease.toLowerCase().includes('healthy');
    return `
      <div class="history-item">
        <div class="history-img">
          ${h.image ? `<img src="${h.image}" alt="scan"/>` : `<i class='bx bx-image-alt'></i>`}
        </div>
        <div class="history-info">
          <h4>${translateDiseaseName(h.disease)}</h4>
          <p class="history-date"><i class='bx bx-time'></i> ${h.date}</p>
          ${!isHealthy && h.fertilizer ? `<p class="history-treat"><strong>${t('fertilizer')}:</strong> ${h.fertilizer.name} - ${h.fertilizer.dosage}</p>` : ''}
          ${!isHealthy && h.recovery_time ? `<p class="history-treat"><strong>${t('recovery')}:</strong> ${h.recovery_time}</p>` : ''}
        </div>
        <div class="history-badge ${isHealthy ? 'badge-healthy' : 'badge-disease'}">
          ${h.confidence}%
        </div>
      </div>
    `;
  }).join('');
}

function clearHistory() {
  if (!confirm('Clear all scan history?')) return;
  const history = JSON.parse(localStorage.getItem('kac_history') || '[]')
    .filter(h => h.user !== session.email);
  localStorage.setItem('kac_history', JSON.stringify(history));
  renderHistory();
}

// ===== VIEW FERTILIZER GUIDE =====
function viewFertilizerGuide(cropId) {
  // Switch to fertilizer tab
  document.querySelectorAll('.side-link').forEach(l => l.classList.remove('active'));
  document.querySelector('[data-tab="fertilizer"]').classList.add('active');
  
  document.querySelectorAll('.tab-panel').forEach(t => t.hidden = true);
  document.getElementById('tab-fertilizer').hidden = false;
  
  document.getElementById('tabTitle').textContent = t('fertilizerRecommendation');
  document.getElementById('tabSub').textContent = t('fertilizerSubtitle');
  
  // Close sidebar on mobile
  document.getElementById('sidebar').classList.remove('open');
  
  // Initialize fertilizer tab first
  if (!document.getElementById('fertCropsGrid').innerHTML) {
    initFertilizerTab();
  }
  
  // Wait a bit then select the crop
  setTimeout(() => {
    if (FERTILIZER_DATA.crops[cropId]) {
      selectCrop(cropId);
    }
  }, 200);
  
  // Scroll to top
  setTimeout(() => {
    const panel = document.getElementById('tab-fertilizer');
    if (panel) panel.scrollTop = 0;
  }, 300);
}

// ===== LANGUAGE SUPPORT =====
// Initialize language on page load
window.addEventListener('DOMContentLoaded', () => {
  const currentLang = getCurrentLanguage();
  document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
  document.getElementById(`lang-${currentLang}`).classList.add('active');
  updatePageLanguage();
});

// Override setLanguage to update UI
window.setLanguage = function(lang) {
  localStorage.setItem('kac_language', lang);
  
  // Update active button
  document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
  document.getElementById(`lang-${lang}`).classList.add('active');
  
  // Update all translations
  updatePageLanguage();
  
  // Update tab titles
  const activeTab = document.querySelector('.side-link.active').dataset.tab;
  document.getElementById('tabTitle').textContent = t(tabTitles[activeTab][0]);
  document.getElementById('tabSub').textContent = t(tabTitles[activeTab][1]);
  
  // Update status text
  checkHealth();
  
  // Re-render history if on history tab
  if (!document.getElementById('tab-history').hidden) {
    renderHistory();
  }
  
  // Re-render fertilizer if on fertilizer tab
  if (!document.getElementById('tab-fertilizer').hidden) {
    initFertilizerTab();
  }
};


// ===== FERTILIZER TAB =====
let currentCategory = 'all';
let currentCrop = null;
let currentDisease = null;
let fertilizerInitialized = false;

function initFertilizerTab() {
  if (!fertilizerInitialized) {
    setupCategoryButtons();
    setupFertilizerSearch();
    fertilizerInitialized = true;
  }
  renderCrops();
}

function setupCategoryButtons() {
  document.querySelectorAll('.fert-cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.fert-cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.dataset.category;
      renderCrops();
    });
  });
}

function setupFertilizerSearch() {
  const searchInput = document.getElementById('fertSearch');
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    renderCrops(query);
  });
}

function renderCrops(searchQuery = '') {
  const grid = document.getElementById('fertCropsGrid');
  let filtered = Object.values(FERTILIZER_DATA.crops);
  
  if (currentCategory !== 'all') {
    filtered = filtered.filter(c => c.category === currentCategory);
  }
  
  if (searchQuery) {
    filtered = filtered.filter(c => 
      c.name.toLowerCase().includes(searchQuery) ||
      c.diseases.some(d => d.toLowerCase().includes(searchQuery))
    );
  }
  
  grid.innerHTML = filtered.map(crop => `
    <div class="fert-crop-card" data-crop-id="${crop.id}">
      <div class="fert-crop-image" style="background-image: url('${crop.image || 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400'}');"></div>
      <div class="fert-crop-content">
        <div class="fert-crop-icon">${crop.icon}</div>
        <h4>${crop.name}</h4>
        <p>${crop.diseases.length} diseases</p>
      </div>
    </div>
  `).join('');
  
  // Add click event listeners to all crop cards
  document.querySelectorAll('.fert-crop-card').forEach(card => {
    card.addEventListener('click', function() {
      const cropId = this.getAttribute('data-crop-id');
      console.log('Crop clicked:', cropId);
      selectCrop(cropId);
    });
  });
  
  document.getElementById('fertCropsGrid').hidden = false;
  document.getElementById('fertDiseaseSection').hidden = true;
  document.getElementById('fertRecommendationSection').hidden = true;
}

function selectCrop(cropId) {
  console.log('selectCrop called with:', cropId);
  
  if (!FERTILIZER_DATA.crops[cropId]) {
    console.error('Crop not found:', cropId);
    return;
  }
  
  currentCrop = FERTILIZER_DATA.crops[cropId];
  console.log('Current crop set to:', currentCrop);
  
  document.getElementById('fertCropTitle').textContent = `${currentCrop.icon} ${currentCrop.name} Diseases`;
  
  const grid = document.getElementById('fertDiseasesGrid');
  grid.innerHTML = currentCrop.diseases.map(diseaseId => {
    const disease = FERTILIZER_DATA.diseases[diseaseId];
    if (!disease) {
      console.error('Disease not found:', diseaseId);
      return '';
    }
    
    const severityClass = disease.severity.toLowerCase();
    const diseaseImages = {
      'tomato_early_blight': 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=300&fit=crop',
      'tomato_late_blight': 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=300&fit=crop',
      'tomato_bacterial_spot': 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=300&fit=crop',
      'tomato_leaf_mold': 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=300&fit=crop',
      'tomato_septoria': 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=300&fit=crop',
      'potato_early_blight': 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=300&fit=crop',
      'potato_late_blight': 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=300&fit=crop',
      'pepper_bacterial_spot': 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=300&fit=crop',
      'wheat_rust': 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop',
      'wheat_powdery_mildew': 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop',
      'wheat_leaf_blight': 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop',
      'wheat_smut': 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop',
      'sugarcane_red_rot': 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop',
      'sugarcane_smut': 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop',
      'sugarcane_rust': 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop',
      'cotton_leaf_curl': 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop',
      'cotton_bacterial_blight': 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop',
      'cotton_fusarium_wilt': 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop',
      'cotton_root_rot': 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop',
      'rose_black_spot': 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop',
      'rose_powdery_mildew': 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop',
      'rose_rust': 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop',
      'marigold_leaf_spot': 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop',
      'marigold_root_rot': 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop',
      'mango_anthracnose': 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop',
      'mango_powdery_mildew': 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop',
      'mango_bacterial_canker': 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop',
      'apple_scab': 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop',
      'apple_fire_blight': 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop',
      'neem_leaf_spot': 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop'
    };
    const diseaseImage = diseaseImages[diseaseId] || 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=300&fit=crop';
    
    return `
      <div class="fert-disease-card" data-disease-id="${diseaseId}">
        <div class="fert-disease-image" style="background-image: url('${diseaseImage}');"></div>
        <div class="fert-disease-content">
          <div class="fert-disease-icon">${disease.icon}</div>
          <h4>${disease.name}</h4>
          <span class="fert-severity ${severityClass}">${disease.severity}</span>
          <p>${disease.description}</p>
        </div>
      </div>
    `;
  }).join('');
  
  // Add click event listeners to disease cards
  document.querySelectorAll('.fert-disease-card').forEach(card => {
    card.addEventListener('click', function() {
      const diseaseId = this.getAttribute('data-disease-id');
      console.log('Disease clicked:', diseaseId);
      selectDisease(diseaseId);
    });
  });
  
  document.getElementById('fertCropsGrid').hidden = true;
  document.getElementById('fertDiseaseSection').hidden = false;
  document.getElementById('fertRecommendationSection').hidden = true;
  
  // Scroll to top
  document.getElementById('tab-fertilizer').scrollTop = 0;
}

function selectDisease(diseaseId) {
  currentDisease = FERTILIZER_DATA.diseases[diseaseId];
  
  document.getElementById('fertRecIcon').textContent = currentDisease.icon;
  document.getElementById('fertRecDiseaseName').textContent = currentDisease.name;
  document.getElementById('fertRecDiseaseDesc').textContent = currentDisease.description;
  
  const fertList = document.getElementById('fertRecList');
  fertList.innerHTML = currentDisease.fertilizers.map(fertId => {
    const fert = FERTILIZER_DATA.fertilizers[fertId];
    
    // Fertilizer-specific images
    const fertilizerImages = {
      'fert_mancozeb': 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop',
      'fert_metalaxyl': 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop',
      'fert_copper_oxy': 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop',
      'fert_copper_hydrox': 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop',
      'fert_azoxystrobin': 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop',
      'fert_chlorothalonil': 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop',
      'fert_tebuconazole': 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop',
      'fert_sulfur': 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop',
      'fert_myclobutanil': 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop',
      'fert_fosetyl_al': 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop',
      'fert_carbendazim': 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop',
      'fert_streptocycline': 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop',
      'fert_captan': 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop',
      'fert_streptomycin': 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop',
      'fert_propiconazole': 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop',
      'fert_carboxin': 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop',
      'fert_imidacloprid': 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop'
    };
    const fertImage = fertilizerImages[fertId] || 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop';
    
    return `
      <div class="fert-rec-item">
        <div class="fert-rec-item-image" style="background-image: url('${fertImage}');"></div>
        <div class="fert-rec-item-body">
          <div class="fert-rec-item-header">
            <h5>${fert.name}</h5>
            <span class="fert-type-badge">${fert.type}</span>
          </div>
          <div class="fert-rec-details">
            <div class="fert-detail">
              <i class='bx bx-droplet'></i>
              <div>
                <strong>Dosage</strong>
                <p>${fert.dosage}</p>
              </div>
            </div>
            <div class="fert-detail">
              <i class='bx bx-time'></i>
              <div>
                <strong>Frequency</strong>
                <p>${fert.frequency}</p>
              </div>
            </div>
            <div class="fert-detail">
              <i class='bx bx-area'></i>
              <div>
                <strong>Coverage</strong>
                <p>${fert.coverage}</p>
              </div>
            </div>
          </div>
          <div class="fert-instructions">
            <strong><i class='bx bx-list-ul'></i> Application Instructions:</strong>
            <ol>
              ${fert.instructions.map(inst => `<li>${inst}</li>`).join('')}
            </ol>
          </div>
          <div class="fert-safety">
            <strong><i class='bx bx-shield'></i> Safety:</strong>
            <p>${fert.safety}</p>
          </div>
          <div class="fert-results">
            <strong><i class='bx bx-check-circle'></i> Expected Results:</strong>
            <p>${fert.expectedResults}</p>
          </div>
        </div>
      </div>
    `;
  }).join('');
  
  document.getElementById('fertDiseaseSection').hidden = true;
  document.getElementById('fertRecommendationSection').hidden = false;
  
  // Scroll to top
  document.getElementById('tab-fertilizer').scrollTop = 0;
}

function backToCrops() {
  currentCrop = null;
  renderCrops();
}

function backToDiseases() {
  currentDisease = null;
  selectCrop(currentCrop.id);
}
