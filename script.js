// ****************** Contact Form Submission ******************

console.log("Portfolio JavaScript loaded.");

const contactForm = document.querySelector("#contact-form");

if (!contactForm) {
    console.error("ERROR: Contact form not found.");
} else {
    contactForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        console.log("Contact form submitted.");

        if (typeof emailjs === "undefined") {
            console.error("ERROR: EmailJS library did not load.");
            alert("Email service failed to load. Please refresh the page.");
            return;
        }

        const submitButton = contactForm.querySelector('input[type="submit"]');

        submitButton.value = "Sending...";
        submitButton.disabled = true;

        const parms = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            number: document.getElementById("number").value,
            subject: document.getElementById("subject").value,
            message: document.getElementById("message").value
        };

        try {
            const response = await emailjs.send(
                "service_baa1asf",
                "template_1h0s4v9",
                parms,
                {
                    publicKey: "VBN0po0K1EPZhdIUO"
                }
            );

            console.log("EmailJS success:", response.status, response.text);

            alert("Your message has been sent successfully!");

            contactForm.reset();

        } catch (error) {

            console.error("EmailJS sending error:", error);

            alert("Unable to send your message. Please check the Console for the error.");

        } finally {

            submitButton.value = "Send Message";
            submitButton.disabled = false;

        }
    });
}

// ****************** Mobile Navigation ******************

let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};


// ****************** Active Navigation on Scroll ******************

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {

    sections.forEach(sec => {

        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {

            navLinks.forEach(links => {
                links.classList.remove('active');
            });

            let activeLink = document.querySelector(
                'header nav a[href="#' + id + '"]'
            );

            if (activeLink) {
                activeLink.classList.add('active');
            }
        }

    });

    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 100);

    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');

};