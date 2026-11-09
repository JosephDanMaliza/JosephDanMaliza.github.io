const projectData = [
  {
    title: "LANDAS: 2D Gamified Mobile Application",
    desc: "A 2D gamified Philippine history educational mobile game built to deliver immersive cultural learning. Commended for strict compliance with ISO/IEC 25010 software quality benchmarks and recognized with the Best in Capstone Project award.",
    image: "assets/portfolioImgs/landas/landas-logo.webp",
    tags: ["Unity 2D", "C# Scripting", "Game Design", "ISO/IEC 25010"],
    webUrl: "https://landas2d.github.io/",
    gallery: [
      "assets/portfolioImgs/landas/landas-backyard.webp",
      "assets/portfolioImgs/landas/landas-chaps.webp",
      "assets/portfolioImgs/landas/landas-cookbook.webp",
      "assets/portfolioImgs/landas/landas-cooking.webp",
      "assets/portfolioImgs/landas/landas-cookmenu.webp",
      "assets/portfolioImgs/landas/landas-dictionary.webp",
      "assets/portfolioImgs/landas/landas-home.webp",
      "assets/portfolioImgs/landas/landas-logo.webp",
      "assets/portfolioImgs/landas/landas-lola.webp",
      "assets/portfolioImgs/landas/landas-main.webp",
      "assets/portfolioImgs/landas/landas-palosebo.webp",
      "assets/portfolioImgs/landas/landas-quiz.webp",
      "assets/portfolioImgs/landas/landas-quiz2.webp",
      "assets/portfolioImgs/landas/landas-sipa.webp",
      "assets/portfolioImgs/landas/landas-story.webp",
    ]
  },
  {
    title: "The CentRE Resource Hub & Platforms",
    desc: "Web design, front-end architecture, and test execution for renewable energy knowledge hubs and platform initiatives at The Center for Empowerment, iNnovation, and Training on Renewable Energy.",
    image:"assets/portfolioImgs/centre/resource-hub.png",
    tags: ["UI/UX Design", "Tailwind CSS", "JavaScript", "QA Testing"],
    webUrl: "https://thecentre.ph/resource-hub",
    gallery: [
      "assets/portfolioImgs/centre/resource-hub.png",
      "assets/portfolioImgs/centre/browse-resources.png",
      "assets/portfolioImgs/centre/events.png",
      "assets/portfolioImgs/centre/participation-map.png",
      "assets/portfolioImgs/centre/project-volta.png",
      "assets/portfolioImgs/centre/about-volta.png",

    ]
  },
  {
    title: "NowUKnow Platform",
    desc: "An informative content sharing and community discovery portal developed with an emphasis on lightweight queries, responsive grid layouts, and clean user experience.",
    image: "assets/portfolioImgs/nuk/nuk-group.jpg",
    tags: ["PHP", "JavaScript", "MySQL", "CRUD"],
    gallery: [
      "assets/portfolioImgs/nuk/nuk-group.jpg",
      "assets/portfolioImgs/nuk/nuk-main.png",
      "assets/portfolioImgs/nuk/nuk-post.png",
      "assets/portfolioImgs/nuk/nuk-dash.jpg",

    ]
  },
  {
    title: "Celestia Events Directory",
    desc: "Event discovery and registration platform built to consolidate campus and regional events with filtering, categorization, and organizer admin tools.",
    image: "assets/portfolioImgs/celestia-events/celestia-event1.jpg",
    tags: ["PHP", "CSS3", "JavaScript", "Database Design"],
    gallery: [
      "assets/portfolioImgs/celestia-events/celestia-event1.jpg",
      "assets/portfolioImgs/celestia-events/celestia-event2.png",
      "assets/portfolioImgs/celestia-events/celestia-event3.png",

    ]
  },
  {
    title: "KuroNeko: Journey in Another World",
    desc: "A retro-inspired 2D desktop game developed with custom collision boxes, sprite state rendering, and Object-Oriented design patterns.",
    image: "assets/portfolioImgs/kuroneko/neko-main.webp",
    tags: ["Java Swing", "OOP", "Game Logic", "2D Sprites"],
    gallery: [
      "assets/portfolioImgs/kuroneko/neko-main.webp",
      "assets/portfolioImgs/kuroneko/neko-menu.webp",
      "assets/portfolioImgs/kuroneko/neko-sweep.webp",
      "assets/portfolioImgs/kuroneko/neko-tiles.webp",
      "assets/portfolioImgs/kuroneko/neko-food.webp",
      "assets/portfolioImgs/kuroneko/neko-dark.webp",
      "assets/portfolioImgs/kuroneko/neko-end.webp",

    ]
  }
];

let currentProjectIndex = 0;

const tabButtons = document.querySelectorAll('.project-tab-card');
const showcaseImg = document.getElementById('showcaseImage');
const showcaseTitle = document.getElementById('showcaseTitle');
const showcaseDesc = document.getElementById('showcaseDesc');
const techContainer = document.getElementById('techPillContainer');
const btnWebsite = document.getElementById('btnWebsite');
const btnDetails = document.getElementById('btnDetails');

// Modal Elements
const modalProjectTitle = document.getElementById('modalProjectTitle');
const modalTechPills = document.getElementById('modalTechPills');
const modalMainImg = document.getElementById('modalMainImg');
const modalGalleryThumbnails = document.getElementById('modalGalleryThumbnails');
const modalProjectDesc = document.getElementById('modalProjectDesc');
const modalWebsiteBtn = document.getElementById('modalWebsiteBtn');

function updateShowcase(index) {
  const data = projectData[index];
  if (!data) return;

  currentProjectIndex = index;

  if (showcaseImg) {
    showcaseImg.src = data.image;
    showcaseImg.onerror = () => {
      showcaseImg.src = 'https://placehold.co/1200x675/113355/ffffff?text=Project+Preview+Screen';
    };
  }

  if (showcaseTitle) showcaseTitle.textContent = data.title;
  if (showcaseDesc) showcaseDesc.textContent = data.desc;

  // Toggle View Website button on the main showcase
  if (btnWebsite) {
    if (data.webUrl) {
      btnWebsite.href = data.webUrl;
      btnWebsite.classList.remove('d-none');
      btnWebsite.classList.add('d-inline-flex');
    } else {
      btnWebsite.href = "#";
      btnWebsite.classList.remove('d-inline-flex');
      btnWebsite.classList.add('d-none');
    }
  }

  if (techContainer) {
    techContainer.innerHTML = '';
    data.tags.forEach(tag => {
      const pill = document.createElement('span');
      pill.className = 'neon-tech-pill';
      pill.textContent = tag;
      techContainer.appendChild(pill);
    });
  }
}

// Function to populate the Bootstrap Modal when "More Details" is clicked
function populateModal(index) {
  const data = projectData[index];
  if (!data) return;

  if (modalProjectTitle) modalProjectTitle.textContent = data.title;
  if (modalProjectDesc) modalProjectDesc.textContent = data.desc;

  // Modal Tags
  if (modalTechPills) {
    modalTechPills.innerHTML = '';
    data.tags.forEach(tag => {
      const pill = document.createElement('span');
      pill.className = 'neon-tech-pill';
      pill.textContent = tag;
      modalTechPills.appendChild(pill);
    });
  }

  // Modal Website Button
  if (modalWebsiteBtn) {
    if (data.webUrl) {
      modalWebsiteBtn.href = data.webUrl;
      modalWebsiteBtn.classList.remove('d-none');
      modalWebsiteBtn.classList.add('d-inline-flex');
    } else {
      modalWebsiteBtn.classList.remove('d-inline-flex');
      modalWebsiteBtn.classList.add('d-none');
    }
  }

  // Setup Gallery Images
  const galleryImages = (data.gallery && data.gallery.length > 0) ? data.gallery : [data.image];
  
  if (modalMainImg) {
    modalMainImg.src = galleryImages[0];
    modalMainImg.onerror = () => {
      modalMainImg.src = 'https://placehold.co/1200x675/113355/ffffff?text=Gallery+Preview';
    };
  }

  if (modalGalleryThumbnails) {
    modalGalleryThumbnails.innerHTML = '';
    galleryImages.forEach((imgSrc, i) => {
      const thumb = document.createElement('img');
      thumb.src = imgSrc;
      thumb.alt = `Screenshot ${i + 1}`;
      thumb.className = `gallery-thumb ${i === 0 ? 'active' : ''}`;
      thumb.onerror = () => {
        thumb.src = 'https://placehold.co/180x100/184775/ffffff?text=Thumb';
      };

      thumb.addEventListener('click', () => {
        document.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        if (modalMainImg) modalMainImg.src = imgSrc;
      });

      modalGalleryThumbnails.appendChild(thumb);
    });
  }
}

// Attach Tab Switcher Events
if (tabButtons.length && showcaseImg) {
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const index = parseInt(button.getAttribute('data-index'), 10);

      showcaseImg.classList.add('img-fade');
      setTimeout(() => {
        updateShowcase(index);
        showcaseImg.classList.remove('img-fade');
      }, 180);
    });
  });

  if (btnDetails) {
    btnDetails.addEventListener('click', () => {
      populateModal(currentProjectIndex);
    });
  }

  // Initial load
  updateShowcase(0);
}

