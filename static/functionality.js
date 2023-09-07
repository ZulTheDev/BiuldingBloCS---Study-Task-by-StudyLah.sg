// Constants
const SGPassImage = document.getElementById("SGPass");
const Classroom = document.getElementById("GCR");
const CSA = document.getElementById("CSA");
const SLSImage = document.getElementById("SLS");
const ProfileImage = document.getElementById("profile");
const ProfileImageUpload = document.getElementById("profile-image-upload");
const GreetUserElement = document.querySelector(".GreetUser");

// HANDLING EVENT
function openPreviewAndDisplayDescription(event, link, description) {
    if (event.button === 0) {
        // Left-click behavior (Open a preview and display description)
        event.preventDefault();
        
        // You can customize how you want to display the description, for example, in an alert
        alert(description);

        // Open the link in a new tab
        window.open(link, "_blank");
    }
}

function openLinkOnRightClick(event, link) {
    if (event.button === 2) {
        // Right-click behavior (Open the link)
        event.preventDefault();
        window.open(link, "_blank");
    }
}

function addHoverShadow(element) {
    element.addEventListener("mouseenter", () => {
        element.style.boxShadow = "0 0 10px rgba(138, 43, 226, 0.5)";
        element.style.transition = "box-shadow 0.3s ease";
    });

    element.addEventListener("mouseleave", () => {
        element.style.boxShadow = "none";
    });
}

// DESCRIPTION
const CsaDescription = "CSA is a Singapore Cybersecurity Agency. Their job is to keep Singapore and our cyberspace safe.";
const ClassroomDescription = "Google Classroom is a virtual class that your teacher had assigned. He/She will be able to keep track of your work assignments assigned on Google Classroom.";
const SgpassDescription = "SingPass is a virtual NRIC All-in-one tool that simplifies users' daily tasks and needs. This is designed by GovTech.";
const SlsDescription = "SLS is the Singapore Learning Space, where students can access online learning resources and assignments.";

// LINKS
CSA.setAttribute("data-link", "https://www.csa.gov.sg/");
Classroom.setAttribute("data-link", "https://classroom.google.com/");
SGPassImage.setAttribute("data-link", "https://www.singpass.gov.sg/main/");
SLSImage.setAttribute("data-link", "https://vle.learning.moe.edu.sg/login");

// Left click and Right click
// CSA
CSA.addEventListener("click", (event) => openPreviewAndDisplayDescription(event, CSA.getAttribute("data-link"), CsaDescription));
CSA.addEventListener("contextmenu", (event) => openLinkOnRightClick(event, CSA.getAttribute("data-link")));
addHoverShadow(CSA);

// GOOGLE CLASSROOM
Classroom.addEventListener("click", (event) => openPreviewAndDisplayDescription(event, Classroom.getAttribute("data-link"), ClassroomDescription));
Classroom.addEventListener("contextmenu", (event) => openLinkOnRightClick(event, Classroom.getAttribute("data-link")));
addHoverShadow(Classroom);

// SINGPASS
SGPassImage.addEventListener("click", (event) => openPreviewAndDisplayDescription(event, SGPassImage.getAttribute("data-link"), SgpassDescription));
SGPassImage.addEventListener("contextmenu", (event) => openLinkOnRightClick(event, SGPassImage.getAttribute("data-link")));
addHoverShadow(SGPassImage);

// STUDENT LEARNING SPACE
SLSImage.addEventListener("click", (event) => openPreviewAndDisplayDescription(event, SLSImage.getAttribute("data-link"), SlsDescription));
SLSImage.addEventListener("contextmenu", (event) => openLinkOnRightClick(event, SLSImage.getAttribute("data-link")));
addHoverShadow(SLSImage);


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
