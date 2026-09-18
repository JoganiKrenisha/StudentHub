document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("registerForm");

    if (!form) {
        return;
    }

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        let valid = true;

        const fullName = document.getElementById("fullName");
        const email = document.getElementById("email");
        const password = document.getElementById("password");
        const confirmPassword = document.getElementById("confirmPassword");

        const nameError = document.getElementById("nameError");
        const emailError = document.getElementById("emailError");
        const passwordError = document.getElementById("passwordError");
        const confirmError = document.getElementById("confirmError");

        // Clear old errors
        nameError.textContent = "";
        emailError.textContent = "";
        passwordError.textContent = "";
        confirmError.textContent = "";

        fullName.classList.remove("input-error");
        email.classList.remove("input-error");
        password.classList.remove("input-error");
        confirmPassword.classList.remove("input-error");


        // Name validation
        const namePattern = /^[A-Za-z ]{2,50}$/;

        if (!namePattern.test(fullName.value.trim())) {
            nameError.textContent = "Please enter a valid name.";
            fullName.classList.add("input-error");
            valid = false;
        }


        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email.value.trim())) {
            emailError.textContent = "Enter a valid email address.";
            email.classList.add("input-error");
            valid = false;
        }


        // Password validation
        const passwordPattern =
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$/;

        if (!passwordPattern.test(password.value)) {
            passwordError.textContent =
                "Must be 8+ chars, contain 1 letter, 1 number, and 1 special character.";
            password.classList.add("input-error");
            valid = false;
        }


        // Confirm password
        if (confirmPassword.value !== password.value || confirmPassword.value === "") {
            confirmError.textContent = "Passwords do not match.";
            confirmPassword.classList.add("input-error");
            valid = false;
        }


        // Success
        if (valid) {
            alert("Registration Successful!");
            form.reset();
        }

    });

});