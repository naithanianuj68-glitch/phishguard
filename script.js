// 1. THE MISSION SCENARIOS (Comprehensive & Global)
const scenarios = [
    { country: "Global", sender: "Netflix Support", message: "Payment failed. Update your card at netfllx-update.com immediately.", isScam: true, explanation: "Scam! Look at the spelling of 'netfllx'. Real sites use official domains." },
    { country: "India", sender: "SBI Bank (SMS)", message: "Your KYC is expired. Click to update via UPI PIN: bit.ly/bank-secure", isScam: true, explanation: "Scam! Banks never ask for UPI PINs for KYC updates. This is a common trick to drain accounts." },
    { country: "Global", sender: "WhatsApp Message", message: "Hi Mum, it's me. I lost my phone, can you wire £200 for a bill?", isScam: true, explanation: "Scam! This is the 'Hi Mum' trick. Always call the person's real number to check." },
    { country: "Global", sender: "Microsoft Support", message: "VIRUS FOUND! Call +1-800-SAFE-01 now to protect your files.", isScam: true, explanation: "Scam! Real security companies don't put phone numbers in pop-ups." },
    { country: "Global", sender: "Lotto Winner", message: "You won $1 Million! Pay $200 delivery fee to get your check.", isScam: true, explanation: "Scam! You never pay money to receive a prize." },
    { country: "USA", sender: "IRS Official", message: "Tax refund available. Provide SSN and Bank Info here to claim.", isScam: true, explanation: "Scam! The IRS never emails for sensitive info like your SSN." },
    { country: "India", sender: "Delivery Agent (Call)", message: "I have a parcel for you but I need a 1-time OTP to confirm your address.", isScam: true, explanation: "Scam! Never share an OTP for a delivery you didn't expect or to 'confirm an address'." },
    { country: "Global", sender: "Amazon Security", message: "Your account was accessed from a new device. If this wasn't you, login here: amzn-security-check.net", isScam: true, explanation: "Scam! The link 'amzn-security-check.net' is fake. Always go to Amazon.com directly." },
    { country: "Global", sender: "Family Member", message: "Check out the photos from our hike yesterday! [Attachment: Hike.jpg]", isScam: false, explanation: "Safe! This is a typical personal message between friends/family." },
    { country: "Global", sender: "Electricity Dept", message: "Your bill for March is now available. Log in to your secure portal at citypower.gov to view it.", isScam: false, explanation: "Safe! It uses an official .gov domain and directs you to a secure portal." },
    { country: "India", sender: "Zomato", message: "Hungry? Use code TASTY50 for 50% off on your next order!", isScam: false, explanation: "Safe! This is a standard promotional message from a verified app." }
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

    document.getElementById('feedback-text').innerText = current.explanation;
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