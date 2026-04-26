// Chatbot functionality
class KrushiChatbot {
  constructor() {
    this.isOpen = false;
    this.messages = [];
    this.knowledgeBase = {
      greetings: ['hello', 'hi', 'hey', 'namaste', 'namaskar'],
      help: ['help', 'guide', 'how', 'what', 'support'],
      upload: ['upload', 'image', 'photo', 'picture', 'file'],
      camera: ['camera', 'capture', 'take photo', 'live'],
      disease: ['disease', 'sick', 'problem', 'infection', 'blight'],
      treatment: ['treatment', 'cure', 'medicine', 'fertilizer', 'spray'],
      language: ['language', 'hindi', 'marathi', 'english', 'translate'],
      crops: ['crop', 'tomato', 'potato', 'pepper', 'support'],
      error: ['error', 'not working', 'problem', 'issue', 'bug'],
      weather: ['weather', 'temperature', 'rain', 'humidity']
    };
    
    this.init();
  }

  init() {
    this.createChatbotUI();
    this.addWelcomeMessage();
  }

  createChatbotUI() {
    const chatbotHTML = `
      <div class="chatbot-container">
        <button class="chatbot-toggle" onclick="chatbot.toggle()">
          <i class='bx bx-message-dots'></i>
        </button>
        
        <div class="chatbot-window" id="chatbotWindow">
          <div class="chatbot-header">
            <div class="chatbot-header-info">
              <div class="chatbot-avatar">
                <i class='bx bxs-bot'></i>
              </div>
              <div class="chatbot-header-text">
                <h4>Krushi AI Assistant</h4>
                <p>Online • Here to help</p>
              </div>
            </div>
            <button class="chatbot-close" onclick="chatbot.toggle()">
              <i class='bx bx-x'></i>
            </button>
          </div>
          
          <div class="chatbot-messages" id="chatbotMessages"></div>
          
          <div class="chatbot-input-area">
            <div class="chatbot-input-wrapper">
              <input 
                type="text" 
                class="chatbot-input" 
                id="chatbotInput" 
                placeholder="Type your question..."
                onkeypress="if(event.key==='Enter') chatbot.sendMessage()"
              />
              <button class="chatbot-send" onclick="chatbot.sendMessage()">
                <i class='bx bx-send'></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', chatbotHTML);
  }

  toggle() {
    this.isOpen = !this.isOpen;
    const window = document.getElementById('chatbotWindow');
    if (this.isOpen) {
      window.classList.add('open');
      document.getElementById('chatbotInput').focus();
    } else {
      window.classList.remove('open');
    }
  }

  addWelcomeMessage() {
    const welcomeMsg = {
      text: "👋 Hello! I'm your Krushi AI Assistant. I can help you with:\n\n• Uploading leaf images\n• Using the camera\n• Understanding disease results\n• Treatment recommendations\n• Language settings\n• Any technical issues\n\nHow can I help you today?",
      isBot: true,
      quickReplies: [
        "How to upload image?",
        "How to use camera?",
        "Change language",
        "Supported crops"
      ]
    };
    this.addMessage(welcomeMsg);
  }

  addMessage(message) {
    this.messages.push(message);
    this.renderMessage(message);
  }

  renderMessage(message) {
    const messagesContainer = document.getElementById('chatbotMessages');
    const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    
    const messageHTML = `
      <div class="chatbot-message ${message.isBot ? 'bot' : 'user'}">
        <div class="message-avatar">
          <i class='bx ${message.isBot ? 'bxs-bot' : 'bx-user'}'></i>
        </div>
        <div>
          <div class="message-content">
            ${message.text.replace(/\n/g, '<br>')}
          </div>
          <div class="message-time">${time}</div>
          ${message.quickReplies ? this.renderQuickReplies(message.quickReplies) : ''}
        </div>
      </div>
    `;

    messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  renderQuickReplies(replies) {
    const buttons = replies.map(reply => 
      `<button class="quick-reply-btn" onclick="chatbot.handleQuickReply('${reply}')">${reply}</button>`
    ).join('');
    return `<div class="chatbot-quick-replies">${buttons}</div>`;
  }

  handleQuickReply(reply) {
    document.getElementById('chatbotInput').value = reply;
    this.sendMessage();
  }

  sendMessage() {
    const input = document.getElementById('chatbotInput');
    const text = input.value.trim();
    
    if (!text) return;

    // Add user message
    this.addMessage({ text, isBot: false });
    input.value = '';

    // Show typing indicator
    this.showTyping();

    // Generate bot response
    setTimeout(() => {
      this.hideTyping();
      const response = this.generateResponse(text);
      this.addMessage(response);
    }, 1000);
  }

  showTyping() {
    const messagesContainer = document.getElementById('chatbotMessages');
    const typingHTML = `
      <div class="chatbot-message bot" id="typingIndicator">
        <div class="message-avatar">
          <i class='bx bxs-bot'></i>
        </div>
        <div class="message-content">
          <div class="chatbot-typing">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
          </div>
        </div>
      </div>
    `;
    messagesContainer.insertAdjacentHTML('beforeend', typingHTML);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  hideTyping() {
    const typing = document.getElementById('typingIndicator');
    if (typing) typing.remove();
  }

  generateResponse(userMessage) {
    const msg = userMessage.toLowerCase();

    // Greetings
    if (this.matchKeywords(msg, this.knowledgeBase.greetings)) {
      return {
        text: "Hello! 👋 Welcome to Krushi AI Care. I'm here to help you detect crop diseases and guide you through the process. What would you like to know?",
        isBot: true,
        quickReplies: ["Upload image", "Use camera", "Supported crops"]
      };
    }

    // Upload help
    if (this.matchKeywords(msg, this.knowledgeBase.upload)) {
      return {
        text: "📤 To upload an image:\n\n1. Click 'Detect Disease' in sidebar\n2. Click 'Upload Image' button\n3. Drag & drop your leaf image OR click 'browse files'\n4. Click 'Analyze Disease' button\n5. Wait for results!\n\n✅ Supported: JPG, PNG\n✅ Best results: Clear, well-lit leaf photos\n✅ Only: Tomato, Potato, Pepper leaves",
        isBot: true,
        quickReplies: ["How to use camera?", "What crops supported?"]
      };
    }

    // Camera help
    if (this.matchKeywords(msg, this.knowledgeBase.camera)) {
      return {
        text: "📸 To use live camera:\n\n1. Click 'Detect Disease' in sidebar\n2. Click 'Live Camera' button\n3. Allow camera permission when asked\n4. Point camera at the leaf\n5. Click 'Capture Photo'\n6. Click 'Analyze Disease'\n\n💡 Tip: Use good lighting for best results!",
        isBot: true,
        quickReplies: ["Camera not working", "Upload instead"]
      };
    }

    // Disease information
    if (this.matchKeywords(msg, this.knowledgeBase.disease)) {
      return {
        text: "🔍 After analyzing your image, you'll see:\n\n✅ Disease Name (in your language)\n✅ Confidence Score\n✅ Common Symptoms\n✅ Recommended Treatment (step-by-step)\n✅ Prevention Tips\n✅ Fertilizer Guide (product, dosage, frequency)\n✅ Expected Recovery Time\n\nAll information is based on scientific research!",
        isBot: true,
        quickReplies: ["How accurate is it?", "Treatment details"]
      };
    }

    // Treatment help
    if (this.matchKeywords(msg, this.knowledgeBase.treatment)) {
      return {
        text: "💊 Treatment Information:\n\nFor each disease, we provide:\n\n1. Specific fungicide/pesticide name\n2. Exact dosage (grams per liter)\n3. Application frequency (every X days)\n4. Application method (spray technique)\n5. Expected recovery time\n\n⚠️ Always follow safety guidelines when applying chemicals!",
        isBot: true,
        quickReplies: ["Where to buy fertilizers?", "Organic alternatives?"]
      };
    }

    // Language help
    if (this.matchKeywords(msg, this.knowledgeBase.language)) {
      return {
        text: "🌐 Language Settings:\n\nWe support 3 languages:\n• English (EN)\n• Hindi (हिं)\n• Marathi (मर)\n\nTo change language:\n1. Look at top-right corner\n2. Click language button (EN/हिं/मर)\n3. All UI text will translate instantly!\n\n📝 Note: Disease details stay in English for medical accuracy.",
        isBot: true,
        quickReplies: ["Switch to Hindi", "Switch to Marathi"]
      };
    }

    // Crops information
    if (this.matchKeywords(msg, this.knowledgeBase.crops)) {
      return {
        text: "🌱 Supported Crops:\n\n🍅 Tomato (10 diseases)\n• Bacterial Spot, Early Blight, Late Blight\n• Leaf Mold, Septoria, Spider Mites\n• Target Spot, Yellow Curl Virus, Mosaic Virus\n• Healthy\n\n🥔 Potato (3 diseases)\n• Early Blight, Late Blight, Healthy\n\n🫑 Pepper (2 diseases)\n• Bacterial Spot, Healthy\n\n⚠️ Other crops will give incorrect results!",
        isBot: true,
        quickReplies: ["Upload tomato leaf", "Upload potato leaf"]
      };
    }

    // Error/Problem help
    if (this.matchKeywords(msg, this.knowledgeBase.error)) {
      return {
        text: "🔧 Troubleshooting:\n\n❌ Server Offline?\n→ Make sure backend is running on port 8000\n\n❌ Camera not working?\n→ Allow camera permission in browser\n→ Use Chrome/Safari for best results\n\n❌ Upload failed?\n→ Check image format (JPG/PNG only)\n→ File size should be under 10MB\n\n❌ Wrong results?\n→ Make sure it's Tomato/Potato/Pepper leaf\n→ Use clear, well-lit photos\n\nStill having issues? Contact support!",
        isBot: true,
        quickReplies: ["Backend not running", "Permission denied"]
      };
    }

    // Weather help
    if (this.matchKeywords(msg, this.knowledgeBase.weather)) {
      return {
        text: "🌤️ Weather Information:\n\nThe weather widget shows:\n• Current temperature\n• Your location\n• Humidity level\n• Wind speed\n• Atmospheric pressure\n\n💡 Why weather matters:\n• High humidity → More fungal diseases\n• Rain → Disease spreads faster\n• Temperature affects disease development\n\nUse weather info to plan treatments!",
        isBot: true,
        quickReplies: ["Weather not showing", "How to enable location?"]
      };
    }

    // Default response
    return {
      text: "I'm not sure about that, but I can help you with:\n\n• Uploading images\n• Using the camera\n• Understanding results\n• Treatment information\n• Language settings\n• Supported crops\n• Technical issues\n\nWhat would you like to know?",
      isBot: true,
      quickReplies: ["Upload help", "Camera help", "Crop info", "Troubleshoot"]
    };
  }

  matchKeywords(message, keywords) {
    return keywords.some(keyword => message.includes(keyword));
  }
}

// Initialize chatbot when page loads
let chatbot;
window.addEventListener('DOMContentLoaded', () => {
  chatbot = new KrushiChatbot();
});
