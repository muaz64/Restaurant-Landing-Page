// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form Validation
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // More robust email regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        e.preventDefault();
        alert('Please enter a valid email address.');
        return;
    }

    if (message.trim() === '') {
        e.preventDefault();
        alert('Please enter a message.');
        return;
    }

    // If everything is okay
    alert('Form submitted successfully!');
    form.reset(); // Clear the form after submission
});
