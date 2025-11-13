// DOM elementlari
const loginPage = document.getElementById('login-page');
const registerPage = document.getElementById('register-page');
const showRegister = document.getElementById('show-register');
const showLogin = document.getElementById('show-login');
const toast = document.getElementById('toast');
const toastTitle = document.getElementById('toast-title');
const toastMessage = document.getElementById('toast-message');
const toastClose = document.getElementById('toast-close');

// Sahifalar orasida o'tish
showRegister.addEventListener('click', function(e) {
    e.preventDefault();
    switchPage(loginPage, registerPage);
});

showLogin.addEventListener('click', function(e) {
    e.preventDefault();
    switchPage(registerPage, loginPage);
});

function switchPage(fromPage, toPage) {
    fromPage.classList.remove('active');
    setTimeout(() => {
        toPage.classList.add('active');
    }, 300);
}

// Parol ko'rsatish/yashirish
function setupPasswordToggle(passwordInputId, toggleButtonId) {
    const passwordInput = document.getElementById(passwordInputId);
    const toggleButton = document.getElementById(toggleButtonId);
    
    toggleButton.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Ikonkani o'zgartirish
        const icon = toggleButton.querySelector('i');
        if (type === 'text') {
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    });
}

// Parol ko'rsatish/yashirish funksiyalarini sozlash
setupPasswordToggle('login-password', 'login-toggle-password');
setupPasswordToggle('register-password', 'register-toggle-password');
setupPasswordToggle('register-confirm-password', 'register-toggle-confirm-password');

// Parol kuchliligini tekshirish
document.getElementById('register-password').addEventListener('input', function() {
    const password = this.value;
    const strengthIndicator = document.getElementById('password-strength-indicator');
    const strengthText = document.getElementById('password-strength-text');
    
    // Parol kuchliligini hisoblash
    let strength = 0;
    let feedback = '';
    
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/\d/)) strength++;
    if (password.match(/[^a-zA-Z\d]/)) strength++;
    
    // Kuchlilik darajasiga qarab rang va matn o'zgartirish
    strengthIndicator.className = 'password-strength-indicator';
    
    if (password.length === 0) {
        strengthText.textContent = 'Parol kuchliligi';
        strengthText.style.color = '';
    } else if (strength <= 1) {
        strengthIndicator.classList.add('strength-weak');
        strengthText.textContent = 'Zaif parol';
        strengthText.style.color = 'var(--danger-color)';
    } else if (strength <= 3) {
        strengthIndicator.classList.add('strength-medium');
        strengthText.textContent = 'Oʻrtacha parol';
        strengthText.style.color = 'var(--warning-color)';
    } else {
        strengthIndicator.classList.add('strength-strong');
        strengthText.textContent = 'Kuchli parol';
        strengthText.style.color = 'var(--success-color)';
    }
});

// Form validatsiyasi
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    // Kamida 8 ta belgi, katta va kichik harf, raqam
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return re.test(password);
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = 'flex';
}

function hideError(elementId) {
    const errorElement = document.getElementById(elementId);
    errorElement.style.display = 'none';
}

// Yuklanish holatini ko'rsatish
function showLoading(button) {
    button.classList.add('loading');
}

function hideLoading(button) {
    button.classList.remove('loading');
}

// Toast xabarlari
function showToast(title, message, type = 'success') {
    toast.className = `toast ${type} show`;
    toastTitle.textContent = title;
    toastMessage.textContent = message;
    
    // Avtomatik yopilish
    setTimeout(() => {
        hideToast();
    }, 5000);
}

function hideToast() {
    toast.classList.remove('show');
}

toastClose.addEventListener('click', hideToast);

// Login form qayta ishlash
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault(); // sahifani darhol o‘tishini to‘xtatadi ✅

    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();
    const loginButton = document.getElementById('login-button');
    const rememberMe = document.getElementById('remember-me').checked;

    let isValid = true;

    // === 1. Email tekshiruvi ===
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        showError('login-email-error', 'Iltimos, to‘g‘ri elektron pochta kiriting');
        isValid = false;
    } else {
        hideError('login-email-error');
    }

    // === 2. Parol uzunligini tekshirish ===
    if (password.length < 6) {
        showError('login-password-error', 'Parol kamida 6 ta belgidan iborat bo‘lishi kerak');
        isValid = false;
    } else {
        hideError('login-password-error');
    }

    // === 3. Agar xatolik bo‘lsa — form yuborilmaydi ===
    if (!isValid) return;

    // === 4. Yuklanish animatsiyasi ===
    showLoading(loginButton);

    // === 5. Backendga yuborishdan oldin 1.5 sekund simulyatsiya ===
    setTimeout(() => {
        hideLoading(loginButton);

        // === 6. Foydalanuvchiga muvaffaqiyat xabari ===
        showToast('Muvaffaqiyatli kirildi!', 'Xush kelibsiz!', 'success');

        // === 7. Endi haqiqiy yuborish (Django view ga) ===
        document.getElementById('login-form').submit();
    }, 1500);
});


// === 🔧 Yordamchi funksiyalar ===
function showError(id, message) {
    const el = document.getElementById(id);
    el.textContent = message;
    el.style.display = 'block';
}

function hideError(id) {
    const el = document.getElementById(id);
    el.textContent = '';
    el.style.display = 'none';
}

function showLoading(button) {
    button.disabled = true;
    button.querySelector('.button-text').style.display = 'none';
    button.querySelector('.button-loader').style.display = 'flex';
}

function hideLoading(button) {
    button.disabled = false;
    button.querySelector('.button-text').style.display = 'inline';
    button.querySelector('.button-loader').style.display = 'none';
}

// Toast xabar (Bootstrap yoki custom bo‘lishi mumkin)
function showToast(title, text, type) {
    console.log(`[${type.toUpperCase()}] ${title} — ${text}`);
}


    // Agar hammasi to‘g‘ri bo‘lsa
    showLoading(loginButton);

    // Simulyatsiya - 2 soniya kutish
    setTimeout(() => {
        hideLoading(loginButton);
        showToast('Muvaffaqiyatli kirildi!', 'Xush kelibsiz!', 'success');

        // Backendga POST yoki login logikasi shu yerda bo‘ladi
        console.log('Login ma\'lumotlari:', { email, password, rememberMe });

        // Agar xohlasa, sahifani boshqa joyga yo‘naltirish
        // window.location.href = '/dashboard/';
    }, 2000);



// Register form qayta ishlash
document.getElementById('register-form').addEventListener('submit', function(e) {
    e.preventDefault(); // muhim! sahifa darhol o'tmasligi uchun

    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;
    const acceptTerms = document.getElementById('accept-terms').checked;
    const registerButton = document.getElementById('register-button');

    // Frontend validatsiya
    let isValid = true;
    if (name.length < 2) { showError('register-name-error','Ism kamida 2 ta'); isValid=false; } 
    else { hideError('register-name-error'); }
    if (!validateEmail(email)) { showError('register-email-error','Email xato'); isValid=false; } 
    else { hideError('register-email-error'); }
    if (!validatePassword(password)) { showError('register-password-error','Parol xato'); isValid=false; } 
    else { hideError('register-password-error'); }
    if (password !== confirmPassword) { showError('register-confirm-password-error','Parollar mos emas'); isValid=false; } 
    else { hideError('register-confirm-password-error'); }
    if (!acceptTerms) { showToast('Diqqat!','Shartlarni qabul qiling','warning'); isValid=false; }

    if (!isValid) return; // xatolar bo‘lsa, sahifa o‘tmasin

    // Agar hammasi to‘g‘ri bo‘lsa
    showLoading(registerButton);
    setTimeout(() => {
        hideLoading(registerButton);
        showToast('Muvaffaqiyatli!','Hisob yaratildi','success');
        switchPage(registerPage, loginPage); // faqat endi sahifani o‘tkazamiz
        document.getElementById('register-form').reset();
    }, 1000);
});
    // Yuklanish holatini ko'rsatish
    showLoading(registerButton);
    
    // Simulyatsiya - 2 soniya kutish
    setTimeout(() => {
        hideLoading(registerButton);
        showToast('Muvaffaqiyatli ro\'yxatdan o\'tildi!', 'Hisobingiz yaratildi', 'success');
        
        // Bu yerda haqiqiy ro'yxatdan o'tish logikasi bo'ladi
        console.log('Register ma\'lumotlari:', { name, email, password });
        
        // Login sahifasiga o'tish
        setTimeout(() => {
            switchPage(registerPage, loginPage);
            
            // Formani tozalash
            document.getElementById('register-form').reset();
            document.getElementById('password-strength-indicator').className = 'password-strength-indicator';
            document.getElementById('password-strength-text').textContent = 'Parol kuchliligi';
            document.getElementById('password-strength-text').style.color = '';
        }, 1000);
    }, 2000);

// Real-time validatsiya
document.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('blur', function() {
        const id = this.id;
        
        if (id === 'login-email' || id === 'register-email') {
            if (this.value && !validateEmail(this.value)) {
                showError(`${id}-error`, 'Iltimos, to\'g\'ri elektron pochta manzilini kiriting');
            } else {
                hideError(`${id}-error`);
            }
        }
        
        if (id === 'register-password') {
            if (this.value && !validatePassword(this.value)) {
                showError(`${id}-error`, 'Parol kamida 8 ta belgidan iborat bo\'lishi, katta-kichik harf va raqamni o\'z ichiga olishi kerak');
            } else {
                hideError(`${id}-error`);
            }
        }
        
        if (id === 'register-confirm-password') {
            const password = document.getElementById('register-password').value;
            if (this.value && this.value !== password) {
                showError(`${id}-error`, 'Parollar mos kelmadi');
            } else {
                hideError(`${id}-error`);
            }
        }
    });
});

// Social login tugmalari
document.querySelectorAll('.social-btn').forEach(button => {
    button.addEventListener('click', function() {
        const platform = this.classList.contains('google-btn') ? 'Google' : 'Facebook';
        showToast('Tez orada', `${platform} orqali kirish imkoniyati tez orada qo'shiladi`, 'warning');
    });
});

// Parolni unutish
document.querySelector('.forgot-password').addEventListener('click', function(e) {
    e.preventDefault();
    showToast('Tez orada', 'Parolni tiklash imkoniyati tez orada qo\'shiladi', 'warning');
});

// Sahifa yuklanganda animatsiya
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.form-container').style.opacity = '0';
    document.querySelector('.form-container').style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        document.querySelector('.form-container').style.transition = 'all 0.5s ease';
        document.querySelector('.form-container').style.opacity = '1';
        document.querySelector('.form-container').style.transform = 'translateY(0)';
    }, 100);
});