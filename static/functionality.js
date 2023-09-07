// Constants
const SGPassImage = document.getElementById("SGPass");
const Classroom = document.getElementById("GCR");
const CSA = document.getElementById("CSA");
const SLSImage = document.getElementById("SLS");
const ProfileImage = document.getElementById("profile");
const ProfileImageUpload = document.getElementById("profile-image-upload");
const GreetUserElement = document.querySelector(".GreetUser");

// Hoover for SLS
SLSImage.addEventListener("mouseenter", () => {
    SLSImage.style.backgroundColor = "lightblue";
    SLSImage.style.boxShadow = "0 0 10px rgba(138, 43, 226, 0.5)";
    SLSImage.title = "Account";
});

SLSImage.addEventListener("mouseleave", () => {
    SLSImage.style.backgroundColor = "transparent";
    SLSImage.style.boxShadow = "none";
    SLSImage.title = "";
});

// Open the website in a new tab when left-clicked
SLSImage.addEventListener("click", () => {
    window.open("https://vle.learning.moe.edu.sg/login", "_blank");
});

// Create a function to handle both left-click and right-click behaviors
function handleImageClick(event, link) {
    if (event.button === 0) {
        // Left-click behavior
        window.open(link, "_blank");
    } else if (event.button === 2) {
        // Right-click behavior
        event.stopPropagation(); // Prevent the context menu from showing
    }
}

// Create a function to handle right-click behavior
function handleRightClick(event, hoverText) {
    event.preventDefault();
    event.stopPropagation(); // Prevent the context menu from showing
    this.style.backgroundColor = "blue";

    const csaHoverText = document.createElement("div");
    csaHoverText.textContent = hoverText;
    csaHoverText.className = "hover-text";
    this.appendChild(csaHoverText);

    // Remove the hover text when clicking elsewhere
    const removeHoverText = () => {
        this.style.backgroundColor = "transparent";
        const hoverTextElement = this.querySelector(".hover-text");
        if (hoverTextElement) {
            this.removeChild(hoverTextElement);
        }
        document.removeEventListener("click", removeHoverText);
    };

    // Listen for clicks outside of the element to remove hover text
    document.addEventListener("click", removeHoverText);

    // Left-click behavior
    this.addEventListener("click", (event) => {
        if (event.button === 0) {
            window.open("https://www.csa.gov.sg/", "_blank");
        }
    });
}

// CSA Image section
CSA.addEventListener("contextmenu", function (event) {
    handleRightClick.call(this, event, "CSA is a Singapore Cybersecurity Agency. Their job is to keep Singapore and our cyberspace safe.");
});

// GCR Image section
Classroom.addEventListener("contextmenu", function (event) {
    handleRightClick.call(this, event, "Google Classroom is a virtual class that your teacher had assigned. He/She will be able to keep track of your work assignments assigned on Google Classroom.");
});

// SGPass Image section
SGPassImage.addEventListener("contextmenu", function (event) {
    handleRightClick.call(this, event, "SingPass is a virtual NRIC All-in-one tool that simplifies users' daily tasks and needs. This is designed by GovTech.");
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
