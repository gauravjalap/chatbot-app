import React from "react";
import Chatbot from "./components/Chatbot";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-white mb-8 shadow-text">
          Groq AI Chatbot
        </h1>
        <Chatbot />
      </div>
    </div>
  );
}

export default App;
