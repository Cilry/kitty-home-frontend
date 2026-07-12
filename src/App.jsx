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
      position: "relative",
      fontFamily: "'Georgia', serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}>
      {/* 背景图 */}
      <div style={{
        position: "fixed",
        inset: 0,
        backgroundImage: "url('/kitty.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "brightness(0.95)",
        zIndex: 0
      }} />
      {/* 蓝色蒙层 */}
      <div style={{
        position: "fixed",
        inset: 0,
        background: "linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.2) 100%)",
        zIndex: 1
      }} />

      {/* 主内容 */}
      <div style={{
        position: "relative",
        zIndex: 2,
        width: "100%",
        maxWidth: "480px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}>
        {/* 顶部标题 */}
        <div style={{
          padding: "36px 24px 16px",
          textAlign: "center",
          borderBottom: "1px solid rgba(200,220,255,0.2)",
          backdropFilter: "blur(8px)",
          background: "rgba(20,40,80,0.25)"
        }}>
          <div style={{ fontSize: "10px", letterSpacing: "5px", color: "rgba(180,205,255,0.7)", marginBottom: "8px" }}>PRIVATE SPACE</div>
          <div style={{ fontSize: "26px", color: "rgba(220,235,255,0.95)", fontStyle: "italic", letterSpacing: "2px" }}>kitty & 金毛老公</div>
          <div style={{ fontSize: "10px", color: "rgba(160,190,255,0.6)", marginTop: "8px", letterSpacing: "3px" }}>in endless tides, we find each other</div>
        </div>

        {/* 消息区 */}
        <div style={{
          flex: 1,
          overflowY: "auto",
          padding: "20px 16px",
          display: "flex",
          flexDirection: "column",
          gap: "14px"
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
                  ? "rgba(80,120,200,0.65)"
                  : "rgba(255,255,255,0.15)",
                color: "rgba(235,242,255,0.95)",
                fontSize: "14px",
                lineHeight: "1.7",
                textAlign: "left",
                boxShadow: "0 2px 12px rgba(30,60,120,0.2)",
                backdropFilter: "blur(12px)",
                border: m.role === "user"
                  ? "1px solid rgba(120,160,255,0.3)"
                  : "1px solid rgba(255,255,255,0.15)"
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
                background: "rgba(255,255,255,0.15)",
                color: "rgba(200,220,255,0.8)",
                fontSize: "14px",
                backdropFilter: "blur(12px)"
              }}>···</div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* 输入区 */}
        <div style={{
          padding: "16px",
          borderTop: "1px solid rgba(200,220,255,0.2)",
          display: "flex",
          gap: "10px",
          backdropFilter: "blur(16px)",
          background: "rgba(20,40,80,0.3)"
        }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && sendMessage()}
            placeholder="Say something..."
            style={{
              flex: 1,
              padding: "10px 16px",
              borderRadius: "24px",
              border: "1px solid rgba(150,180,255,0.3)",
              background: "rgba(255,255,255,0.1)",
              color: "rgba(235,242,255,0.95)",
              fontSize: "14px",
              outline: "none",
              fontFamily: "Georgia, serif",
              backdropFilter: "blur(8px)"
            }}
          />
          <button
            onClick={sendMessage}
            style={{
              padding: "10px 20px",
              borderRadius: "24px",
              border: "1px solid rgba(150,180,255,0.4)",
              background: "rgba(80,120,200,0.6)",
              color: "rgba(235,242,255,0.95)",
              fontSize: "14px",
              cursor: "pointer",
              letterSpacing: "1px",
              backdropFilter: "blur(8px)"
            }}
          >Send</button>
        </div>
      </div>
    </div>
  )
}

export default App