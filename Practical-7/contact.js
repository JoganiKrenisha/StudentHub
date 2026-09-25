document.addEventListener("DOMContentLoaded", function () {

    const form = document.querySelector(".contact-box form");

    if (!form) {
        return;
    }

    // Show success alert after PHP redirects back
    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.get("success") === "1") {
        alert("Message Sent Successfully!");
    }

    form.addEventListener("submit", function (event) {

        let valid = true;

        const name = document.querySelector('input[name="name"]');
        const email = document.querySelector('input[name="email"]');
        const message = document.querySelector('textarea[name="message"]');

        name.classList.remove("input-error");
        email.classList.remove("input-error");
        message.classList.remove("input-error");

        // Name validation
        const namePattern = /^[A-Za-z ]{2,50}$/;

        if (!namePattern.test(name.value.trim())) {
            alert("Please enter a valid name.");
            name.classList.add("input-error");
            valid = false;
        }

        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email.value.trim())) {
            alert("Please enter a valid email address.");
            email.classList.add("input-error");
            valid = false;
        }

        // Message validation
        if (message.value.trim() === "") {
            alert("Please enter your message.");
            message.classList.add("input-error");
            valid = false;
        }

        // Stop form if validation fails
        if (!valid) {
            event.preventDefault();
        }

    });

}); 