# Landing Page - Sign In & Sign Up Buttons

## ✅ Changes Made

Updated landing page navbar to show **separate Sign In and Sign Up buttons**.

## 🎯 Button Behavior

### When User is NOT Logged In:
```
Navbar Buttons:
[Sign In] [Sign Up]
```
- **Sign In** button → Opens auth.html (login form)
- **Sign Up** button → Opens auth.html (signup form)

### When User IS Logged In:
```
Navbar Buttons:
[Go to Dashboard]
```
- **Sign In** and **Sign Up** buttons hidden
- **Go to Dashboard** button shown
- Clicking goes directly to dashboard.html

## 📍 Button Locations

### Navbar (Top Right):
```
┌─────────────────────────────────────────────────┐
│ Krushi AI Care | Home About Features Crops Admin│
│                              [Sign In] [Sign Up] │
└─────────────────────────────────────────────────┘
```

### Hero Section:
- "Start Detection" button → Opens auth.html

## 🎨 Visual Design

### Sign In Button:
- Style: Outlined (transparent background)
- Border: 1px solid border color
- Color: White text
- Hover: Green border + green text

### Sign Up Button:
- Style: Filled (green gradient)
- Background: Linear gradient (green)
- Color: White text
- Hover: Lift effect + shadow

### Go to Dashboard Button:
- Style: Same as Sign Up (green gradient)
- Icon: Grid icon
- Only visible when logged in

## 🔄 User Flow

### New User Flow:
```
Landing Page
    ↓
Click "Sign Up" button
    ↓
Auth Page (Sign Up form visible)
    ↓
Fill form & submit
    ↓
Dashboard
```

### Returning User Flow:
```
Landing Page
    ↓
Click "Sign In" button
    ↓
Auth Page (Sign In form visible)
    ↓
Enter credentials
    ↓
Dashboard
```

### Logged In User Flow:
```
Landing Page
    ↓
See "Go to Dashboard" button
    ↓
Click button
    ↓
Dashboard (direct access)
```

## 💻 Implementation Details

### HTML Structure:
```html
<div class="nav-btns" id="navBtns">
  <button class="btn-signin" id="signInBtn">Sign In</button>
  <button class="btn-signup" id="signUpBtn">Sign Up</button>
  <button class="btn-signup" id="dashboardBtn" style="display:none;">
    Go to Dashboard
  </button>
</div>
```

### JavaScript Logic:
```javascript
const session = JSON.parse(localStorage.getItem('kac_session') || 'null');
if (session) {
  // User logged in - show dashboard button
  document.getElementById('signInBtn').style.display = 'none';
  document.getElementById('signUpBtn').style.display = 'none';
  document.getElementById('dashboardBtn').style.display = 'block';
} else {
  // User not logged in - show sign in/sign up buttons
  // (default state)
}
```

## 📱 Responsive Design

### Desktop:
```
[Sign In] [Sign Up]
```
Both buttons side by side

### Mobile:
```
[Sign In]
[Sign Up]
```
Buttons may stack or be in hamburger menu

## 🎯 Button Actions

| Button | Action | Destination |
|--------|--------|-------------|
| Sign In | Opens auth page | auth.html |
| Sign Up | Opens auth page | auth.html |
| Go to Dashboard | Opens dashboard | dashboard.html |

**Note**: Both Sign In and Sign Up buttons go to the same `auth.html` page. The auth page has toggle functionality to switch between sign in and sign up forms.

## 🔍 Testing

### Test 1: Not Logged In
```bash
# Clear session
localStorage.removeItem('kac_session');

# Open landing page
http://127.0.0.1:3000/

# Expected: See "Sign In" and "Sign Up" buttons
```

### Test 2: Logged In
```bash
# Create session
localStorage.setItem('kac_session', JSON.stringify({
  email: 'demo@krishiaicare.com',
  name: 'Demo User'
}));

# Refresh landing page
http://127.0.0.1:3000/

# Expected: See "Go to Dashboard" button only
```

### Test 3: Button Clicks
```bash
# Click "Sign In" → Should open auth.html
# Click "Sign Up" → Should open auth.html
# Click "Go to Dashboard" → Should open dashboard.html
```

## 📝 Files Modified

- ✅ `landing.html` - Updated navbar buttons and script

## 🎨 CSS Classes Used

- `.btn-signin` - Sign In button style (outlined)
- `.btn-signup` - Sign Up button style (filled green)
- `.nav-btns` - Container for navbar buttons

## Marathi Summary

**Landing Page वर Sign In आणि Sign Up Buttons:**

### जेव्हा User Logged In नाही:
```
Navbar मध्ये:
[Sign In] [Sign Up]
```
- **Sign In** → Auth page उघडतो (login form)
- **Sign Up** → Auth page उघडतो (signup form)

### जेव्हा User Logged In आहे:
```
Navbar मध्ये:
[Go to Dashboard]
```
- Sign In आणि Sign Up buttons लपतात
- Go to Dashboard button दिसतो
- Direct dashboard वर जातो

### Button Styles:
- **Sign In**: Outlined (transparent background, border)
- **Sign Up**: Filled (green gradient background)
- **Go to Dashboard**: Same as Sign Up (green)

### Testing:
```bash
# Not logged in:
http://127.0.0.1:3000/
# दोन्ही buttons दिसतील

# Logged in:
# Dashboard button दिसेल
```

आता Landing page वर proper Sign In आणि Sign Up buttons आहेत! 🎉
