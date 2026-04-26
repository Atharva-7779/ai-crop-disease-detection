// Language translations for Marathi, Hindi, and English
const translations = {
  en: {
    // Landing Page
    navHome: "Home",
    navAbout: "About",
    navFeatures: "Features",
    navCrops: "Crops",
    navSignIn: "Sign In",
    heroTitle: "AI-Powered Crop Disease Detection",
    heroSubtitle: "Protect your crops with instant, accurate disease diagnosis using advanced deep learning technology",
    heroGetStarted: "Get Started Free",
    heroLearnMore: "Learn More",
    aboutTitle: "Smart Farming with AI",
    aboutDesc: "Our AI-powered system helps farmers detect crop diseases early, providing instant diagnosis and treatment recommendations to protect yields and increase productivity.",
    featuresTitle: "Why Choose Krushi AI Care?",
    feature1Title: "Instant Detection",
    feature1Desc: "Upload a leaf image and get results in seconds",
    feature2Title: "High Accuracy",
    feature2Desc: "95%+ accuracy using ResNet18 deep learning",
    feature3Title: "Treatment Guide",
    feature3Desc: "Detailed fertilizer and treatment recommendations",
    feature4Title: "Multi-Crop Support",
    feature4Desc: "Supports Tomato, Potato, and Pepper crops",
    cropsTitle: "Supported Crops",
    cropsTomato: "Tomato",
    cropsPotato: "Potato",
    cropsPepper: "Pepper",
    cropsDiseasesDetected: "diseases detected",
    howItWorksTitle: "How It Works",
    step1Title: "Upload Image",
    step1Desc: "Take or upload a photo of the affected leaf",
    step2Title: "AI Analysis",
    step2Desc: "Our model analyzes the image instantly",
    step3Title: "Get Results",
    step3Desc: "Receive diagnosis and treatment plan",
    footerTagline: "Empowering farmers with AI technology",
    footerQuickLinks: "Quick Links",
    footerSupport: "Support",
    footerLegal: "Legal",
    footerHome: "Home",
    footerAbout: "About Us",
    footerContact: "Contact",
    footerHelp: "Help Center",
    footerFAQ: "FAQ",
    footerPrivacy: "Privacy Policy",
    footerTerms: "Terms of Service",
    footerRights: "All rights reserved.",
    
    // Auth Modals
    signInTitle: "Sign In",
    signUpTitle: "Sign Up",
    email: "Email",
    password: "Password",
    name: "Full Name",
    signInButton: "Sign In",
    signUpButton: "Sign Up",
    noAccount: "Don't have an account?",
    haveAccount: "Already have an account?",
    signUpLink: "Sign up",
    signInLink: "Sign in",
    
    // Dashboard
    detectDisease: "Detect Disease",
    scanHistory: "Scan History",
    fertilizerRecommendation: "Fertilizer Guide",
    supportedCrops: "Supported Crops",
    uploadSubtitle: "Upload a leaf image to get instant diagnosis",
    historySubtitle: "All your previous scans",
    fertilizerSubtitle: "Get fertilizer recommendations for crop diseases",
    cropsSubtitle: "Crops and diseases our model can detect",
    modelReady: "Model Ready",
    modelNotLoaded: "Model Not Loaded",
    serverOffline: "Server Offline",
    checking: "Checking...",
    logout: "Logout",
    
    // Detection Page
    uploadImage: "Upload Image",
    liveCamera: "Live Camera",
    dropImage: "Drop your leaf image here",
    browseFiles: "browse files",
    jpgPngSupported: "JPG, PNG supported",
    onlySupported: "Only Tomato, Potato & Pepper leaves",
    changeImage: "Change Image",
    analyzeDisease: "Analyze Disease",
    analyzing: "Analyzing...",
    capturePhoto: "Capture Photo",
    stopCamera: "Stop Camera",
    
    // Results
    detectedDisease: "Detected Disease",
    confidence: "Confidence",
    commonSymptoms: "Common Symptoms",
    recommendedTreatment: "Recommended Treatment",
    preventionTips: "Prevention Tips",
    fertilizerGuide: "Fertilizer Guide",
    productName: "Product Name",
    dosage: "Dosage",
    frequency: "Frequency",
    applicationMethod: "Application Method",
    expectedRecovery: "Expected Recovery Time",
    
    // History
    scans: "scans",
    scan: "scan",
    clearAll: "Clear All",
    noScansYet: "No scans yet. Go to Detect Disease to get started!",
    fertilizer: "Fertilizer",
    recovery: "Recovery",
    
    // Crops
    healthy: "Healthy",
    bacterialSpot: "Bacterial Spot",
    earlyBlight: "Early Blight",
    lateBlight: "Late Blight",
    leafMold: "Leaf Mold",
    septoriaLeafSpot: "Septoria Leaf Spot",
    spiderMites: "Spider Mites",
    targetSpot: "Target Spot",
    yellowLeafCurl: "Yellow Leaf Curl Virus",
    mosaicVirus: "Mosaic Virus",
    cropsWarning: "Only upload Tomato, Potato or Pepper leaf images. Other crops will give incorrect results.",
    
    // Disease Names
    "Cotton___Bacterial_Blight": "Cotton Bacterial Blight",
    "Cotton___Fusarium_Wilt": "Cotton Fusarium Wilt",
    "Cotton___healthy": "Healthy Cotton",
    "Sugarcane___Bacterial_Blight": "Sugarcane Bacterial Blight",
    "Sugarcane___Red_Rot": "Sugarcane Red Rot",
    "Sugarcane___healthy": "Healthy Sugarcane",
    "Wheat___Rust": "Wheat Rust",
    "Wheat___Septoria_Leaf_Spot": "Wheat Septoria Leaf Spot",
    "Wheat___healthy": "Healthy Wheat"
  },
  
  hi: {
    // Landing Page
    navHome: "होम",
    navAbout: "हमारे बारे में",
    navFeatures: "विशेषताएं",
    navCrops: "फसलें",
    navSignIn: "साइन इन",
    heroTitle: "एआई-संचालित फसल रोग पहचान",
    heroSubtitle: "उन्नत डीप लर्निंग तकनीक का उपयोग करके तत्काल, सटीक रोग निदान के साथ अपनी फसलों की रक्षा करें",
    heroGetStarted: "मुफ्त शुरू करें",
    heroLearnMore: "और जानें",
    aboutTitle: "एआई के साथ स्मार्ट खेती",
    aboutDesc: "हमारी एआई-संचालित प्रणाली किसानों को फसल रोगों का जल्दी पता लगाने में मदद करती है, उपज की रक्षा और उत्पादकता बढ़ाने के लिए तत्काल निदान और उपचार सिफारिशें प्रदान करती है।",
    featuresTitle: "कृषि एआई केयर क्यों चुनें?",
    feature1Title: "तत्काल पहचान",
    feature1Desc: "पत्ती की तस्वीर अपलोड करें और सेकंड में परिणाम प्राप्त करें",
    feature2Title: "उच्च सटीकता",
    feature2Desc: "ResNet18 डीप लर्निंग का उपयोग करके 95%+ सटीकता",
    feature3Title: "उपचार गाइड",
    feature3Desc: "विस्तृत उर्वरक और उपचार सिफारिशें",
    feature4Title: "बहु-फसल समर्थन",
    feature4Desc: "टमाटर, आलू और मिर्च की फसलों का समर्थन करता है",
    cropsTitle: "समर्थित फसलें",
    cropsTomato: "टमाटर",
    cropsPotato: "आलू",
    cropsPepper: "मिर्च",
    cropsDiseasesDetected: "रोग पहचाने गए",
    howItWorksTitle: "यह कैसे काम करता है",
    step1Title: "छवि अपलोड करें",
    step1Desc: "प्रभावित पत्ती की फोटो लें या अपलोड करें",
    step2Title: "एआई विश्लेषण",
    step2Desc: "हमारा मॉडल तुरंत छवि का विश्लेषण करता है",
    step3Title: "परिणाम प्राप्त करें",
    step3Desc: "निदान और उपचार योजना प्राप्त करें",
    footerTagline: "एआई तकनीक से किसानों को सशक्त बनाना",
    footerQuickLinks: "त्वरित लिंक",
    footerSupport: "सहायता",
    footerLegal: "कानूनी",
    footerHome: "होम",
    footerAbout: "हमारे बारे में",
    footerContact: "संपर्क करें",
    footerHelp: "सहायता केंद्र",
    footerFAQ: "सामान्य प्रश्न",
    footerPrivacy: "गोपनीयता नीति",
    footerTerms: "सेवा की शर्तें",
    footerRights: "सर्वाधिकार सुरक्षित।",
    
    // Auth Modals
    signInTitle: "साइन इन करें",
    signUpTitle: "साइन अप करें",
    email: "ईमेल",
    password: "पासवर्ड",
    name: "पूरा नाम",
    signInButton: "साइन इन करें",
    signUpButton: "साइन अप करें",
    noAccount: "खाता नहीं है?",
    haveAccount: "पहले से खाता है?",
    signUpLink: "साइन अप करें",
    signInLink: "साइन इन करें",
    
    // Dashboard
    detectDisease: "रोग पहचानें",
    scanHistory: "स्कैन इतिहास",
    fertilizerRecommendation: "उर्वरक गाइड",
    supportedCrops: "समर्थित फसलें",
    uploadSubtitle: "तत्काल निदान के लिए पत्ती की छवि अपलोड करें",
    historySubtitle: "आपके सभी पिछले स्कैन",
    fertilizerSubtitle: "फसल रोगों के लिए उर्वरक सिफारिशें प्राप्त करें",
    cropsSubtitle: "फसलें और रोग जो हमारा मॉडल पहचान सकता है",
    modelReady: "मॉडल तैयार",
    modelNotLoaded: "मॉडल लोड नहीं हुआ",
    serverOffline: "सर्वर ऑफलाइन",
    checking: "जांच रहे हैं...",
    logout: "लॉगआउट",
    
    // Detection Page
    uploadImage: "छवि अपलोड करें",
    liveCamera: "लाइव कैमरा",
    dropImage: "अपनी पत्ती की छवि यहां छोड़ें",
    browseFiles: "फ़ाइलें ब्राउज़ करें",
    jpgPngSupported: "JPG, PNG समर्थित",
    onlySupported: "केवल टमाटर, आलू और मिर्च की पत्तियां",
    changeImage: "छवि बदलें",
    analyzeDisease: "रोग का विश्लेषण करें",
    analyzing: "विश्लेषण कर रहे हैं...",
    capturePhoto: "फोटो कैप्चर करें",
    stopCamera: "कैमरा बंद करें",
    
    // Results
    detectedDisease: "पहचाना गया रोग",
    confidence: "विश्वास",
    commonSymptoms: "सामान्य लक्षण",
    recommendedTreatment: "अनुशंसित उपचार",
    preventionTips: "रोकथाम युक्तियाँ",
    fertilizerGuide: "उर्वरक गाइड",
    productName: "उत्पाद का नाम",
    dosage: "खुराक",
    frequency: "आवृत्ति",
    applicationMethod: "आवेदन विधि",
    expectedRecovery: "अपेक्षित रिकवरी समय",
    
    // History
    scans: "स्कैन",
    scan: "स्कैन",
    clearAll: "सभी साफ़ करें",
    noScansYet: "अभी तक कोई स्कैन नहीं। शुरू करने के लिए रोग पहचानें पर जाएं!",
    fertilizer: "उर्वरक",
    recovery: "रिकवरी",
    
    // Crops
    healthy: "स्वस्थ",
    bacterialSpot: "बैक्टीरियल स्पॉट",
    earlyBlight: "अर्ली ब्लाइट",
    lateBlight: "लेट ब्लाइट",
    leafMold: "लीफ मोल्ड",
    septoriaLeafSpot: "सेप्टोरिया लीफ स्पॉट",
    spiderMites: "स्पाइडर माइट्स",
    targetSpot: "टारगेट स्पॉट",
    yellowLeafCurl: "येलो लीफ कर्ल वायरस",
    mosaicVirus: "मोज़ेक वायरस",
    cropsWarning: "केवल टमाटर, आलू या मिर्च की पत्ती की छवियां अपलोड करें। अन्य फसलें गलत परिणाम देंगी।",
    
    // Disease Names
    "Cotton___Bacterial_Blight": "कपास बैक्टीरियल ब्लाइट",
    "Cotton___Fusarium_Wilt": "कपास फ्यूजेरियम विल्ट",
    "Cotton___healthy": "स्वस्थ कपास",
    "Sugarcane___Bacterial_Blight": "गन्ना बैक्टीरियल ब्लाइट",
    "Sugarcane___Red_Rot": "गन्ना लाल सड़न",
    "Sugarcane___healthy": "स्वस्थ गन्ना",
    "Wheat___Rust": "गेहूं रस्ट",
    "Wheat___Septoria_Leaf_Spot": "गेहूं सेप्टोरिया लीफ स्पॉट",
    "Wheat___healthy": "स्वस्थ गेहूं"
  },
  
  mr: {
    // Landing Page
    navHome: "मुख्यपृष्ठ",
    navAbout: "आमच्याबद्दल",
    navFeatures: "वैशिष्ट्ये",
    navCrops: "पिके",
    navSignIn: "साइन इन",
    heroTitle: "एआय-चालित पीक रोग ओळख",
    heroSubtitle: "प्रगत डीप लर्निंग तंत्रज्ञानाचा वापर करून तात्काळ, अचूक रोग निदानासह आपल्या पिकांचे संरक्षण करा",
    heroGetStarted: "मोफत सुरू करा",
    heroLearnMore: "अधिक जाणून घ्या",
    aboutTitle: "एआयसह स्मार्ट शेती",
    aboutDesc: "आमची एआय-चालित प्रणाली शेतकऱ्यांना पीक रोगांची लवकर ओळख करण्यात मदत करते, उत्पन्नाचे संरक्षण आणि उत्पादकता वाढविण्यासाठी तात्काळ निदान आणि उपचार शिफारसी प्रदान करते.",
    featuresTitle: "कृषी एआय केअर का निवडावे?",
    feature1Title: "तात्काळ ओळख",
    feature1Desc: "पानाचा फोटो अपलोड करा आणि सेकंदात परिणाम मिळवा",
    feature2Title: "उच्च अचूकता",
    feature2Desc: "ResNet18 डीप लर्निंग वापरून 95%+ अचूकता",
    feature3Title: "उपचार मार्गदर्शक",
    feature3Desc: "तपशीलवार खत आणि उपचार शिफारसी",
    feature4Title: "बहु-पीक समर्थन",
    feature4Desc: "टोमॅटो, बटाटा आणि मिरची पिकांना समर्थन देते",
    cropsTitle: "समर्थित पिके",
    cropsTomato: "टोमॅटो",
    cropsPotato: "बटाटा",
    cropsPepper: "मिरची",
    cropsDiseasesDetected: "रोग ओळखले",
    howItWorksTitle: "हे कसे कार्य करते",
    step1Title: "प्रतिमा अपलोड करा",
    step1Desc: "प्रभावित पानाचा फोटो घ्या किंवा अपलोड करा",
    step2Title: "एआय विश्लेषण",
    step2Desc: "आमचे मॉडेल तात्काळ प्रतिमेचे विश्लेषण करते",
    step3Title: "परिणाम मिळवा",
    step3Desc: "निदान आणि उपचार योजना प्राप्त करा",
    footerTagline: "एआय तंत्रज्ञानाने शेतकऱ्यांना सशक्त बनवणे",
    footerQuickLinks: "द्रुत दुवे",
    footerSupport: "समर्थन",
    footerLegal: "कायदेशीर",
    footerHome: "मुख्यपृष्ठ",
    footerAbout: "आमच्याबद्दल",
    footerContact: "संपर्क",
    footerHelp: "मदत केंद्र",
    footerFAQ: "सामान्य प्रश्न",
    footerPrivacy: "गोपनीयता धोरण",
    footerTerms: "सेवा अटी",
    footerRights: "सर्व हक्क राखीव.",
    
    // Auth Modals
    signInTitle: "साइन इन करा",
    signUpTitle: "साइन अप करा",
    email: "ईमेल",
    password: "पासवर्ड",
    name: "पूर्ण नाव",
    signInButton: "साइन इन करा",
    signUpButton: "साइन अप करा",
    noAccount: "खाते नाही?",
    haveAccount: "आधीच खाते आहे?",
    signUpLink: "साइन अप करा",
    signInLink: "साइन इन करा",
    
    // Dashboard
    detectDisease: "रोग ओळखा",
    scanHistory: "स्कॅन इतिहास",
    fertilizerRecommendation: "खत मार्गदर्शक",
    supportedCrops: "समर्थित पिके",
    uploadSubtitle: "तात्काळ निदानासाठी पानाची प्रतिमा अपलोड करा",
    historySubtitle: "आपले सर्व मागील स्कॅन",
    fertilizerSubtitle: "पीक रोगांसाठी खत शिफारसी मिळवा",
    cropsSubtitle: "पिके आणि रोग जे आमचे मॉडेल ओळखू शकते",
    modelReady: "मॉडेल तयार",
    modelNotLoaded: "मॉडेल लोड झाले नाही",
    serverOffline: "सर्व्हर ऑफलाइन",
    checking: "तपासत आहे...",
    logout: "लॉगआउट",
    
    // Detection Page
    uploadImage: "प्रतिमा अपलोड करा",
    liveCamera: "लाइव्ह कॅमेरा",
    dropImage: "आपली पानाची प्रतिमा येथे टाका",
    browseFiles: "फाइल ब्राउझ करा",
    jpgPngSupported: "JPG, PNG समर्थित",
    onlySupported: "फक्त टोमॅटो, बटाटा आणि मिरची पाने",
    changeImage: "प्रतिमा बदला",
    analyzeDisease: "रोगाचे विश्लेषण करा",
    analyzing: "विश्लेषण करत आहे...",
    capturePhoto: "फोटो कॅप्चर करा",
    stopCamera: "कॅमेरा बंद करा",
    
    // Results
    detectedDisease: "ओळखलेला रोग",
    confidence: "आत्मविश्वास",
    commonSymptoms: "सामान्य लक्षणे",
    recommendedTreatment: "शिफारस केलेले उपचार",
    preventionTips: "प्रतिबंध टिपा",
    fertilizerGuide: "खत मार्गदर्शक",
    productName: "उत्पादनाचे नाव",
    dosage: "डोस",
    frequency: "वारंवारता",
    applicationMethod: "अर्ज पद्धत",
    expectedRecovery: "अपेक्षित पुनर्प्राप्ती वेळ",
    
    // History
    scans: "स्कॅन",
    scan: "स्कॅन",
    clearAll: "सर्व साफ करा",
    noScansYet: "अद्याप स्कॅन नाहीत. सुरू करण्यासाठी रोग ओळखा वर जा!",
    fertilizer: "खत",
    recovery: "पुनर्प्राप्ती",
    
    // Crops
    healthy: "निरोगी",
    bacterialSpot: "बॅक्टेरियल स्पॉट",
    earlyBlight: "अर्ली ब्लाइट",
    lateBlight: "लेट ब्लाइट",
    leafMold: "लीफ मोल्ड",
    septoriaLeafSpot: "सेप्टोरिया लीफ स्पॉट",
    spiderMites: "स्पायडर माइट्स",
    targetSpot: "टार्गेट स्पॉट",
    yellowLeafCurl: "यलो लीफ कर्ल व्हायरस",
    mosaicVirus: "मोझेक व्हायरस",
    cropsWarning: "फक्त टोमॅटो, बटाटा किंवा मिरची पानाच्या प्रतिमा अपलोड करा. इतर पिके चुकीचे परिणाम देतील.",
    
    // Disease Names
    "Cotton___Bacterial_Blight": "कापूस बॅक्टेरियल ब्लाइट",
    "Cotton___Fusarium_Wilt": "कापूस फ्यूजेरियम विल्ट",
    "Cotton___healthy": "निरोगी कापूस",
    "Sugarcane___Bacterial_Blight": "ऊस बॅक्टेरियल ब्लाइट",
    "Sugarcane___Red_Rot": "ऊस लाल कुजणे",
    "Sugarcane___healthy": "निरोगी ऊस",
    "Wheat___Rust": "गहू रस्ट",
    "Wheat___Septoria_Leaf_Spot": "गहू सेप्टोरिया लीफ स्पॉट",
    "Wheat___healthy": "निरोगी गहू"
  }
};

// Get current language from localStorage or default to English
function getCurrentLanguage() {
  return localStorage.getItem('kac_language') || 'en';
}

// Set language
function setLanguage(lang) {
  localStorage.setItem('kac_language', lang);
  updatePageLanguage();
}

// Get translation
function t(key) {
  const lang = getCurrentLanguage();
  return translations[lang][key] || translations['en'][key] || key;
}

// Update all text on page
function updatePageLanguage() {
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    const translation = t(key);
    
    if (element.tagName === 'INPUT' && element.placeholder !== undefined) {
      element.placeholder = translation;
    } else {
      element.textContent = translation;
    }
  });
}
