// ===== WEATHER API =====
async function getWeatherData() {
  const widget = document.getElementById('weatherWidget');
  const detailsCard = document.getElementById('weatherDetailsCard');
  
  try {
    // Show loading state
    widget.innerHTML = `
      <div class="weather-loading">
        <i class='bx bx-loader-alt bx-spin'></i>
        <span style="font-size: 0.75rem;">Loading...</span>
      </div>
    `;

    let latitude, longitude;

    // Try to get user's location
    if (navigator.geolocation) {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            resolve,
            reject,
            {
              timeout: 10000,
              enableHighAccuracy: false,
              maximumAge: 300000
            }
          );
        });
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        console.log('Location obtained:', latitude, longitude);
      } catch (geoError) {
        console.warn('Geolocation failed, using IP-based location:', geoError);
        // Fallback: Get location from IP address
        const ipResponse = await fetch('https://ipapi.co/json/');
        const ipData = await ipResponse.json();
        latitude = ipData.latitude;
        longitude = ipData.longitude;
        console.log('IP-based location:', latitude, longitude);
      }
    } else {
      // Fallback: Get location from IP address
      const ipResponse = await fetch('https://ipapi.co/json/');
      const ipData = await ipResponse.json();
      latitude = ipData.latitude;
      longitude = ipData.longitude;
      console.log('IP-based location (no geolocation):', latitude, longitude);
    }

    // Use Open-Meteo API (free, no API key required)
    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,pressure_msl&timezone=auto`
    );

    if (!weatherResponse.ok) {
      throw new Error('Weather API error');
    }

    const weatherData = await weatherResponse.json();
    console.log('Weather data:', weatherData);

    // Get location name using reverse geocoding
    const geoResponse = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
    );
    
    const geoData = await geoResponse.json();
    console.log('Location data:', geoData);

    displayWeather(weatherData, geoData);
  } catch (error) {
    console.error('Weather error:', error);
    displayWeatherError(error.message);
  }
}

function displayWeather(weatherData, geoData) {
  const widget = document.getElementById('weatherWidget');
  const detailsCard = document.getElementById('weatherDetailsCard');

  const current = weatherData.current;
  const temp = Math.round(current.temperature_2m);
  const humidity = current.relative_humidity_2m;
  const windSpeed = Math.round(current.wind_speed_10m);
  const pressure = Math.round(current.pressure_msl);
  
  // Weather code to description and icon mapping
  const weatherCodes = {
    0: { desc: 'Clear sky', icon: 'bx-sun' },
    1: { desc: 'Mainly clear', icon: 'bx-sun' },
    2: { desc: 'Partly cloudy', icon: 'bx-cloud' },
    3: { desc: 'Overcast', icon: 'bx-cloud' },
    45: { desc: 'Foggy', icon: 'bx-water' },
    48: { desc: 'Foggy', icon: 'bx-water' },
    51: { desc: 'Light drizzle', icon: 'bx-cloud-drizzle' },
    53: { desc: 'Moderate drizzle', icon: 'bx-cloud-drizzle' },
    55: { desc: 'Dense drizzle', icon: 'bx-cloud-drizzle' },
    61: { desc: 'Slight rain', icon: 'bx-cloud-rain' },
    63: { desc: 'Moderate rain', icon: 'bx-cloud-rain' },
    65: { desc: 'Heavy rain', icon: 'bx-cloud-rain' },
    71: { desc: 'Slight snow', icon: 'bx-cloud-snow' },
    73: { desc: 'Moderate snow', icon: 'bx-cloud-snow' },
    75: { desc: 'Heavy snow', icon: 'bx-cloud-snow' },
    80: { desc: 'Rain showers', icon: 'bx-cloud-rain' },
    81: { desc: 'Rain showers', icon: 'bx-cloud-rain' },
    82: { desc: 'Heavy rain showers', icon: 'bx-cloud-rain' },
    95: { desc: 'Thunderstorm', icon: 'bx-cloud-lightning' },
    96: { desc: 'Thunderstorm with hail', icon: 'bx-cloud-lightning' },
    99: { desc: 'Thunderstorm with hail', icon: 'bx-cloud-lightning' }
  };

  const weatherInfo = weatherCodes[current.weather_code] || { desc: 'Unknown', icon: 'bx-cloud' };
  const cityName = geoData.city || geoData.locality || geoData.principalSubdivision || 'Your Location';
  const country = geoData.countryCode || '';

  // Update navbar widget
  widget.innerHTML = `
    <div class="weather-icon"><i class='bx ${weatherInfo.icon}'></i></div>
    <div class="weather-info">
      <div class="weather-temp-small">${temp}°C</div>
      <div class="weather-location-small">${cityName}</div>
    </div>
  `;

  // Update details card
  document.getElementById('weatherIconBig').innerHTML = `<i class='bx ${weatherInfo.icon}'></i>`;
  document.getElementById('weatherLocation').innerHTML = `
    <i class='bx bx-map'></i> ${cityName}${country ? ', ' + country : ''}
  `;
  document.getElementById('weatherTemp').textContent = `${temp}°C`;
  document.getElementById('weatherDesc').textContent = weatherInfo.desc;
  document.getElementById('weatherHumidity').textContent = `${humidity}%`;
  document.getElementById('weatherWind').textContent = `${windSpeed} km/h`;
  document.getElementById('weatherPressure').textContent = `${pressure} hPa`;
  document.getElementById('weatherVisibility').textContent = `Good`;
  
  const now = new Date();
  document.getElementById('weatherTime').textContent = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
}

function displayWeatherError(errorMsg) {
  const widget = document.getElementById('weatherWidget');
  widget.innerHTML = `
    <div class="weather-loading">
      <i class='bx bx-error-circle'></i>
      <span style="font-size: 0.75rem;">Location off</span>
    </div>
  `;

  const detailsCard = document.getElementById('weatherDetailsCard');
  detailsCard.innerHTML = `
    <div style="text-align: center; padding: 40px; color: var(--muted);">
      <i class='bx bx-error-circle' style="font-size: 3rem; color: #ef4444; margin-bottom: 16px; display: block;"></i>
      <h3 style="margin-bottom: 12px; color: var(--text);">Unable to Get Weather Data</h3>
      <p style="margin-bottom: 16px;">${errorMsg || 'Please enable location access in your browser settings.'}</p>
      <button onclick="getWeatherData()" style="padding: 10px 20px; background: var(--green); color: #000; border: none; border-radius: 8px; font-weight: 600; cursor: pointer;">
        <i class='bx bx-refresh'></i> Try Again
      </button>
    </div>
  `;
}

// Load weather on page load
if (document.getElementById('weatherWidget')) {
  getWeatherData();
  // Refresh weather every 10 minutes
  setInterval(getWeatherData, 600000);
}

// Page switching
function showPage(page) {
  document.getElementById('page-landing').style.display = page === 'landing' ? 'block' : 'none';
  document.getElementById('page-login').style.display = page === 'login' ? 'flex' : 'none';
  document.getElementById('page-signup').style.display = page === 'signup' ? 'flex' : 'none';
  
  // Clear errors
  document.getElementById('li-err').textContent = '';
  document.getElementById('su-err').textContent = '';
  
  // Scroll to top
  window.scrollTo(0, 0);
}

// Sign Up
function doSignup() {
  const name = document.getElementById('su-name').value.trim();
  const email = document.getElementById('su-email').value.trim();
  const pass = document.getElementById('su-pass').value;
  const err = document.getElementById('su-err');

  if (!name || !email || !pass) {
    err.textContent = 'All fields are required.';
    return;
  }

  if (pass.length < 6) {
    err.textContent = 'Password must be at least 6 characters.';
    return;
  }

  const users = JSON.parse(localStorage.getItem('kac_users') || '[]');
  
  if (users.find(u => u.email === email)) {
    err.textContent = 'Email already registered. Please sign in instead.';
    return;
  }

  users.push({ name, email, password: pass });
  localStorage.setItem('kac_users', JSON.stringify(users));
  
  // Auto login
  localStorage.setItem('kac_session', JSON.stringify({ name, email }));
  window.location.href = 'dashboard.html';
}

// Sign In
function doLogin() {
  const email = document.getElementById('li-email').value.trim();
  const pass = document.getElementById('li-pass').value;
  const err = document.getElementById('li-err');

  if (!email || !pass) {
    err.textContent = 'All fields are required.';
    return;
  }

  const users = JSON.parse(localStorage.getItem('kac_users') || '[]');
  const user = users.find(u => u.email === email && u.password === pass);

  if (!user) {
    err.textContent = 'Invalid email or password.';
    return;
  }

  localStorage.setItem('kac_session', JSON.stringify({ name: user.name, email: user.email }));
  window.location.href = 'dashboard.html';
}

// Enter key support
document.addEventListener('keydown', e => {
  if (e.key !== 'Enter') return;
  
  const loginPage = document.getElementById('page-login');
  const signupPage = document.getElementById('page-signup');
  
  if (loginPage.style.display === 'flex') doLogin();
  if (signupPage.style.display === 'flex') doSignup();
});

// Show dashboard button if already logged in
if (localStorage.getItem('kac_session')) {
  const navBtns = document.querySelector('.nav-btns');
  navBtns.innerHTML = `
    <button class="btn-signin" onclick="window.location.href='dashboard.html'">Dashboard</button>
    <button class="btn-signup" onclick="localStorage.removeItem('kac_session'); location.reload()">Logout</button>
  `;
}

// Smooth scroll for nav links
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    const top = s.offsetTop;
    if (window.scrollY >= top - 120) {
      current = s.getAttribute('id');
    }
  });
  
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--green)' : '';
  });
});
