document.addEventListener('DOMContentLoaded', () => {
    
    // 1. MOBILE MENU TOGGLE (If you add a hamburger icon later)
    // For now, smooth scrolling is the main UI feature needed
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 2. FORM HANDLING (Web3Forms via AJAX)
    const form = document.getElementById('leadForm');
    const result = document.getElementById('formStatus');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(form);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        result.innerHTML = "Please wait...";
        result.style.color = "#gray";

        fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            })
            .then(async (response) => {
                let json = await response.json();
                if (response.status == 200) {
                    result.innerHTML = "✅ Thanks! I will call you shortly.";
                    result.style.color = "#25D366"; // Success Green
                    form.reset();
                } else {
                    console.log(response);
                    result.innerHTML = json.message;
                    result.style.color = "red";
                }
            })
            .catch(error => {
                console.log(error);
                result.innerHTML = "Something went wrong!";
                result.style.color = "red";
            });
    });
});