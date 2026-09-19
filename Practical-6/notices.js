let notices = [];

let currentPage = 1;

const noticesPerPage = 3;


// Get HTML elements
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const sortSelect = document.getElementById("sortSelect");

const noticeContainer = document.getElementById("noticeContainer");
const pagination = document.getElementById("pagination");


// Fetch external JSON data
fetch("notices.json")
    .then(response => {

        if (!response.ok) {
            throw new Error("Failed to load JSON data");
        }

        return response.json();
    })

    .then(data => {

        notices = data;

        displayNotices();
    })

    .catch(error => {

        noticeContainer.innerHTML =
            `<p class="error">Error loading notices: ${error.message}</p>`;
    });


// Display notices
function displayNotices() {

    let filteredNotices = [...notices];


    // Search
    const searchText =
        searchInput.value.toLowerCase().trim();

    if (searchText !== "") {

        filteredNotices = filteredNotices.filter(notice =>

            notice.title.toLowerCase().includes(searchText) ||

            notice.description.toLowerCase().includes(searchText) ||

            notice.category.toLowerCase().includes(searchText)
        );
    }


    // Filter
    const selectedCategory = categoryFilter.value;

    if (selectedCategory !== "All") {

        filteredNotices = filteredNotices.filter(notice =>
            notice.category === selectedCategory
        );
    }


    // Sorting
    const sortValue = sortSelect.value;

    if (sortValue === "newest") {

        filteredNotices.sort((a, b) =>
            new Date(b.date) - new Date(a.date)
        );

    }

    else if (sortValue === "oldest") {

        filteredNotices.sort((a, b) =>
            new Date(a.date) - new Date(b.date)
        );

    }

    else if (sortValue === "titleAZ") {

        filteredNotices.sort((a, b) =>
            a.title.localeCompare(b.title)
        );

    }

    else if (sortValue === "titleZA") {

        filteredNotices.sort((a, b) =>
            b.title.localeCompare(a.title)
        );
    }


    // Reset page if current page is invalid
    const totalPages =
        Math.ceil(filteredNotices.length / noticesPerPage);

    if (currentPage > totalPages) {
        currentPage = totalPages || 1;
    }


    // Pagination
    const startIndex =
        (currentPage - 1) * noticesPerPage;

    const endIndex =
        startIndex + noticesPerPage;

    const pageNotices =
        filteredNotices.slice(startIndex, endIndex);


    // Clear previous notices
    noticeContainer.innerHTML = "";


    // No results
    if (pageNotices.length === 0) {

        noticeContainer.innerHTML =
            `<p class="no-result">No notices found.</p>`;

        pagination.innerHTML = "";

        return;
    }


    // Dynamic rendering
    pageNotices.forEach(notice => {

        const noticeCard = document.createElement("div");

        noticeCard.className = "notice-card";


        noticeCard.innerHTML = `

            <h3>${notice.title}</h3>

            <p>
                <strong>Category:</strong>
                ${notice.category}
            </p>

            <p>
                <strong>Date:</strong>
                ${notice.date}
            </p>

            <p>
                ${notice.description}
            </p>

        `;


        noticeContainer.appendChild(noticeCard);
    });


    createPagination(totalPages);
}


// Create pagination buttons
function createPagination(totalPages) {

    pagination.innerHTML = "";


    if (totalPages <= 1) {
        return;
    }


    // Previous button
    const previousButton =
        document.createElement("button");

    previousButton.textContent = "Previous";

    previousButton.disabled =
        currentPage === 1;

    previousButton.onclick = function () {

        if (currentPage > 1) {

            currentPage--;

            displayNotices();
        }
    };


    pagination.appendChild(previousButton);


    // Page buttons
    for (let i = 1; i <= totalPages; i++) {

        const pageButton =
            document.createElement("button");

        pageButton.textContent = i;


        if (i === currentPage) {
            pageButton.classList.add("active-page");
        }


        pageButton.onclick = function () {

            currentPage = i;

            displayNotices();
        };


        pagination.appendChild(pageButton);
    }


    // Next button
    const nextButton =
        document.createElement("button");

    nextButton.textContent = "Next";

    nextButton.disabled =
        currentPage === totalPages;


    nextButton.onclick = function () {

        if (currentPage < totalPages) {

            currentPage++;

            displayNotices();
        }
    };


    pagination.appendChild(nextButton);
}


// Search event
searchInput.addEventListener("input", function () {

    currentPage = 1;

    displayNotices();
});


// Filter event
categoryFilter.addEventListener("change", function () {

    currentPage = 1;

    displayNotices();
});


// Sorting event
sortSelect.addEventListener("change", function () {

    currentPage = 1;

    displayNotices();
});


// Dark mode
const themeToggle =
    document.getElementById("themeToggle");

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


// Load saved theme
const savedTheme =
    localStorage.getItem("theme");

if (savedTheme === "dark") {

    document.body.classList.add("dark-mode");

    themeToggle.textContent = "☀️ Light Mode";
}