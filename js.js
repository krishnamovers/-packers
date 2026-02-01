 // DOM Ready Function
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== MOBILE MENU TOGGLE =====
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // ===== FORM SUBMISSION =====
    // const leadForm = document.getElementById('leadForm');
    
    // if (leadForm) {
    //     leadForm.addEventListener('submit', function(e) {
    //         e.preventDefault();
            
    //         // Get form data
    //         const formData = new FormData(leadForm);
    //         const data = Object.fromEntries(formData);
            
    //         // Simple validation
    //         if (!data.name || !data.phone || !data.pickup || !data.drop || !data.service) {
    //             showAlert('Please fill all required fields.', 'error');
    //             return;
    //         }
            
            // Phone validation (Indian numbers)
            const phoneRegex = /^[6-9]\d{9}$/;
            if (!phoneRegex.test(data.phone.replace(/\D/g, ''))) {
                showAlert('Please enter a valid Indian mobile number.', 'error');
                return;
            }
            
            // Show success message
            showAlert('Aapki query submit ho chuki hai. Krishna Movers ki taraf se aapko jald hi call aayega.', 'success');
            
            // For Google Sheets integration later
            // This structure makes it easy to connect to Google Sheets
            console.log('Form data ready for Google Sheets:', data);
            
            // Simulate form submission to Google Sheets
            submitToGoogleSheets(data);
            
            // Reset form
            leadForm.reset();
        });
    
    
    // ===== SCROLL ANIMATIONS =====
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.service-card, .testimonial-card, .feature');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('fade-in');
            }
        });
    };
    
    // Initial check on load
    animateOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // ===== NAVBAR SCROLL EFFECT =====
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            navbar.style.padding = '10px 0';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            navbar.style.padding = '15px 0';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // ===== ACTIVE NAV LINK ON SCROLL =====
    const sections = document.querySelectorAll('section[id]');
    
    const activateNavLink = () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight && navLink) {
                navLink.classList.add('active');
            } else if (navLink) {
                navLink.classList.remove('active');
            }
        });
    };
    
    window.addEventListener('scroll', activateNavLink);
    
    // ===== HELPER FUNCTIONS =====
    function showAlert(message, type = 'success') {
        // Create alert element
        const alertEl = document.createElement('div');
        alertEl.className = `custom-alert ${type}`;
        alertEl.innerHTML = `
            <p>${message}</p>
            <button class="alert-close">&times;</button>
        `;
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .custom-alert {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 20px;
                border-radius: 5px;
                color: white;
                display: flex;
                align-items: center;
                justify-content: space-between;
                min-width: 300px;
                max-width: 400px;
                z-index: 10000;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                animation: slideIn 0.3s ease-out;
            }
            .custom-alert.success {
                background-color: #38a169;
            }
            .custom-alert.error {
                background-color: #e53e3e;
            }
            .custom-alert p {
                margin: 0;
                flex: 1;
            }
            .alert-close {
                background: none;
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                margin-left: 15px;
                line-height: 1;
            }
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(alertEl);
        
        // Close button functionality
        const closeBtn = alertEl.querySelector('.alert-close');
        closeBtn.addEventListener('click', () => {
            alertEl.style.animation = 'slideOut 0.3s ease-out forwards';
            setTimeout(() => {
                document.body.removeChild(alertEl);
            }, 300);
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (document.body.contains(alertEl)) {
                alertEl.style.animation = 'slideOut 0.3s ease-out forwards';
                setTimeout(() => {
                    if (document.body.contains(alertEl)) {
                        document.body.removeChild(alertEl);
                    }
                }, 300);
            }
        }, 5000);
    }
    
    // Function to simulate Google Sheets submission
    // function submitToGoogleSheets(data) {
        // This would be replaced with actual Google Sheets integration
        // For now, we'll just log the data
        // console.log('Submitting to Google Sheets:', data);
        
        // Example of how to structure for Google Apps Script
        // const scriptURL = 'YOUR_GOOGLE_APPS_SCRIPT_URL';
        // fetch(scriptURL, {
        //     method: 'POST',
        //     mode: 'no-cors',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(data)
        // })
        // .then(response => console.log('Success:', response))
        // .catch(error => console.error('Error:', error));
    
    
    // ===== IMAGE LAZY LOADING =====
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                    }
                    
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== INITIALIZE ANIMATIONS =====
    // Add fade-in class to initial elements
    document.querySelectorAll('.service-card, .testimonial-card').forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
    });
// -----
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("leadForm").addEventListener("submit", function (e) {
        e.preventDefault();
        
        // Get form data directly
        const data = {
            name: this.name.value.trim(),
            phone: this.phone.value.trim(),
            service: this.service.value,
            message: this.message.value.trim()
        };
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
        submitBtn.disabled = true;
        
        // Manually encode data with encodeURIComponent (spaces will be %20)
        const url = "https://script.google.com/macros/s/AKfycbzuB-wTcYU7gUnukMsMuDhIhv6qXd1yrdyZ2P7NA7vgC6d7NI1F5kjc2kmsxYOCsyMVYQ/exec";
        
        // Manual encoding - spaces will become %20, not +
        const encodedData = Object.keys(data)
            .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
            .join('&');
        
        // Add timestamp to prevent caching
        const timestamp = new Date().getTime();
        const finalUrl = `${url}?t=${timestamp}`;
        
        fetch(finalUrl, {
            method: "POST",
            mode: 'no-cors',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: encodedData,
            redirect: 'follow'
        })
        .then(() => {
            // Show custom alert message in center of screen
            showCustomAlert();
            this.reset();
        })
        .catch(err => {
            console.error('Error:', err);
            alert("Submission failed. Please try again or call us directly at +91 97172 97514");
        })
        .finally(() => {
            // Reset button state
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
    });
    
    // Custom alert function
    function showCustomAlert() {
        // Create overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
        `;
        
        // Create alert box
        const alertBox = document.createElement('div');
        alertBox.style.cssText = `
            background: white;
            padding: 40px 30px;
            border-radius: 10px;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            max-width: 400px;
            width: 90%;
            animation: fadeIn 0.3s ease;
        `;
        
        // Add success icon
        const successIcon = document.createElement('div');
        successIcon.style.cssText = `
            width: 80px;
            height: 80px;
            background: #38a169;
            border-radius: 50%;
            margin: 0 auto 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 40px;
        `;
        successIcon.innerHTML = '✓';
        
        // Add H1 message
        const h1Message = document.createElement('h1');
        h1Message.style.cssText = `
            color: #1a365d;
            margin: 0 0 15px 0;
            font-size: 24px;
            font-weight: 700;
        `;
        h1Message.textContent = 'Your Query Submitted Successfully';
        
        // Add H4 message
        const h4Message = document.createElement('h4');
        h4Message.style.cssText = `
            color: #38a169;
            margin: 0 0 25px 0;
            font-size: 18px;
            font-weight: 500;
        `;
        h4Message.textContent = 'Krishna Movers ki taraf se aapko jald hi call aayega';
        
        // Add close button
        const closeBtn = document.createElement('button');
        closeBtn.style.cssText = `
            background: #e53e3e;
            color: white;
            border: none;
            padding: 12px 30px;
            border-radius: 5px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
        `;
        closeBtn.innerHTML = '<i class="fas fa-check"></i> OK';
        closeBtn.addEventListener('mouseover', () => {
            closeBtn.style.backgroundColor = '#c53030';
            closeBtn.style.transform = 'translateY(-2px)';
        });
        closeBtn.addEventListener('mouseout', () => {
            closeBtn.style.backgroundColor = '#e53e3e';
            closeBtn.style.transform = 'translateY(0)';
        });
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(overlay);
        });
        
        // Add CSS animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; transform: scale(0.9); }
                to { opacity: 1; transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
        
        // Assemble alert box
        alertBox.appendChild(successIcon);
        alertBox.appendChild(h1Message);
        alertBox.appendChild(h4Message);
        alertBox.appendChild(closeBtn);
        
        // Add to page
        overlay.appendChild(alertBox);
        document.body.appendChild(overlay);
        
        // Auto remove after 8 seconds
        setTimeout(() => {
            if (document.body.contains(overlay)) {
                document.body.removeChild(overlay);
            }
        }, 8000);
        
        // Close on overlay click
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                document.body.removeChild(overlay);
            }
        });
    }
});
    
// document.addEventListener("DOMContentLoaded", function () {
//     document.getElementById("leadForm").addEventListener("submit", function (e) {
//         e.preventDefault();
        
//         // Get form data
//         const formData = new FormData(this);
//         const data = {
//             name: formData.get('name'),
//             phone: formData.get('phone'),
//             service: formData.get('service'),
//             message: formData.get('message')
//         };
        
//         // Show loading state
//         const submitBtn = this.querySelector('button[type="submit"]');
//         const originalText = submitBtn.innerHTML;
//         submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
//         submitBtn.disabled = true;
        
//         // Use URLSearchParams for better compatibility
//         const url = "https://script.google.com/macros/s/AKfycbx8WJUaB1nwq0HB3RzNZfOP8RZIazVahDkkgHXE6wQSQMG5maWB-tMOWeRO6_KXAOFaCA/exec";
        
//         // Create URL encoded data
//         const urlEncodedData = new URLSearchParams();
//         for (const key in data) {
//             urlEncodedData.append(key, data[key]);
//         }
        
//         // Add timestamp to prevent caching issues
//         const timestamp = new Date().getTime();
//         const finalUrl = `${url}?t=${timestamp}`;
        
//         fetch(finalUrl, {
//             method: "POST",
//             mode: 'no-cors', // Important for CORS handling
//             headers: {
//                 "Content-Type": "application/x-www-form-urlencoded"
//             },
//             body: urlEncodedData.toString(),
//             redirect: 'follow'
//         })
//         .then(response => {
//             // With no-cors mode, response won't be accessible
//             // Show success message based on assumption
//             alert("Aapki query submit ho chuki hai. Krishna Movers ki taraf se aapko jald hi call aayega.");
//             document.getElementById("leadForm").reset();
//         })
//         .catch(err => {
//             console.error('Error:', err);
//             alert("Submission failed. Please try again or call us directly at +91 97172 97514");
//         })
//         .finally(() => {
//             // Reset button state
//             submitBtn.innerHTML = originalText;
//             submitBtn.disabled = false;
//         });
//     });
// });