import { useState, useEffect, useRef } from "react"

const API_URL = "https://kitty-home-backend-production.up.railway.app"

function App() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    fetch(`${API_URL}/api/history`)
      .then(r => r.json())
      .then(data => setMessages(Array.isArray(data) ? data : []))
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

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
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #e8eef5 0%, #d6e4f0 50%, #c9daea 100%)",
      backgroundImage: "url('/bg.png')",
      backgroundSize: "contain",
      backgroundPosition: "bottom center",
      backgroundRepeat: "no-repeat",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      fontFamily: "'Georgia', serif"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "480px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backdropFilter: "blur(10px)"
      }}>
        {/* 顶部标题 */}
        <div style={{
          padding: "32px 24px 16px",
          textAlign: "center",
          borderBottom: "1px solid rgba(150,180,210,0.3)"
        }}>
          <div style={{ fontSize: "11px", letterSpacing: "4px", color: "#8aa4bc", marginBottom: "8px" }}>PRIVATE SPACE</div>
          <div style={{ fontSize: "28px", color: "#3d6480", fontStyle: "italic", letterSpacing: "1px" }}>kitty & puppy老公</div>
          <div style={{ fontSize: "11px", color: "#9ab5c8", marginTop: "8px", letterSpacing: "2px" }}>in endless tides, we find each other</div>
        </div>

        {/* 消息区 */}
        <div style={{
          flex: 1,
          overflowY: "auto",
          padding: "20px 16px",
          display: "flex",
          flexDirection: "column",
          gap: "12px"
        }}>
          {messages.map((m, i) => (
            <div key={i} style={{
              display: "flex",
              justifyContent: m.role === "user" ? "flex-end" : "flex-start"
            }}>
              <div style={{
                maxWidth: "75%",
                padding: "10px 16px",
                borderRadius: m.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                background: m.role === "user"
                  ? "rgba(100,150,190,0.85)"
                  : "rgba(255,255,255,0.75)",
                color: m.role === "user" ? "#fff" : "#3d5a6e",
                fontSize: "14px",
                lineHeight: "1.6",
                boxShadow: "0 2px 8px rgba(100,150,200,0.15)",
                backdropFilter: "blur(4px)"
              }}>
                {m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <div style={{
                padding: "10px 16px",
                borderRadius: "18px 18px 18px 4px",
                background: "rgba(255,255,255,0.75)",
                color: "#8aa4bc",
                fontSize: "14px"
              }}>···</div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* 输入区 */}
        <div style={{
          padding: "16px",
          borderTop: "1px solid rgba(150,180,210,0.3)",
          display: "flex",
          gap: "10px",
          background: "rgba(255,255,255,0.3)",
          backdropFilter: "blur(10px)"
        }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && sendMessage()}
            placeholder="say something..."
            style={{
              flex: 1,
              padding: "10px 16px",
              borderRadius: "24px",
              border: "1px solid rgba(150,180,210,0.5)",
              background: m.role === "user"
  ? "rgba(100,150,190,0.85)"
  : "rgba(255,255,255,0.75)",
color: m.role === "user" ? "#fff" : "#3d5a6e",
fontSize: "14px",
lineHeight: "1.6",
textAlign: "left",
              outline: "none",
              fontFamily: "Georgia, serif"
            }}
          />
          <button
            onClick={sendMessage}
            style={{
              padding: "10px 20px",
              borderRadius: "24px",
              border: "none",
              background: "rgba(100,150,190,0.8)",
              color: "#fff",
              fontSize: "14px",
              cursor: "pointer",
              letterSpacing: "1px"
            }}
          >put</button>
        </div>
      </div>
    </div>
  )
}

export default App