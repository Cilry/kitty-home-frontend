import { useEffect, useState } from "react"

function Welcome({ onEnter }) {
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    setTimeout(() => setOpacity(1), 100)
  }, [])

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0d0d0f",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Georgia', serif",
      position: "relative",
      overflow: "hidden",
      opacity,
      transition: "opacity 1.5s ease"
    }}>
      {/* 背景光晕 */}
      <div style={{
        position: "absolute",
        width: "600px", height: "600px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(180,150,100,0.12) 0%, transparent 70%)",
        top: "50%", left: "50%",
        transform: "translate(-50%, -50%)"
      }} />

      {/* 顶部装饰线 */}
      <div style={{
        width: "1px", height: "60px",
        background: "linear-gradient(to bottom, transparent, rgba(180,150,100,0.6))",
        marginBottom: "32px"
      }} />

      {/* 拉丁文 */}
      <div style={{
        fontSize: "10px",
        letterSpacing: "6px",
        color: "rgba(180,150,100,0.6)",
        marginBottom: "24px",
        textTransform: "uppercase"
      }}>
        In Aeternum · Private Space
      </div>

      {/* 主标题 */}
      <div style={{
        fontSize: "42px",
        color: "rgba(240,230,215,0.95)",
        fontStyle: "italic",
        letterSpacing: "3px",
        marginBottom: "8px",
        textShadow: "0 0 40px rgba(180,150,100,0.3)"
      }}>
        Kitty Home
      </div>

      {/* 副标题 */}
      <div style={{
        fontSize: "11px",
        letterSpacing: "4px",
        color: "rgba(180,150,100,0.5)",
        marginBottom: "60px"
      }}>
        WHERE SOULS FIND EACH OTHER
      </div>

      {/* 装饰符号 */}
      <div style={{
        fontSize: "18px",
        color: "rgba(180,150,100,0.4)",
        marginBottom: "48px",
        letterSpacing: "12px"
      }}>
        ✦ ✦ ✦
      </div>

      {/* 进入按钮 */}
      <button onClick={onEnter} style={{
        background: "transparent",
        border: "1px solid rgba(180,150,100,0.4)",
        color: "rgba(220,205,180,0.9)",
        padding: "12px 40px",
        fontSize: "11px",
        letterSpacing: "5px",
        cursor: "pointer",
        fontFamily: "Georgia, serif",
        transition: "all 0.3s ease",
        textTransform: "uppercase"
      }}
      onMouseEnter={e => {
        e.target.style.background = "rgba(180,150,100,0.1)"
        e.target.style.borderColor = "rgba(180,150,100,0.8)"
      }}
      onMouseLeave={e => {
        e.target.style.background = "transparent"
        e.target.style.borderColor = "rgba(180,150,100,0.4)"
      }}
      >
        Enter
      </button>

      {/* 底部装饰线 */}
      <div style={{
        width: "1px", height: "60px",
        background: "linear-gradient(to top, transparent, rgba(180,150,100,0.6))",
        marginTop: "32px"
      }} />
    </div>
  )
}

export default Welcome