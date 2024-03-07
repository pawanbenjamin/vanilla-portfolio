// Email JS
(function () {
  emailjs.init({
    publicKey: "VWr3-lbSwERsZJAzw",
    blockHeadless: true,
    limitRate: {
      // Set the limit rate for the application
      id: "app",
      // Allow 1 request per 10s
      throttle: 10000
    }
  });
})();

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const email = formData.get("email");
  const message = formData.get("message");
  console.log({ email, message });

  const serv_id = "service_az9hbqb";
  const temp_id = "template_cet3iyy";

  emailjs
    .send(serv_id, temp_id, {
      from_name: email,
      message
    })
    .then(
      (response) => {
        e.target.reset();
        console.log("SUCCESS!", response.status, response.text);
      },
      (error) => {
        console.log("FAILED...", error);
      }
    );
});

// Slider
const slider = document.querySelector(".projects-slider");

const prevButton = document.querySelector(".prev-btn");
const nextButton = document.querySelector(".next-btn");

let slideIndex = 0;

function showSlide(index) {
  const slideWidth = window.innerWidth;

  slider.style.transform = `translateX(-${slideWidth * index}px)`;

  prevButton.style.opacity = "1";
  nextButton.style.opacity = "1";

  if (index === 0) {
    prevButton.style.opacity = "0";
    nextButton.style.opactiy = "1";
  }
  if (index === slider.children.length - 1) {
    nextButton.style.opacity = "0";
    prevButton.style.opacity = "1";
  }
}

prevButton.addEventListener("click", () => {
  slideIndex = Math.max(slideIndex - 1, 0);
  showSlide(slideIndex);
});

nextButton.addEventListener("click", () => {
  const slides = document.querySelectorAll(".project-card");
  slideIndex = Math.min(slideIndex + 1, slides.length - 1);
  showSlide(slideIndex);
});
// Show the first slide initially
showSlide(slideIndex);

// window.addEventListener("scroll", function () {
//   const button = document.querySelector(".floating-nav button");
//   const buttonPosition = button.getBoundingClientRect().top;
//   const windowHeight = window.innerHeight;

//   // Check if the button is in the viewport
//   if (buttonPosition < windowHeight) {
//     // If it is, fade it in by setting opacity to 1
//     button.style.opacity = "1";
//   } else {
//     // If it's not, keep it hidden
//     button.style.opacity = "0";
//   }
// });
