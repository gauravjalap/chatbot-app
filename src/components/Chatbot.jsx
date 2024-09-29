import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

const Chatbot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    return savedMessages ? JSON.parse(savedMessages) : [];
  });
  const [isLoading, setIsLoading] = useState(false);
  const [tableOfContents, setTableOfContents] = useState([]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const messageRefs = useRef({});

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
    updateTableOfContents();
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const updateTableOfContents = () => {
    const headings = messages.filter(
      (message) => message.sender === "bot" && message.text.match(/^#+\s/)
    );
    setTableOfContents(headings);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = {
      text: input,
      sender: "user",
      timestamp: new Date().toISOString(),
      avatar: "https://api.dicebear.com/6.x/initials/svg?seed=User",
    };
    setMessages([...messages, newMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:3001/api/chat", {
        message: input,
      });
      const botMessage = {
        text: response.data.response,
        sender: "bot",
        timestamp: new Date().toISOString(),
        avatar: "https://api.dicebear.com/6.x/bottts/svg?seed=Groq",
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = {
        text: "An error occurred. Please try again.",
        sender: "bot",
        timestamp: new Date().toISOString(),
        avatar: "https://api.dicebear.com/6.x/bottts/svg?seed=Groq",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }

    setIsLoading(false);
  };

  const clearChat = () => {
    setMessages([]);
    setTableOfContents([]);
    localStorage.removeItem("chatMessages");
  };

  const scrollToMessage = (index) => {
    messageRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-2xl">
      {tableOfContents.length > 0 && (
        <div className="mb-4 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Table of Contents</h3>
          <ul>
            {tableOfContents.map((heading, index) => (
              <li key={index} className="mb-1">
                <button
                  onClick={() => scrollToMessage(messages.indexOf(heading))}
                  className="text-blue-500 hover:underline"
                >
                  {heading.text.replace(/^#+\s/, "")}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="mb-4 h-[500px] overflow-y-auto bg-gray-100 rounded-lg p-4">
        {messages.map((message, index) => (
          <div
            key={index}
            ref={(el) => (messageRefs.current[index] = el)}
            className={`mb-4 flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`flex ${
                message.sender === "user" ? "flex-row-reverse" : "flex-row"
              } items-start`}
            >
              <img
                src={message.avatar}
                alt={`${message.sender} avatar`}
                className="w-8 h-8 rounded-full mt-1"
              />
              <div
                className={`max-w-xs mx-2 ${
                  message.sender === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-800 border border-gray-300"
                } p-3 rounded-lg`}
              >
                <ReactMarkdown className="prose max-w-none">
                  {message.text}
                </ReactMarkdown>
                <p className="text-xs mt-1 text-gray-700">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          type="text"
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your message..."
          autoFocus
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          Send
        </button>
      </form>
      <button
        onClick={clearChat}
        className="mt-4 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition duration-300 ease-in-out"
      >
        Clear Chat
      </button>
    </div>
  );
};

export default Chatbot;
