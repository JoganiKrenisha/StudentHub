const themeToggle = document.getElementById("themeToggle");

// Apply saved theme
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");

    if (themeToggle) {
        themeToggle.textContent = "☀️ Light Mode";
    }
}

// Toggle theme
if (themeToggle) {
    themeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            themeToggle.textContent = "☀️ Light Mode";
            localStorage.setItem("theme", "dark");
        } else {
            themeToggle.textContent = "🌙 Dark Mode";
            localStorage.setItem("theme", "light");
        }
    });
}

// ===============================
// NOTIFICATION SYSTEM
// ===============================

const notification = {
    available: true,
    message: "Your attendance report has been updated."
};


// Show notification when dashboard loads
function showNotification() {

    const banner = document.getElementById("notificationBanner");
    const text = document.getElementById("notificationText");

    // If notification elements don't exist on this page,
    // do nothing.
    if (!banner || !text) {
        return;
    }

    if (notification.available) {

        text.textContent = notification.message;

        banner.style.display = "flex";

    } else {

        banner.style.display = "none";

    }
}


// Close notification
function closeNotification() {

    const banner = document.getElementById("notificationBanner");

    if (banner) {
        banner.style.display = "none";
    }

}


// View notification
function viewNotification() {

    window.location.href = "notifications.html";

}
function viewNotification() {
    window.location.href = "attendance.html";
}


// Run when page loads
document.addEventListener("DOMContentLoaded", function () {

    showNotification();

});


// send msg for contact page 
const contactForm = document.querySelector(".contact-box form");

if (contactForm) {
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();

        alert("Message sent successfully!");

        contactForm.reset();
    });
}

// Logout confirmation
const logoutButton = document.querySelector(".yes-btn");

if (logoutButton) {
    logoutButton.addEventListener("click", function(event) {
        const confirmLogout = confirm("Are you sure you want to logout?");

        if (!confirmLogout) {
            event.preventDefault();
        }
    });
}  

// Profile Image Preview
const profileImage = document.getElementById("profileImage");
const profilePreview = document.getElementById("profilePreview");

if (profilePreview) {

    profilePreview.addEventListener("click", function () {
        profileImage.click();
    });

    profileImage.addEventListener("change", function () {

        const file = this.files[0];

        if (file) {
            profilePreview.src = URL.createObjectURL(file);
        }

    });
}


// Save Profile
const profileForm = document.getElementById("profileForm");

if (profileForm) {

    profileForm.addEventListener("submit", function(event) {

        event.preventDefault();

        alert("Profile Saved Successfully!");

     

    });
}

//hamburger menu  
const menuToggle = document.getElementById("menuToggle");
const hamburgerMenu = document.getElementById("hamburgerMenu");

menuToggle.addEventListener("click", function () {

    hamburgerMenu.classList.toggle("show");

}); 

// FAQ Accordion

const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach(function(question) {

    question.addEventListener("click", function() {

        const answer = question.nextElementSibling;

        answer.classList.toggle("show");

        const symbol = question.querySelector("span");

        if (answer.classList.contains("show")) {
            symbol.textContent = "−";
        } else {
            symbol.textContent = "+";
        }

    });

});

// =========================
// IMAGE / CONTENT SLIDER
// =========================

let slideIndex = 1;

showSlide(slideIndex);


// Next / Previous

function changeSlide(n) {

    showSlide(slideIndex += n);

}


// Dot navigation

function currentSlide(n) {

    showSlide(slideIndex = n);

}


// Show slide

function showSlide(n) {

    let slides = document.querySelectorAll(".slide");

    let dots = document.querySelectorAll(".dot");


    if (n > slides.length) {
        slideIndex = 1;
    }

    if (n < 1) {
        slideIndex = slides.length;
    }


    slides.forEach(function(slide) {
        slide.classList.remove("active");
    });


    dots.forEach(function(dot) {
        dot.classList.remove("active-dot");
    });


    slides[slideIndex - 1].classList.add("active");

    dots[slideIndex - 1].classList.add("active-dot");

}


// Automatic Slider

setInterval(function() {

    changeSlide(1);

}, 3000);