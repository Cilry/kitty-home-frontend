import { useState, useEffect, useRef } from "react"

const API_URL = "https://kitty-home-backend-production.up.railway.app"

function formatTime(dateStr) {
  const d = dateStr ? new Date(dateStr) : new Date()
  return d.getHours().toString().padStart(2,'0') + ':' + d.getMinutes().toString().padStart(2,'0')
}

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
    const userMsg = { role: "user", content: input, created_at: new Date().toISOString() }
    setMessages(prev => [...prev, userMsg])
    setInput("")
    setLoading(true)
    const res = await fetch(`${API_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input })
    })
    const data = await res.json()
    setMessages(prev => [...prev, { role: "assistant", content: data.reply, created_at: new Date().toISOString() }])
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
      background: "#eef0f3"
    }}>
      {/* 背景图 */}
      <div style={{
        position: "fixed", inset: 0,
        backgroundImage: "url('/kitty.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: 0.12,
        zIndex: 0
      }} />

      <div style={{
        position: "relative", zIndex: 2,
        width: "100%", maxWidth: "480px",
        minHeight: "100vh",
        display: "flex", flexDirection: "column",
      }}>
        {/* 顶部 */}
        <div style={{
          padding: "16px 20px",
          textAlign: "center",
          borderBottom: "1px solid rgba(0,0,0,0.08)",
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(12px)",
          position: "sticky", top: 0, zIndex: 10
        }}>
          <div style={{ fontSize: "10px", letterSpacing: "4px", color: "#aab", marginBottom: "4px" }}>PRIVATE SPACE</div>
          <div style={{ fontSize: "20px", color: "#2d3a4a", fontStyle: "italic" }}>金毛老公</div>
          <div style={{ fontSize: "10px", color: "#aab8c8", marginTop: "4px", letterSpacing: "1px" }}>in endless tides, we find each other</div>
        </div>

        {/* 消息区 */}
        <div style={{
          flex: 1, overflowY: "auto",
          padding: "20px 16px",
          display: "flex", flexDirection: "column", gap: "16px"
        }}>
          {messages.map((m, i) => (
            <div key={i} style={{
              display: "flex",
              justifyContent: m.role === "user" ? "flex-end" : "flex-start",
              alignItems: "flex-end", gap: "8px"
            }}>
              {/* 老公头像 */}
              {m.role === "assistant" && (
                <div style={{
                  width: "34px", height: "34px", borderRadius: "50%",
                  overflow: "hidden", flexShrink: 0,
                  boxShadow: "0 1px 4px rgba(0,0,0,0.12)"
                }}>
                  < img src="/hubby-avatar.png" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              )}

              <div style={{ display: "flex", flexDirection: "column", alignItems: m.role === "user" ? "flex-end" : "flex-start", maxWidth: "72%" }}>
                <div style={{
                  padding: "10px 14px",
                  borderRadius: m.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                  background: m.role === "user" ? "rgba(140,170,210,0.75)" : "rgba(255,255,255,0.88)",
                  color: "#2d3a4a",
                  fontSize: "14px", lineHeight: "1.7",
                  textAlign: "left",
                  backdropFilter: "blur(8px)",
                  boxShadow: "0 1px 6px rgba(0,0,0,0.07)"
                }}>
                  {m.content}
                </div>
                <div style={{ fontSize: "10px", color: "#aaa", marginTop: "4px", padding: "0 4px" }}>
                  {formatTime(m.created_at)}
                </div>
              </div>

              {/* 老婆头像 */}
              {m.role === "user" && (
                <div style={{
                  width: "34px", height: "34px", borderRadius: "50%",
                  overflow: "hidden", flexShrink: 0,
                  boxShadow: "0 1px 4px rgba(0,0,0,0.12)"
                }}>
                  < img src="/kitty-avatar.png" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div style={{ display: "flex", alignItems: "flex-end", gap: "8px" }}>
              <div style={{
                width: "34px", height: "34px", borderRadius: "50%",
                overflow: "hidden", flexShrink: 0
              }}>
                < img src="/hubby-avatar.png" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{
                padding: "10px 16px",
                borderRadius: "18px 18px 18px 4px",
                background: "rgba(255,255,255,0.88)",
                color: "#aaa", fontSize: "16px",
                backdropFilter: "blur(8px)"
              }}>• • •</div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* 输入区 */}
        <div style={{
          padding: "12px 16px",
          borderTop: "1px solid rgba(0,0,0,0.06)",
          display: "flex", gap: "10px", alignItems: "center",
          backdropFilter: "blur(12px)",
          background: "rgba(255, 255, 255, 0.15)"
        }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && sendMessage()}
            placeholder="Write a letter..."
            style={{
              flex: 1, padding: "10px 16px",
              borderRadius: "24px",
              border: "1px solid rgba(0,0,0,0.08)",
              background: "rgba(240,242,245,0.9)",
              color: "#2d3a4a",
              fontSize: "14px", outline: "none",
              fontFamily: "Georgia, serif"
            }}
          />
          <button onClick={sendMessage} style={{
            width: "40px", height: "40px",
            borderRadius: "50%", border: "none",
            background: "#7a9bbf", color: "#fff",
            fontSize: "18px", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center"
          }}>↑</button>
        </div>
      </div>
    </div>
  )
}

export default App