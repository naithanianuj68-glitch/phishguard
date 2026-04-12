// This data structure holds our levels. We can easily add more!
const scenarios = [
    {
        sender: "Netflix Support <billing@netfllx-update.com>",
        message: "Your payment was declined. Click here to update your credit card immediately or your account will be suspended.",
        isScam: true,
        explanation: "Scam! Look closely at the email address: 'netfllx' is spelled with two L's instead of an 'i'. Scammers use fake urgency to panic you."
    },
    {
        sender: "Dr. Smith's Office <appointments@smithmedical.org>",
        message: "Reminder: You have an upcoming appointment on Thursday at 10:00 AM. Please reply 'YES' to confirm.",
        isScam: false,
        explanation: "Safe! This is a standard appointment reminder. It doesn't ask for sensitive info like passwords or credit cards."
    }
];

// We will add the logic to cycle through these scenarios next!
console.log("Game initialized with " + scenarios.length + " scenarios.");