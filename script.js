// Lógica dos flashcards. Os dados vêm de data.js (const CARDS).

const card = document.getElementById("card");
const hanziEl = document.getElementById("hanzi");
const pinyinEl = document.getElementById("pinyin");
const traducaoEl = document.getElementById("traducao");
const flipBtn = document.getElementById("flip");
const skipBtn = document.getElementById("skip");
const speakBtn = document.getElementById("speak");
const counterEl = document.getElementById("counter");

let current = null;
let flipped = false;

// --- Áudio: usa a Web Speech API nativa do navegador (sem libs). ---
const ttsSupported = "speechSynthesis" in window;
let zhVoice = null;

// As vozes carregam de forma assíncrona; escolhemos uma voz em chinês.
function pickVoice() {
  const voices = speechSynthesis.getVoices();
  zhVoice =
    voices.find((v) => v.lang === "zh-CN") ||
    voices.find((v) => v.lang && v.lang.toLowerCase().startsWith("zh")) ||
    null;
}
if (ttsSupported) {
  pickVoice();
  speechSynthesis.onvoiceschanged = pickVoice;
} else {
  speakBtn.style.display = "none"; // navegador sem suporte: esconde o botão
}

// Lê o hanzi atual em voz alta (o TTS pronuncia os caracteres com os tons).
function speak() {
  if (!ttsSupported || !current) return;
  speechSynthesis.cancel(); // interrompe qualquer fala em andamento
  const u = new SpeechSynthesisUtterance(current.hanzi);
  u.lang = "zh-CN";
  if (zhVoice) u.voice = zhVoice;
  u.rate = 0.9; // um pouco mais devagar, ajuda no aprendizado
  u.onstart = () => speakBtn.classList.add("speaking");
  u.onend = () => speakBtn.classList.remove("speaking");
  speechSynthesis.speak(u);
}

// Escolhe um card aleatório, sem repetir o atual imediatamente.
function nextCard() {
  let choice;
  if (CARDS.length > 1) {
    do {
      choice = CARDS[Math.floor(Math.random() * CARDS.length)];
    } while (choice === current);
  } else {
    choice = CARDS[0];
  }
  current = choice;
  flipped = false;
  card.classList.remove("revealed");
  hanziEl.textContent = current.hanzi;
  pinyinEl.textContent = "";
  traducaoEl.textContent = "";
  flipBtn.textContent = "Virar";
  flipBtn.disabled = false;
}

// Revela o pinyin e a tradução do card atual.
function flip() {
  if (flipped || !current) return;
  flipped = true;
  pinyinEl.textContent = current.pinyin;
  traducaoEl.textContent = current.translation;
  card.classList.add("revealed");
  flipBtn.textContent = "✓ Virado";
  flipBtn.disabled = true;
  speak(); // toca a pronúncia automaticamente ao revelar
}

flipBtn.addEventListener("click", flip);
skipBtn.addEventListener("click", nextCard);
speakBtn.addEventListener("click", speak);

document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    e.preventDefault();
    flip();
  } else if (e.code === "ArrowRight" || e.code === "Enter") {
    nextCard();
  } else if (e.code === "ArrowDown") {
    e.preventDefault();
    speak();
  }
});

counterEl.textContent = CARDS.length + " palavras no baralho";
nextCard();
