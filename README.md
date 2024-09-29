# Groq AI Chatbot

![Groq AI Chatbot](https://api.dicebear.com/6.x/bottts/svg?seed=GroqChatbot&size=200)

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Integration](#api-integration)
- [Styling](#styling)
- [Local Storage](#local-storage)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The Groq AI Chatbot is an interactive web application that leverages the power of the Groq API to provide intelligent responses to user queries. This project demonstrates the integration of a large language model into a user-friendly chat interface, showcasing modern web development practices and responsive design.

## Features

- Real-time chat interface with Groq AI
- Markdown rendering for formatted responses
- User and AI avatars for visual distinction
- Timestamp display for each message
- Persistent chat history using local storage
- Responsive design for various screen sizes
- Loading animation during AI response generation
- Clear chat functionality
- Auto-focus on input field for seamless interaction

## Technologies Used

- React.js
- Vite
- Tailwind CSS
- Axios for API requests
- React-Markdown for rendering formatted text
- Express.js for the backend server
- Groq API for AI-powered responses

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- Groq API key

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/groq-ai-chatbot.git
   cd groq-ai-chatbot
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your Groq API key:
   ```
   GROQ_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```
   npm run dev
   ```

5. In a separate terminal, start the backend server:
   ```
   npm run server
   ```

6. Open your browser and navigate to `http://localhost:5173` to view the application.

## Usage

1. Type your message in the input field at the bottom of the chat window.
2. Press Enter or click the Send button to submit your message.
3. Wait for the AI to generate a response.
4. Scroll through the chat history to view previous messages.
5. Click the "Clear Chat" button to remove all messages and start a new conversation.

## Project Structure

```
groq-ai-chatbot/
├── src/
│   ├── components/
│   │   └── Chatbot.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── server.js
├── .env
├── package.json
├── vite.config.js
└── README.md
```

## API Integration

The project uses the Groq API to generate AI responses. The integration is handled in the `server.js` file, which creates an Express server to proxy requests to the Groq API. This approach keeps the API key secure on the server-side.

## Styling

The project uses Tailwind CSS for styling, providing a clean and responsive design. The chat interface is designed to be intuitive and visually appealing, with distinct styles for user and AI messages.

## Local Storage

Chat history is persisted using the browser's local storage. This allows users to refresh the page or return to the chat later without losing their conversation history.

## Future Enhancements

- Implement user authentication
- Add support for file uploads and image recognition
- Integrate text-to-speech and speech-to-text capabilities
- Create a mobile app version using React Native
- Implement chat export functionality

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
