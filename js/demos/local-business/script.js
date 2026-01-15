document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Toggle between hamburger and close icon
        if(navLinks.classList.contains('active')) {
            hamburger.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });

    // Close menu when link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // 2. THE DEMO TRIGGER (Crucial for portfolio)
    // This intercepts clicks on "Order" buttons to show it's a demo.
    const demoTriggers = document.querySelectorAll('.demo-trigger');

    demoTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            // If it's an anchor tag with '#' href, prevent default jump
            if(trigger.tagName === 'A' && trigger.getAttribute('href') === '#') {
                e.preventDefault();
            }
            
            // The Sales Pitch Alert
            alert("👨‍💻 DEMO MODE\n\nIn a real website, clicking this would open WhatsApp with the product/order pre-filled so the customer can send it to the shop owner instantly.\n\nSimple and fast!");
        });
    });
});