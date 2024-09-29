import express from 'express';
import cors from 'cors';
import Groq from "groq-sdk";
import "dotenv/config";

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function getGroqChatCompletion(message) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: message,
      },
    ],
    model: "llama3-8b-8192",
  });
}

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    const chatCompletion = await getGroqChatCompletion(message);
    res.json({ response: chatCompletion.choices[0]?.message?.content || "" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
