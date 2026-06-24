// Flashcard logic. Data (decks) comes from data.js (const DECKS).

// --- Screen elements ---
const homeScreen = document.getElementById("home");
const studyScreen = document.getElementById("study");
const decksEl = document.getElementById("decks");
const backBtn = document.getElementById("back");
const deckLabelEl = document.getElementById("deckLabel");

// --- Card elements ---
const card = document.getElementById("card");
const hanziEl = document.getElementById("hanzi");
const emojiEl = document.getElementById("emoji");
const pinyinEl = document.getElementById("pinyin");
const translationEl = document.getElementById("translation");
const flipBtn = document.getElementById("flip");
const skipBtn = document.getElementById("skip");
const prevBtn = document.getElementById("prev");
const speakBtn = document.getElementById("speak");
const audioToggle = document.getElementById("audioToggle");
const counterEl = document.getElementById("counter");

const HISTORY_LIMIT = 40;   // how many previous cards we keep

let cards = [];        // deck currently being studied
let current = null;
let flipped = false;
let audioMode = false; // hear first, reveal everything on flip
let history = [];      // cards already seen, in order (up to HISTORY_LIMIT)
let index = -1;        // current position within history

// --- Audio: uses the browser's native Web Speech API (no libs). ---
const ttsSupported = "speechSynthesis" in window;
let zhVoice = null;

// Voices load asynchronously; pick a Chinese voice.
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
  speakBtn.style.display = "none"; // unsupported browser: hide the button
}

// Reads the current hanzi out loud (TTS pronounces the characters with tones).
function speak() {
  if (!ttsSupported || !current) return;
  speechSynthesis.cancel(); // stop any ongoing speech
  const u = new SpeechSynthesisUtterance(current.hanzi);
  u.lang = "zh-CN";
  if (zhVoice) u.voice = zhVoice;
  u.rate = 0.9; // a bit slower, helps learning
  u.onstart = () => speakBtn.classList.add("speaking");
  u.onend = () => speakBtn.classList.remove("speaking");
  speechSynthesis.speak(u);
}

// --- Home screen: build the deck blocks from DECKS ---
function renderHome() {
  decksEl.innerHTML = "";
  DECKS.forEach((deck) => {
    const btn = document.createElement("button");
    btn.className = "deck";
    btn.innerHTML =
      `<span class="deck-zh">${deck.nameZh}</span>` +
      `<span class="deck-name">${deck.name}</span>` +
      `<span class="deck-desc">${deck.desc}</span>` +
      `<span class="deck-count">${deck.cards.length} cards</span>`;
    btn.addEventListener("click", () => startDeck(deck));
    decksEl.appendChild(btn);
  });
}

// --- Screen navigation ---
function startDeck(deck) {
  cards = deck.cards;
  current = null;
  history = [];
  index = -1;
  deckLabelEl.textContent = `${deck.nameZh} · ${deck.name}`;
  counterEl.textContent = cards.length + " cards no bloco";
  homeScreen.classList.add("hidden");
  studyScreen.classList.remove("hidden");
  nextCard();
}

function goHome() {
  if (ttsSupported) speechSynthesis.cancel();
  studyScreen.classList.add("hidden");
  homeScreen.classList.remove("hidden");
}

// Scales the hanzi by length: a single word is large, a sentence gets
// smaller and wraps across several lines.
function sizeHanzi(text) {
  const n = text.length;
  let size, lh;
  if (n <= 3) { size = "5.6rem"; lh = "1.05"; }
  else if (n <= 6) { size = "3.1rem"; lh = "1.3"; }
  else if (n <= 9) { size = "2.5rem"; lh = "1.4"; }
  else { size = "2.05rem"; lh = "1.5"; }
  hanziEl.style.fontSize = size;
  hanziEl.style.lineHeight = lh;
}

// Shows a card (always face down, ready to be flipped).
function showCard(c) {
  current = c;
  flipped = false;
  card.classList.remove("revealed");
  pinyinEl.textContent = "";
  translationEl.textContent = "";
  // Emoji is set now but stays hidden (via CSS) until the card is revealed.
  emojiEl.textContent = c.emoji || "";
  flipBtn.textContent = "Virar";
  flipBtn.disabled = false;
  if (audioMode) {
    // Audio mode: nothing visible, only the sound plays up front.
    hanziEl.textContent = "🔊";
    sizeHanzi("🔊");
    speak();
  } else {
    hanziEl.textContent = c.hanzi;
    sizeHanzi(c.hanzi);
  }
}

// Enables/disables the "Previous" button based on the history position.
function updatePrevState() {
  prevBtn.disabled = index <= 0;
}

// Picks a random card, without repeating the current one right away.
function pickRandomCard() {
  if (cards.length <= 1) return cards[0];
  let choice;
  do {
    choice = cards[Math.floor(Math.random() * cards.length)];
  } while (choice === current);
  return choice;
}

// Goes forward: if there are cards ahead in history, walk through them;
// only at the tip do we draw a brand-new card.
function nextCard() {
  if (index < history.length - 1) {
    index++;
  } else {
    const choice = pickRandomCard();
    history.push(choice);
    if (history.length > HISTORY_LIMIT) history.shift();
    index = history.length - 1;
  }
  showCard(history[index]);
  updatePrevState();
}

// Goes back one card in history.
function prevCard() {
  if (index <= 0) return;
  index--;
  showCard(history[index]);
  updatePrevState();
}

// Reveals the card. In normal mode it shows pinyin + translation (the hanzi
// was already visible). In Audio mode it also reveals the hidden hanzi.
function flip() {
  if (flipped || !current) return;
  flipped = true;
  if (audioMode) {
    hanziEl.textContent = current.hanzi;
    sizeHanzi(current.hanzi);
  }
  pinyinEl.textContent = current.pinyin;
  translationEl.textContent = current.translation;
  card.classList.add("revealed");
  flipBtn.textContent = "✓ Virado";
  flipBtn.disabled = true;
  if (!audioMode) speak(); // in audio mode the sound already played on show
}

// --- Events ---
flipBtn.addEventListener("click", flip);
skipBtn.addEventListener("click", nextCard);
prevBtn.addEventListener("click", prevCard);
speakBtn.addEventListener("click", speak);
backBtn.addEventListener("click", goHome);

// Audio mode: when toggled, re-show the current card in the new mode.
audioToggle.addEventListener("change", () => {
  audioMode = audioToggle.checked;
  if (current) showCard(current);
});
if (!ttsSupported) {
  audioToggle.disabled = true; // without speech synthesis, audio mode is pointless
}

document.addEventListener("keydown", (e) => {
  // Shortcuts only apply on the study screen.
  if (studyScreen.classList.contains("hidden")) return;
  if (e.code === "Space") {
    e.preventDefault();
    flip();
  } else if (e.code === "ArrowRight" || e.code === "Enter") {
    nextCard();
  } else if (e.code === "ArrowLeft") {
    prevCard();
  } else if (e.code === "ArrowDown") {
    e.preventDefault();
    speak();
  } else if (e.code === "Escape") {
    goHome();
  }
});

renderHome();
