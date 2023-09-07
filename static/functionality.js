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

// Open the website 
SLSImage.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    window.open("https://vle.learning.moe.edu.sg/login", "_blank");
});

// When the user left-clicks, they want to log in instantly without any problems
SLSImage.addEventListener("click", () => {
    const username = prompt("Enter your username:");
    const password = prompt("Enter your password:");

    if (username !== null && password !== null) {
        const url = `https://vle.learning.moe.edu.sg/login?username=${username}&password=${password}`;
        window.location.href = url;
    }
});

// CSA Image section
CSA.addEventListener("contextmenu", function (event) {
    event.preventDefault();
    CSA.style.backgroundColor = "blue";

    const csaHoverText = document.createElement("div");
    csaHoverText.textContent = "CSA is a Singapore Cybersecurity Agency. Their job is to keep Singapore and our cyberspace safe.";
    csaHoverText.className = "hover-text";
    CSA.appendChild(csaHoverText);

    // Remove the hover text when clicking elsewhere
    document.addEventListener("click", function (clickEvent) {
        if (clickEvent.target !== CSA) {
            CSA.style.backgroundColor = "transparent";
            const hoverText = document.querySelector(".hover-text");
            if (hoverText) {
                CSA.removeChild(hoverText);
            }
        }
    });
});

// GCR Image section
Classroom.addEventListener("contextmenu", function (event) {
    event.preventDefault();
    Classroom.style.backgroundColor = "green";

    const gcrHoverText = document.createElement("div");
    gcrHoverText.textContent = "Google Classroom is a virtual class that your teacher had assigned. He/She will be able to keep track of your work assignments assigned on Google Classroom.";
    gcrHoverText.className = "hover-text";
    Classroom.appendChild(gcrHoverText);

    // Remove the hover text when clicking elsewhere
    document.addEventListener("click", function (clickEvent) {
        if (clickEvent.target !== Classroom) {
            Classroom.style.backgroundColor = "transparent";
            const hoverText = document.querySelector(".hover-text");
            if (hoverText) {
                Classroom.removeChild(hoverText);
            }
        }
    });
});

// SGPass Image section
SGPassImage.addEventListener("contextmenu", function (event) {
    event.preventDefault();
    SGPassImage.style.backgroundColor = "red";

    const sgpassHoverText = document.createElement("div");
    sgpassHoverText.textContent = "SingPass is a virtual NRIC All-in-one tool that simplifies users' daily tasks and needs. This is designed by GovTech.";
    sgpassHoverText.className = "hover-text";
    SGPassImage.appendChild(sgpassHoverText);

    // Remove the hover text when clicking elsewhere
    document.addEventListener("click", function (clickEvent) {
        if (clickEvent.target !== SGPassImage) {
            SGPassImage.style.backgroundColor = "transparent";
            const hoverText = document.querySelector(".hover-text");
            if (hoverText) {
                SGPassImage.removeChild(hoverText);
            }
        }
    });
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