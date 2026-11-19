// In-Line Role Flipper
const roles = [
  " Front-End Developer.",
  " QA Tester.",
  " Programmer.",
  " Problem Solver.",
  " Leader."
];
let roleIdx = 0;
const roleElem = document.getElementById("aboutRoleFlipper");

if (roleElem) {
  setInterval(() => {
    roleElem.classList.add("fade-out");
    setTimeout(() => {
      roleIdx = (roleIdx + 1) % roles.length;
      roleElem.textContent = roles[roleIdx];
      roleElem.classList.remove("fade-out");
    }, 300);
  }, 2500);
}

document.addEventListener("DOMContentLoaded", () => {
  // About Me Hero Photo Flipper
  const heroImg = document.getElementById("aboutHeroImg");
  const photoWrapper = document.getElementById("photoWrapper");

  if (heroImg) {
    // List all images from your Gallery folder here
    const photoList = [
      "assets/portfolioImgs/Gallery/about-me-pic1.jpg",
      "assets/portfolioImgs/Gallery/about-me-pic2.jpg",
      "assets/portfolioImgs/Gallery/about-me-pic3.jpg",
      "assets/portfolioImgs/Gallery/about-me-pic4.jpg",
      "assets/portfolioImgs/Gallery/about-me-pic5.jpg",
      "assets/portfolioImgs/Gallery/about-me-pic6.jpg"
    ];

    let currentIndex = 0;
    let autoSlideTimer = null;

    function switchPhoto(nextIndex) {
      heroImg.classList.add("fade-out");

      setTimeout(() => {
        currentIndex = nextIndex % photoList.length;
        heroImg.src = photoList[currentIndex];

        heroImg.onload = () => {
          heroImg.classList.remove("fade-out");
        };
      }, 400);
    }

    function startAutoSlide() {
      stopAutoSlide();
      autoSlideTimer = setInterval(() => {
        switchPhoto(currentIndex + 1);
      }, 7000); // 7-second auto-rotate
    }

    function stopAutoSlide() {
      if (autoSlideTimer) {
        clearInterval(autoSlideTimer);
      }
    }

    // Click/tap to flip immediately and reset the 7s countdown
    if (photoWrapper) {
      photoWrapper.addEventListener("click", () => {
        switchPhoto(currentIndex + 1);
        startAutoSlide();
      });
    }

    startAutoSlide();
  }

  // Interest & Hobbies Photo Flipper
  const hobbyWrappers = document.querySelectorAll(".hobby-img-wrapper");

  hobbyWrappers.forEach((wrapper) => {
    const rawPhotos = wrapper.getAttribute("data-photos");
    if (!rawPhotos) return;

    const photos = rawPhotos.split(",").map((p) => p.trim());
    if (photos.length <= 1) return;

    let currentIndex = 0;
    const imgElement = wrapper.querySelector(".hobby-card-img");

    wrapper.addEventListener("click", () => {
      imgElement.classList.add("fade-out");

      setTimeout(() => {
        currentIndex = (currentIndex + 1) % photos.length;
        imgElement.src = photos[currentIndex];

        imgElement.onload = () => {
          imgElement.classList.remove("fade-out");
        };
      }, 300);
    });
  });

  // Carousel Navigation & Wheel Scrolling
  function initCarousel({ trackId, prevId, nextId, scrollAmount }) {
    const track = document.getElementById(trackId);
    const prevBtn = document.getElementById(prevId);
    const nextBtn = document.getElementById(nextId);

    if (!track || !prevBtn || !nextBtn) return;

    // 1. Arrow Click Navigation
    prevBtn.addEventListener("click", () => {
      track.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });

    nextBtn.addEventListener("click", () => {
      track.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });

    // 2. Vertical Mouse Wheel -> Horizontal Scroll
    track.addEventListener(
      "wheel",
      (e) => {
        if (e.deltaY !== 0) {
          e.preventDefault();
          track.style.scrollBehavior = "auto";
          track.scrollLeft += e.deltaY;
          track.style.scrollBehavior = "smooth";
        }
      },
      { passive: false }
    );

    // 3. Auto-hide arrows at start/end boundaries
    const updateButtons = () => {
      const maxScrollLeft = track.scrollWidth - track.clientWidth;
      prevBtn.disabled = track.scrollLeft <= 5;
      nextBtn.disabled = track.scrollLeft >= maxScrollLeft - 5;
    };

    track.addEventListener("scroll", updateButtons);
    window.addEventListener("resize", updateButtons);
    updateButtons();
  }

  // Fun Facts carousel
  initCarousel({
    trackId: "funFactsTrack",
    prevId: "funFactsPrev",
    nextId: "funFactsNext",
    scrollAmount: 512
  });

  // Interest & Hobbies carousel
  initCarousel({
    trackId: "hobbiesTrack",
    prevId: "hobbiesPrev",
    nextId: "hobbiesNext",
    scrollAmount: 688
  });

  // Certifications & Achievements carousel
  initCarousel({
    trackId: "certsTrack",
    prevId: "certsPrev",
    nextId: "certsNext",
    scrollAmount: 334
  });
});