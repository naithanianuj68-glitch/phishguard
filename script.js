// 1. THE MISSION SCENARIOS (Expanded for Day 3)
const scenarios = [
    { country: "Global", sender: "Netflix Support", message: "Payment failed. Update your card at netfllx-update.com immediately.", isScam: true, tip: "Check for typos in the URL.", explanation: "Scam! 'Netfllx' is spelled with two 'L's. Official sites never misspell their own name." },
    { country: "India", sender: "SBI Bank (SMS)", message: "Your KYC is expired. Click to update via UPI PIN: bit.ly/bank-secure", isScam: true, tip: "Banks never ask for your UPI PIN.", explanation: "Scam! A UPI PIN is only for sending money, never for receiving or updating info." },
    { country: "Global", sender: "WhatsApp Message", message: "Hi Mum, it's me. I lost my phone, can you wire £200 for a bill?", isScam: true, tip: "Call the person on their known number.", explanation: "Scam! This is the 'Hi Mum' trick. Scammers pretend to be family in distress." },
    { country: "Global", sender: "AI Voice Call", message: "[Audio] 'Grandpa, it's me! I'm at the police station and need bail money right now! Please don't tell Mom.'", isScam: true, tip: "Set up a family 'secret word' for emergencies.", explanation: "Scam! AI can now clone voices. Always hang up and call the child's parents directly." },
    { country: "Global", sender: "Deepfake Video", message: "[Video Call] Your 'Boss' appears on screen asking you to buy urgent gift cards for a client meeting.", isScam: true, tip: "Look for glitching around the mouth or eyes.", explanation: "Scam! Video can be faked. No professional boss will ask for payment via gift cards." },
    { country: "Global", sender: "Microsoft Support", message: "VIRUS FOUND! Call +1-800-SAFE-01 now to protect your files.", isScam: true, tip: "Real tech support won't use pop-up phone numbers.", explanation: "Scam! Your computer will never ask you to call a random number for safety." },
    { country: "Global", sender: "Lotto Winner", message: "You won $1 Million! Pay $200 delivery fee to get your check.", isScam: true, tip: "You never pay to receive a prize.", explanation: "Scam! If you have to pay to get a 'prize,' the prize doesn't exist." },
    { country: "USA", sender: "IRS Official", message: "Tax refund available. Provide SSN and Bank Info here to claim.", isScam: true, tip: "The IRS communicates via physical mail first.", explanation: "Scam! The IRS will never email or text you asking for your Social Security Number." },
    { country: "India", sender: "Delivery Agent (Call)", message: "I have a parcel for you but I need a 1-time OTP to confirm your address.", isScam: true, tip: "Never share an OTP for a delivery.", explanation: "Scam! Delivery agents do not need an OTP to find your house." },
    { country: "Global", sender: "Amazon Security", message: "Your account was accessed from a new device. If this wasn't you, login here: amzn-security-check.net", isScam: true, tip: "Log in through the official app only.", explanation: "Scam! Fake links like 'amzn-security' are designed to steal your password." },
    { country: "Global", sender: "Family Member", message: "Check out the photos from our hike yesterday! [Attachment: Hike.jpg]", isScam: false, tip: "Expect photos from people you know.", explanation: "Safe! This is a typical personal message from a known contact." },
    { country: "Global", sender: "Electricity Dept", message: "Your bill for March is now available. Log in to your secure portal at citypower.gov to view it.", isScam: false, tip: "Check for the .gov or .edu domain.", explanation: "Safe! It uses an official government domain and leads to a secure portal." },
    { country: "India", sender: "Zomato", message: "Hungry? Use code TASTY50 for 50% off on your next order!", isScam: false, tip: "Verified apps often send promo codes.", explanation: "Safe! Standard marketing from a verified service you use." },
    { country: "Global", sender: "Bank Notification", message: "A purchase of $42.00 was made at 'The Coffee Shop'. View your balance in our app.", isScam: false, tip: "Standard alerts don't ask for info.", explanation: "Safe! This is a standard transactional alert with no suspicious links." },
    { country: "Global", sender: "Friend", message: "Hey! Are we still on for lunch at 1 PM today?", isScam: false, tip: "Context matters in messages.", explanation: "Safe! A normal social check-in regarding a planned event." }
];

// 2. GAME VARIABLES
let currentIndex = 0; 
let score = 0; 
let lives = 3;

// 3. UI ELEMENTS
const introScreen = document.getElementById('intro-screen');
const scenarioBox = document.getElementById('scenario-box');
const gameControls = document.getElementById('game-controls');
const senderEl = document.getElementById('sender-name');
const messageEl = document.getElementById('message-content');
const scoreEl = document.getElementById('score');
const livesEl = document.getElementById('lives-display');
const progressBar = document.getElementById('progress-bar');
const feedbackPanel = document.getElementById('feedback-panel');
const gameContainer = document.getElementById('game-container');
const leaderboardPanel = document.getElementById('leaderboard-panel');
const levelBadge = document.getElementById('level-badge');

// 4. UTILITY FUNCTIONS
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function updateLevelBadge() {
    if (score >= 8) {
        levelBadge.innerText = "Level: Expert";
        levelBadge.style.background = "#fed7e2"; // Light pink
        levelBadge.style.color = "#97266d"; // Deep purple
    } else if (score >= 4) {
        levelBadge.innerText = "Level: Intermediate";
        levelBadge.style.background = "#feebc8"; // Light orange
        levelBadge.style.color = "#9c4221"; // Deep orange
    }
}

// 5. CORE GAME LOGIC
function loadScenario() {
    if (currentIndex >= scenarios.length || lives <= 0) {
        endGame();
        return;
    }
    
    // Update Progress
    progressBar.style.width = (currentIndex / scenarios.length) * 100 + "%";
    
    const current = scenarios[currentIndex];
    senderEl.innerText = `[${current.country}] From: ${current.sender}`;
    messageEl.innerText = current.message;
    
    feedbackPanel.classList.add('hidden');
    gameControls.classList.remove('hidden');
}

function handleGuess(userGuessScam) {
    const current = scenarios[currentIndex];
    const isActuallyScam = current.isScam;

    if (userGuessScam === isActuallyScam) {
        score++;
        scoreEl.innerText = score;
        updateLevelBadge();
        document.getElementById('feedback-heading').innerText = "✅ Analysis: SECURE";
        // Success Glow Animation
        gameContainer.style.boxShadow = "0 0 30px rgba(56, 161, 105, 0.5)";
        setTimeout(() => gameContainer.style.boxShadow = "0 20px 50px rgba(0,0,0,0.1)", 600);
    } else {
        lives--;
        livesEl.innerText = "❤️".repeat(Math.max(0, lives)) || "💀";
        // Shake Animation for Error
        gameContainer.classList.add('shake');
        setTimeout(() => gameContainer.classList.remove('shake'), 400);
        document.getElementById('feedback-heading').innerText = "🚨 Analysis: DANGER";
    }

    document.getElementById('feedback-text').innerHTML = `
    <strong>💡 Pro-Tip:</strong> ${current.tip}<br><br>
    ${current.explanation}
`;
    gameControls.classList.add('hidden');
    feedbackPanel.classList.remove('hidden');
}

function endGame() {
    progressBar.style.width = "100%";
    scenarioBox.classList.add('hidden');
    gameControls.classList.add('hidden');
    feedbackPanel.classList.add('hidden');
    leaderboardPanel.classList.remove('hidden');

    const title = lives <= 0 ? "Mission Failed! 💀" : "Mission Complete! 🏁";
    document.getElementById('end-title').innerText = title;
    document.getElementById('end-message').innerText = `You protected the community with a score of ${score}/${scenarios.length}.`;
    
    // SAVE TO LOCAL DATABASE (Leaderboard)
    let scores = JSON.parse(localStorage.getItem('gScores')) || [];
    scores.push({s: score, t: new Date().toLocaleTimeString()});
    scores.sort((a,b) => b.s - a.s);
    scores = scores.slice(0, 5);
    localStorage.setItem('gScores', JSON.stringify(scores));
    
    document.getElementById('leaderboard-list').innerHTML = scores.map(x => `<li><span>${x.s} Pts</span> <span>${x.t}</span></li>`).join('');
}

// 6. EVENT LISTENERS
document.getElementById('btn-start').onclick = () => {
    introScreen.classList.add('hidden');
    scenarioBox.classList.remove('hidden');
    gameControls.classList.remove('hidden');
    loadScenario();
};

document.getElementById('btn-safe').onclick = () => handleGuess(false);
document.getElementById('btn-scam').onclick = () => handleGuess(true);
document.getElementById('btn-next').onclick = () => {
    currentIndex++;
    loadScenario();
};

document.getElementById('btn-restart').onclick = () => location.reload();

document.getElementById('btn-share').onclick = () => {
    const shareText = `I just scored ${score}/${scenarios.length} on PhishGuard! 🛡️ Help protect our seniors from global scams. Take the mission here: [YOUR-VERCEL-URL-HERE]`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(whatsappUrl, '_blank');
};

// INITIALIZE
shuffle(scenarios);
// --- Dark Mode Logic ---
const themeBtn = document.getElementById('theme-switch');
const body = document.body;

// Check for saved theme preference
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-theme');
    themeBtn.innerText = '☀️'; // Show sun in dark mode
}

themeBtn.onclick = () => {
    body.classList.toggle('dark-theme');
    
    if (body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
        themeBtn.innerText = '☀️';
    } else {
        localStorage.setItem('theme', 'light');
        themeBtn.innerText = '🌑';
    }
};