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


const pixelCharacter = document.getElementById('pixel-character');
const chatBubble = document.getElementById('chat-bubble');

const idleSrc = 'pixel-character.png';  // idle frame
const talkingSrc = 'pixel-character2.png';  // talking frame

const messages = [
  "Hi again! I'm Feryel's pixel buddy!",
  "Feel free to send me a message!",
  "I like puzzles, give me your best shot!",
  "Did you enjoy my portfolio?",
  "If you get lost, just ask me! I'm totally good at directions...",
  "I have an obsession with pixel art.",
  "I CAN'T STOP CODING.",
  "Did you know I'm allergic to grapes?",
  "What's your favorite color?",
  "If you can't find me in other pages, I'm probably hiding in the code.",
];

let currentMessage = 0;
let talkingTimeout = null;

function showMessage() {
  chatBubble.textContent = messages[currentMessage];
  chatBubble.style.display = 'block';
  
  pixelCharacter.src = talkingSrc;
  
  clearTimeout(talkingTimeout);
  talkingTimeout = setTimeout(() => {
    pixelCharacter.src = idleSrc;
    chatBubble.style.display = 'none';
  }, 2000);

  currentMessage = (currentMessage + 1) % messages.length;
}

pixelCharacter.addEventListener('click', () => {
  if (chatBubble.style.display === 'block') {
    chatBubble.style.display = 'none';
    pixelCharacter.src = idleSrc;
    clearTimeout(talkingTimeout);
  } else {
    showMessage();
  }
});

