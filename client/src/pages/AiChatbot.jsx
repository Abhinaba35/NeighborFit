import { useState } from "react";
import axios from "axios";

const AiChatbot = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChat = async () => {
    if (!prompt) return;

    setLoading(true);
    setResponse("");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/ai/recommend`,
        {
          prompt,
        }
      );
      setResponse(res.data.response);
    } catch (err) {
      console.error(err);
      setResponse("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4 border shadow bg-white rounded">
      <h2 className="text-2xl font-bold mb-4">AI City Recommendation</h2>
      <textarea
        rows="4"
        className="w-full p-2 border rounded mb-2"
        placeholder="Describe your ideal city (e.g., safe and near good schools)"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        onClick={handleChat}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        disabled={loading}
      >
        {loading ? "Thinking..." : "Ask AI"}
      </button>

      {response && (
        <div className="mt-6 whitespace-pre-line border-t pt-4">
          <h3 className="text-lg font-semibold mb-2">Recommendations:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default AiChatbot;
