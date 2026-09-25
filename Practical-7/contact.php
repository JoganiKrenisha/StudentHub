<?php

// Check whether form was submitted using POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Get form data
    $name = $_POST["name"] ?? "";
    $email = $_POST["email"] ?? "";
    $message = $_POST["message"] ?? "";

    // Remove unnecessary spaces
    $name = trim($name);
    $email = trim($email);
    $message = trim($message);

    // Sanitize input
    $name = htmlspecialchars($name);
    $email = htmlspecialchars($email);
    $message = htmlspecialchars($message);

    // Validation
    $errors = [];

    // Name validation
    if (empty($name)) {
        $errors[] = "Name is required.";
    } elseif (!preg_match("/^[A-Za-z ]{2,50}$/", $name)) {
        $errors[] = "Name must contain only letters and spaces.";
    }

    // Email validation
    if (empty($email)) {
        $errors[] = "Email is required.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Please enter a valid email address.";
    }

    // Message validation
    if (empty($message)) {
        $errors[] = "Message is required.";
    } elseif (strlen($message) < 5) {
        $errors[] = "Message must contain at least 5 characters.";
    }


    // If there are errors
    if (!empty($errors)) {

        echo "<!DOCTYPE html>";
        echo "<html>";
        echo "<head>";
        echo "<title>StudentHub - Error</title>";
        echo "<link rel='stylesheet' href='style.css'>";
        echo "</head>";

        echo "<body>";

        echo "<div class='contact-box'>";

        echo "<h2>❌ Form Submission Failed</h2>";

        echo "<ul>";

        foreach ($errors as $error) {
            echo "<li>" . $error . "</li>";
        }

        echo "</ul>";

        echo "<br>";

        echo "<a href='contact.html'>Go Back to Contact Form</a>";

        echo "</div>";

        echo "</body>";
        echo "</html>";

        exit();
    }


    // CSV file name
    $file = "contacts.csv";

    // Check if file exists
    $fileExists = file_exists($file);

    // Open CSV file
    $handle = fopen($file, "a");

    // If file cannot be opened
    if ($handle === false) {

        die("Error: Unable to open CSV file.");

    }


    // Add heading if file is new
    if (!$fileExists || filesize($file) == 0) {

        fputcsv($handle, [
            "Name",
            "Email",
            "Message"
        ]);

    }


    // Store data in CSV
    fputcsv($handle, [
        $name,
        $email,
        $message
    ]);


    // Close file
    fclose($handle);


    // Redirect back to contact page after successful submission
header("Location: contact.html?success=1");
exit(); 

} else {

    // If PHP page is opened directly
    header("Location: contact.html");
    exit();

}

?> 