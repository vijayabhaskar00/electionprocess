// Election Assistant Logic Engine

export const INITIAL_STATE = 'greeting';

export const chatLogic = {
  greeting: {
    message: "Hi there! I'm your Election Assistant. I'm here to help you navigate the voting process. Are you currently registered to vote?",
    options: [
      { label: "Yes, I am", nextState: "registered_yes" },
      { label: "No, I'm not sure", nextState: "registered_no" }
    ]
  },
  registered_no: {
    message: "No problem! Registering is the first step. You usually need to be 18, a citizen, and meet state residency requirements. Do you want to learn how to register?",
    options: [
      { label: "Show me how", nextState: "show_registration" },
      { label: "Skip to Timeline", nextState: "timeline" }
    ]
  },
  show_registration: {
    message: "You can register online, by mail, or in-person at your local election office. Would you like to check important election dates next?",
    options: [
      { label: "View Timeline", nextState: "timeline" },
      { label: "Find Polling Place", nextState: "polling_location" }
    ]
  },
  registered_yes: {
    message: "Awesome! Being registered is half the battle. Do you know where your polling location is?",
    options: [
      { label: "Yes, I do", nextState: "knows_location" },
      { label: "No, help me find it", nextState: "polling_location" }
    ]
  },
  knows_location: {
    message: "Perfect. It sounds like you are well prepared! What else would you like to explore?",
    options: [
      { label: "Voting Timeline", nextState: "timeline" },
      { label: "Step-by-Step Guide", nextState: "voting_steps" }
    ]
  },
  polling_location: {
    message: "Let's find your polling location.",
    component: 'PollingLocator', // Flags UI to render the component
    options: [
      { label: "Next: Voting Steps", nextState: "voting_steps" },
      { label: "View Timeline", nextState: "timeline" }
    ]
  },
  timeline: {
    message: "Here are the key dates for the upcoming election.",
    component: 'Timeline', // Flags UI to render the Timeline
    options: [
      { label: "View Voting Steps", nextState: "voting_steps" },
      { label: "Start Over", nextState: "greeting" }
    ]
  },
  voting_steps: {
    message: "Here is what you need to know for Election Day:\n\n1. Bring an ID if your state requires it.\n2. Arrive early to avoid lines.\n3. Request a provisional ballot if your name isn't on the list.\n4. Review your ballot carefully before submitting.",
    options: [
      { label: "View Timeline", nextState: "timeline" },
      { label: "Start Over", nextState: "greeting" }
    ]
  }
};
