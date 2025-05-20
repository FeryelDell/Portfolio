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
