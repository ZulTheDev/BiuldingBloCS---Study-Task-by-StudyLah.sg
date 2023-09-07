// Constants
const SGPassImage = document.getElementById("SGPass");
const Classroom = document.getElementById("GCR");
const CSA = document.getElementById("CSA");
const SLSImage = document.getElementById("SLS");
const ProfileImage = document.getElementById("profile");
const ProfileImageUpload = document.getElementById("profile-image-upload");
const GreetUserElement = document.querySelector(".GreetUser");

// Hoover for SLS
SLSImage.addEventListener("mousedown", function (event) {
    handleImageClick(event, "https://vle.learning.moe.edu.sg/login", "SLS is one of the way that your teacher will assign you work and revisions.");
});

SLSImage.addEventListener("mouseleave", () => {
    SLSImage.style.backgroundColor = "transparent";
    SLSImage.style.boxShadow = "none";
    SLSImage.title = "";
});

// Function to handle both left-click and right-click behaviors
function handleImageClick(event, link, previewText) {
    if (event.button === 0) {
        // Left-click behavior (preview)
        event.preventDefault(); // Prevent the default action (opening a new tab)
        event.stopPropagation(); // Prevent bubbling to parent elements

        // Show a preview with the provided text
        showPreview(previewText);
    } else if (event.button === 2) {
        // Right-click behavior (redirect)
        window.open(link, "_blank");
    }
}

// Function to show a preview with the given text
function showPreview(previewText) {
    // Modify or display the preview as desired
    // For example, you can show a tooltip or a popup with the previewText
    // In this example, we'll simply log it to the console
    console.log(previewText);
}

// Update the event listeners for the images
CSA.addEventListener("mousedown", function (event) {
    handleImageClick(event, "https://www.csa.gov.sg/", "CSA is a Singapore Cybersecurity Agency. Their job is to keep Singapore and our cyberspace safe.");
});

Classroom.addEventListener("mousedown", function (event) {
    handleImageClick(event, "https://classroom.google.com/", "Google Classroom is a virtual class that your teacher had assigned. He/She will be able to keep track of your work assignments assigned on Google Classroom.");
});

SGPassImage.addEventListener("mousedown", function (event) {
    handleImageClick(event, "https://www.singpass.gov.sg/main/", "SingPass is a virtual NRIC All-in-one tool that simplifies users' daily tasks and needs. This is designed by GovTech.");
});



// Import the ioredis library
const Redis = require('ioredis');

// Create a connection to your Upstash Redis instance
const redis = new Redis({
    host: 'redis://default:8d3af28fd1f84ef29cbcca10215c79e9@finer-crane-36538.upstash.io',
    port: '36538',
    password: '8d3af28fd1f84ef29cbcca10215c79e9', // Your Upstash password
    tls: {
      rejectUnauthorized: false, // Add this line if you're using TLS/SSL
    },
  });

// Check if the user is in the database
const userId = "USER_ID"; // Replace with the actual user ID
redis.get(`users:${userId}`, (err, result) => {
    if (!err && result) {
        const userData = JSON.parse(result);
        // Check if the user is in the database
        if (userData.username) {
            const userName = userData.username;
            GreetUserElement.textContent = `Hi, ${userName}!`;
        } else {
            ProfileImage.title = "Create Account";
            GreetUserElement.textContent = "Hi, Anonymous Student!";
        }
    }
});

// Hover effect + text for user-friendly interaction
ProfileImage.addEventListener("mouseenter", () => {
    ProfileImage.style.transform = "scale(1.1)";
    ProfileImage.style.boxShadow = "0 0 20px rgba(255, 255, 255, 0.5)";
    ProfileImage.title = "Account";
});

ProfileImage.addEventListener("mouseleave", () => {
    ProfileImage.style.transform = "scale(1)";
    ProfileImage.style.boxShadow = "none";
    ProfileImage.title = "";
});

// When the user clicks on the profile picture, perform this action
ProfileImage.addEventListener("click", function () {
    window.location.href = "sso.html"; 
});

// Check if the user is authenticated
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        GreetUserElement.textContent = `Hi, ${user.displayName || user.email}!`;

        ProfileImageUpload.addEventListener("change", () => {
            const file = ProfileImageUpload.files[0];
            if (file) {
                const reader = new FileReader();

                reader.onload = (event) => {
                    ProfileImage.src = event.target.result;
                };

                reader.readAsDataURL(file);
            }
        });
    } else {
        ProfileImage.title = "Create Account";
        GreetUserElement.textContent = "Hi, Anonymous Student!";
    }
});
