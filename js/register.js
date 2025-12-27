// Register Page JavaScript

// Toggle Password Visibility
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');

if (togglePassword && passwordInput) {
    togglePassword.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        const icon = togglePassword.querySelector('i');
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');
    });
}

// Toggle Confirm Password Visibility
const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
const confirmPasswordInput = document.getElementById('confirmPassword');

if (toggleConfirmPassword && confirmPasswordInput) {
    toggleConfirmPassword.addEventListener('click', () => {
        const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        confirmPasswordInput.setAttribute('type', type);
        
        const icon = toggleConfirmPassword.querySelector('i');
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');
    });
}

// Form Submission
const registerForm = document.getElementById('registerForm');

if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(registerForm);
        const data = Object.fromEntries(formData);
        
        // Validate passwords match
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        
        // Validate password strength
        if (password.length < 8) {
            alert('Password must be at least 8 characters long!');
            return;
        }
        
        // Simulate registration
        const registerBtn = registerForm.querySelector('.login-btn');
        const originalText = registerBtn.innerHTML;
        
        registerBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating account...';
        registerBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            registerBtn.innerHTML = '<i class="fas fa-check"></i> Account Created!';
            registerBtn.style.background = '#10b981';
            
            setTimeout(() => {
                // Redirect to login page
                window.location.href = 'login.html';
            }, 2000);
        }, 1500);
    });
}

// Social Register Buttons
const googleRegisterBtn = document.getElementById('googleRegister');
const facebookRegisterBtn = document.getElementById('facebookRegister');

if (googleRegisterBtn) {
    googleRegisterBtn.addEventListener('click', () => {
        // Simulate Google registration
        googleRegisterBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connecting...';
        googleRegisterBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // In a real application, this would redirect to Google OAuth
            // For demo purposes, redirect to login page after successful registration
            googleRegisterBtn.innerHTML = '<i class="fas fa-check"></i> Account Created!';
            googleRegisterBtn.style.background = '#10b981';
            googleRegisterBtn.style.borderColor = '#10b981';
            googleRegisterBtn.style.color = 'white';
            
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        }, 1500);
    });
}

if (facebookRegisterBtn) {
    facebookRegisterBtn.addEventListener('click', () => {
        // Simulate Facebook registration
        facebookRegisterBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connecting...';
        facebookRegisterBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // In a real application, this would redirect to Facebook OAuth
            // For demo purposes, redirect to login page after successful registration
            facebookRegisterBtn.innerHTML = '<i class="fas fa-check"></i> Account Created!';
            facebookRegisterBtn.style.background = '#10b981';
            facebookRegisterBtn.style.borderColor = '#10b981';
            facebookRegisterBtn.style.color = 'white';
            
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        }, 1500);
    });
}

// 3D Effect on Register Wrapper
const loginWrapper = document.querySelector('.login-wrapper');
if (loginWrapper) {
    document.addEventListener('mousemove', (e) => {
        if (window.innerWidth > 768) {
            const x = (e.clientX / window.innerWidth - 0.5) * 10;
            const y = (e.clientY / window.innerHeight - 0.5) * 10;
            loginWrapper.style.transform = `translateY(-10px) rotateX(${y}deg) rotateY(${x}deg)`;
        }
    });
}








