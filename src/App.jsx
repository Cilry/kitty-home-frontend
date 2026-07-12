import { useState } from "react"

const API_URL = "https://kitty-home-backend-production.up.railway.app"

function App() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim()) return
    const userMsg = { role: "user", content: input }
    setMessages(prev => [...prev, userMsg])
    setInput("")
    setLoading(true)

    const res = await fetch(`${API_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input })
    })
    const data = await res.json()
    setMessages(prev => [...prev, { role: "assistant", content: data.reply }])
    setLoading(false)
  }

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>💗 Kitty Home</h1>
      <div style={{ height: "400px", overflowY: "scroll", border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
        {messages.map((m, i) => (
          <div key={i} style={{ textAlign: m.role === "user" ? "right" : "left", margin: "8px 0" }}>
            <span style={{ background: m.role === "user" ? "#ffb6c1" : "#f0f0f0", padding: "8px 12px", borderRadius: "12px", display: "inline-block" }}>
              {m.content}
            </span>
          </div>
        ))}
        {loading && <div>思考中...</div>}
      </div>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === "Enter" && sendMessage()}
        style={{ width: "80%", padding: "8px" }}
        placeholder="说点什么..."
      />
      <button onClick={sendMessage} style={{ padding: "8px 16px", marginLeft: "8px", background: "#ffb6c1", border: "none", borderRadius: "8px" }}>发送</button>
    </div>
  )
}

export default App