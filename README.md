# Elexia: Your Smart Election Assistant

Elexia is an interactive, smart assistant designed to help voters navigate the complexities of the election process, key deadlines, and polling location discovery in a highly accessible and visually engaging way.

## 🎯 Chosen Vertical
**Voter Education & Navigation Assistant**

We chose this vertical because the voting process can often be intimidating or confusing, especially for first-time voters. Key dates are easily missed, and finding polling locations can be a friction point that lowers voter turnout. Elexia solves this by providing a conversational, step-by-step guide tailored to the user's specific context and needs.

## 🧠 Approach & Logic

### **Design Philosophy**
Elexia is built with a premium, modern aesthetic utilizing glassmorphism, fluid animations (via Framer Motion), and a tailored dark mode palette. The approach is to make civic engagement feel like a modern digital experience rather than a bureaucratic chore. 

### **The Logic Engine**
The core of Elexia is a custom state-based Logic Engine (`src/utils/logicEngine.js`) that acts as a decision tree:
1. **Context Gathering**: It starts by asking the user if they are registered.
2. **Dynamic Routing**: Based on the answer, it routes the user to registration steps or directly to finding polling stations/timelines.
3. **Component Injection**: The logic engine doesn't just return text; it can inject entire React components (like the interactive `Timeline` or the `PollingLocator`) directly into the chat flow exactly when the user needs them.

## 🛠️ How It Works

1. **Conversational Interface**: Users are greeted by the bot and presented with contextual options.
2. **Interactive Choices**: Instead of typing (which can lead to parsing errors), users select from predefined smart options that drive the conversation forward.
3. **Timeline Visualization**: When a user asks about dates, a visual timeline component is dynamically rendered in the chat.
4. **Polling Locator**: The app includes a mock-integrated Google Maps locator that simulates finding a nearby polling station based on a ZIP code query.

## 💡 Assumptions Made

1. **Mock Data Integration**: Due to the absence of a live voter database or premium Google Maps API key provided during this build, the Polling Locator and timeline dates currently use simulated (mock) data to demonstrate the intended UX flow.
2. **Target Audience**: The UX is heavily optimized for digital-native users (Gen Z / Millennials) through its dark mode and chat-based UI, assuming this demographic benefits most from a modernized civic tool.
3. **Framework**: It was assumed that React (via Vite) and Vanilla CSS were the optimal stack to deliver a highly performant and customizable experience without relying heavily on bulky third-party libraries.

## 🚀 Running Locally

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the dev server: `npm run dev`

## 🌐 Deployment
This application is designed to be easily deployed to GitHub Pages or platforms like Vercel/Netlify. The build process uses `npm run build` to generate the static files.
