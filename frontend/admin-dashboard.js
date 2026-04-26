const API_URL = "http://localhost:8000";

// ===== AUTH GUARD =====
const adminSession = JSON.parse(localStorage.getItem('kac_admin_session') || 'null');
if (!adminSession) {
  window.location.href = 'admin-login.html';
}

function adminLogout() {
  localStorage.removeItem('kac_admin_session');
  window.location.href = 'admin-login.html';
}

// ===== SIDEBAR TOGGLE =====
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}

// ===== TABS =====
const tabTitles = {
  overview: ['Overview', 'System statistics and quick insights'],
  users: ['Users', 'Manage registered users'],
  scans: ['All Scans', 'View all disease detection scans'],
  dataset: ['Dataset Info', 'Training data and model information'],
  system: ['System Health', 'Backend and model status']
};

document.querySelectorAll('.side-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const tab = link.dataset.tab;
    
    document.querySelectorAll('.side-link').forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    
    document.querySelectorAll('.tab-panel').forEach(t => t.hidden = true);
    document.getElementById(`tab-${tab}`).hidden = false;
    
    document.getElementById('tabTitle').textContent = tabTitles[tab][0];
    document.getElementById('tabSub').textContent = tabTitles[tab][1];
    
    // Load data
    if (tab === 'overview') loadOverview();
    if (tab === 'users') loadUsers();
    if (tab === 'scans') loadScans();
    if (tab === 'system') loadSystem();
    
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
      text.textContent = 'Model Ready';
    } else {
      dot.className = 'sdot offline';
      text.textContent = 'Model Not Loaded';
    }
  } catch {
    dot.className = 'sdot offline';
    text.textContent = 'Server Offline';
  }
}
checkHealth();
setInterval(checkHealth, 15000);

// ===== OVERVIEW TAB =====
function loadOverview() {
  const users = JSON.parse(localStorage.getItem('kac_users') || '[]');
  const scans = JSON.parse(localStorage.getItem('kac_history') || '[]');
  
  document.getElementById('totalUsers').textContent = users.length;
  document.getElementById('totalScans').textContent = scans.length;
  
  // Recent activity
  const activity = document.getElementById('recentActivity');
  const recent = scans.slice(0, 5);
  
  if (recent.length === 0) {
    activity.innerHTML = '<p class="empty-msg">No recent activity</p>';
  } else {
    activity.innerHTML = recent.map(s => `
      <div class="activity-item">
        <i class='bx bx-scan'></i>
        <div>
          <p><strong>${s.user}</strong> scanned a leaf</p>
          <span>${formatLabel(s.disease)} · ${s.date}</span>
        </div>
      </div>
    `).join('');
  }
  
  // Disease distribution
  const diseaseCount = {};
  scans.forEach(s => {
    const disease = formatLabel(s.disease);
    diseaseCount[disease] = (diseaseCount[disease] || 0) + 1;
  });
  
  const chart = document.getElementById('diseaseChart');
  const sorted = Object.entries(diseaseCount).sort((a, b) => b[1] - a[1]).slice(0, 5);
  
  if (sorted.length === 0) {
    chart.innerHTML = '<p class="empty-msg">No scan data yet</p>';
  } else {
    const max = sorted[0][1];
    chart.innerHTML = sorted.map(([disease, count]) => `
      <div class="chart-row">
        <span class="chart-label">${disease}</span>
        <div class="chart-bar-bg">
          <div class="chart-bar" style="width: ${(count/max)*100}%"></div>
        </div>
        <span class="chart-val">${count}</span>
      </div>
    `).join('');
  }
}

// ===== USERS TAB =====
function loadUsers() {
  const users = JSON.parse(localStorage.getItem('kac_users') || '[]');
  const scans = JSON.parse(localStorage.getItem('kac_history') || '[]');
  
  const table = document.getElementById('usersTable');
  const empty = document.getElementById('usersEmpty');
  const count = document.getElementById('userCount');
  
  if (users.length === 0) {
    table.innerHTML = '';
    empty.hidden = false;
    count.textContent = '';
    return;
  }
  
  empty.hidden = true;
  count.textContent = `${users.length} user${users.length > 1 ? 's' : ''}`;
  
  table.innerHTML = users.map((u, i) => {
    const userScans = scans.filter(s => s.user === u.email).length;
    return `
      <tr>
        <td><strong>${u.name}</strong></td>
        <td>${u.email}</td>
        <td>${userScans} scan${userScans !== 1 ? 's' : ''}</td>
        <td>
          <button class="btn-delete" onclick="deleteUser(${i})">
            <i class='bx bx-trash'></i> Delete
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

function deleteUser(index) {
  if (!confirm('Delete this user and all their scans?')) return;
  
  const users = JSON.parse(localStorage.getItem('kac_users') || '[]');
  const email = users[index].email;
  
  // Remove user
  users.splice(index, 1);
  localStorage.setItem('kac_users', JSON.stringify(users));
  
  // Remove their scans
  const scans = JSON.parse(localStorage.getItem('kac_history') || '[]');
  const filtered = scans.filter(s => s.user !== email);
  localStorage.setItem('kac_history', JSON.stringify(filtered));
  
  loadUsers();
  loadOverview();
}

function clearAllUsers() {
  if (!confirm('Delete ALL users and their scans? This cannot be undone.')) return;
  localStorage.removeItem('kac_users');
  localStorage.removeItem('kac_history');
  loadUsers();
  loadOverview();
}

// ===== SCANS TAB =====
function loadScans() {
  const scans = JSON.parse(localStorage.getItem('kac_history') || '[]');
  
  const list = document.getElementById('scansList');
  const empty = document.getElementById('scansEmpty');
  const count = document.getElementById('scanCount');
  
  if (scans.length === 0) {
    list.innerHTML = '';
    empty.hidden = false;
    count.textContent = '';
    return;
  }
  
  empty.hidden = true;
  count.textContent = `${scans.length} scan${scans.length > 1 ? 's' : ''}`;
  
  list.innerHTML = scans.map((s, i) => {
    const isHealthy = s.disease.toLowerCase().includes('healthy');
    return `
      <div class="scan-item">
        <div class="scan-img">
          ${s.image ? `<img src="${s.image}" alt="scan"/>` : `<i class='bx bx-image-alt'></i>`}
        </div>
        <div class="scan-info">
          <h4>${formatLabel(s.disease)}</h4>
          <p class="scan-user"><i class='bx bx-user'></i> ${s.user}</p>
          <p class="scan-date"><i class='bx bx-time'></i> ${s.date}</p>
          <p class="scan-treat">${s.treatment}</p>
        </div>
        <div class="scan-badge ${isHealthy ? 'badge-healthy' : 'badge-disease'}">
          ${s.confidence}%
        </div>
      </div>
    `;
  }).join('');
}

function clearAllScans() {
  if (!confirm('Delete ALL scan history? This cannot be undone.')) return;
  localStorage.removeItem('kac_history');
  loadScans();
  loadOverview();
}

// ===== SYSTEM TAB =====
async function loadSystem() {
  try {
    const res = await fetch(`${API_URL}/health`);
    const data = await res.json();
    
    document.getElementById('backendStatus').textContent = 'Online';
    document.getElementById('backendStatus').className = 'sys-badge online';
    document.getElementById('modelStatus').textContent = data.model_ready ? 'Loaded' : 'Not Loaded';
  } catch {
    document.getElementById('backendStatus').textContent = 'Offline';
    document.getElementById('backendStatus').className = 'sys-badge offline';
    document.getElementById('modelStatus').textContent = 'Unknown';
  }
  
  // Storage info
  const users = localStorage.getItem('kac_users') || '';
  const scans = localStorage.getItem('kac_history') || '';
  
  const usersSize = new Blob([users]).size;
  const scansSize = new Blob([scans]).size;
  const totalSize = usersSize + scansSize;
  
  document.getElementById('usersStorage').textContent = formatBytes(usersSize);
  document.getElementById('scansStorage').textContent = formatBytes(scansSize);
  document.getElementById('totalStorage').textContent = formatBytes(totalSize);
}

// ===== HELPERS =====
function formatLabel(label) {
  return label.replace(/___/g, ' — ').replace(/_/g, ' ');
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// ===== INIT =====
loadOverview();
