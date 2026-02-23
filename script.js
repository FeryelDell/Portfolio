// ----- Particle Background Stars -----
const bgCanvas = document.getElementById('particle-canvas');
const bgCtx = bgCanvas.getContext('2d');
bgCanvas.width = window.innerWidth;
bgCanvas.height = window.innerHeight;

const bgStars = [];

function createBackgroundStars(count) {
  for (let i = 0; i < count; i++) {
    bgStars.push({
      x: Math.random() * bgCanvas.width,
      y: Math.random() * bgCanvas.height,
      size: Math.random() * 1.5 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
    });
  }
}

function drawFourPointStar(ctx, cx, cy, size, color) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.beginPath();
  ctx.moveTo(0, -size);
  ctx.lineTo(0, -size / 3);
  ctx.lineTo(-size, 0);
  ctx.lineTo(-size / 3, 0);
  ctx.lineTo(0, size);
  ctx.lineTo(0, size / 3);
  ctx.lineTo(size, 0);
  ctx.lineTo(size / 3, 0);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
  ctx.restore();
}

function animateBackgroundStars() {
  bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
  bgStars.forEach(star => {
    drawFourPointStar(bgCtx, star.x, star.y, star.size, 'rgba(200, 160, 255, 0.8)');
    star.x += star.speedX;
    star.y += star.speedY;
    if (star.x < 0) star.x = bgCanvas.width;
    if (star.x > bgCanvas.width) star.x = 0;
    if (star.y < 0) star.y = bgCanvas.height;
    if (star.y > bgCanvas.height) star.y = 0;
  });
  requestAnimationFrame(animateBackgroundStars);
}

createBackgroundStars(100);
animateBackgroundStars();


// ----- Music Player Logic -----
const audio = document.getElementById('audio-player');
const btn = document.getElementById('play-pause-btn');
btn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    btn.textContent = '⏸ Pause';
  } else {
    audio.pause();
    btn.textContent = '🎵 Play';
  }
});


// ----- Pixel Chatbox Logic -----
const pixelCharacter = document.getElementById('pixel-character');
const chatBubble = document.getElementById('chat-bubble');

const idleSrc = 'pixel-character.png';  // idle frame
const talkingSrc = 'pixel-character2.png';  // talking frame

const messages = [
  "Hello! I'm Feryel's pixel buddy!",
  "Ask me about the projects!",
  "I love coding and pixel art!",
  "Thanks for checking my Portfolio!",
  "Hope you enjoy the site! 😊",
  "I love cats!",
  "Did you know I can dance?",
  "My favourite color is Blue!",
];

let currentMessage = 0;
let talkingTimeout = null;

function showMessage() {
  chatBubble.textContent = messages[currentMessage];
  chatBubble.style.display = 'block';
  
  // Switch to talking frame
  pixelCharacter.src = talkingSrc;
  
  // After 2 seconds, revert to idle frame and hide chat bubble
  clearTimeout(talkingTimeout);
  talkingTimeout = setTimeout(() => {
    pixelCharacter.src = idleSrc;
    chatBubble.style.display = 'none';
  }, 2000);

  currentMessage = (currentMessage + 1) % messages.length;
}

pixelCharacter.addEventListener('click', () => {
  if (chatBubble.style.display === 'block') {
    // If already showing message, hide it and reset to idle
    chatBubble.style.display = 'none';
    pixelCharacter.src = idleSrc;
    clearTimeout(talkingTimeout);
  } else {
    showMessage();
  }
});

/*map*/




// Optional: Display a tooltip on map area hover
const areas = document.querySelectorAll("area");

areas.forEach(area => {
  area.addEventListener("mouseenter", () => {
    const tooltip = document.createElement("div");
    tooltip.id = "map-tooltip";
    tooltip.textContent = area.alt;
    document.body.appendChild(tooltip);
    document.addEventListener("mousemove", moveTooltip);
  });

  area.addEventListener("mouseleave", () => {
    const tooltip = document.getElementById("map-tooltip");
    if (tooltip) {
      tooltip.remove();
    }
    document.removeEventListener("mousemove", moveTooltip);
  });
});

function moveTooltip(e) {
  const tooltip = document.getElementById("map-tooltip");
  if (tooltip) {
    tooltip.style.left = `${e.pageX + 10}px`;
    tooltip.style.top = `${e.pageY + 10}px`;
  }
}


// ----- Image Modal Logic -----
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById("imageModal");
  if (!modal) return;

  const modalImg = document.getElementById("modalImage");
  const captionText = document.getElementById("caption");
  const images = document.querySelectorAll('.modal-trigger');
  const span = document.querySelector(".close-modal");

  images.forEach(img => {
    img.onclick = function(){
      modal.style.display = "block";
      modalImg.src = this.src;
      captionText.innerHTML = this.alt;
    }
  });

  if (span) {
    span.onclick = function() {
      modal.style.display = "none";
    }
  }

  // Close modal when clicking on the background
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
});
// ----- Final Combined Image Modal Logic -----
let currentImgIndex = 0;

function openModal(imgSrc) {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("fullImage");
  const captionText = document.getElementById("caption");
  
  // Find all images to get the correct caption for the first open
  const allImages = Array.from(document.querySelectorAll('.modal-trigger'));
  const clickedImg = allImages.find(img => img.src === imgSrc);

  if (modal && modalImg) {
    modal.style.display = "flex"; 
    modalImg.src = imgSrc;
    
    // Set caption immediately so first image isn't empty
    if (captionText && clickedImg) {
      captionText.innerHTML = clickedImg.alt || "";
    }
  }
}

// THIS IS THE FIX FOR THE X BUTTON
function closeModal() {
  const modal = document.getElementById("imageModal");
  if (modal) {
    modal.style.display = "none";
  }
}

function changeImage(step) {
  const allImages = Array.from(document.querySelectorAll('.modal-trigger'));
  const modalImg = document.getElementById("fullImage");
  const captionText = document.getElementById("caption");

  if (!modalImg) return;

  let currentIndex = allImages.findIndex(img => img.src === modalImg.src);
  currentIndex += step;

  if (currentIndex >= allImages.length) currentIndex = 0;
  if (currentIndex < 0) currentIndex = allImages.length - 1;

  modalImg.src = allImages[currentIndex].src;
  
  if (captionText) {
    captionText.innerHTML = allImages[currentIndex].alt || "";
  }
}

// Close modal when clicking the dark background
window.addEventListener('click', function(event) {
  const modal = document.getElementById("imageModal");
  if (event.target === modal) {
    closeModal();
  }
});

// Add pointer cursor to all triggers automatically
document.querySelectorAll('.modal-trigger').forEach(image => {
  image.style.cursor = "pointer";
});