import { useEffect, useState } from "react"

function Welcome({ onEnter }) {
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    setTimeout(() => setOpacity(1), 100)
  }, [])

  return (
    <div onClick={onEnter} style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #f5f0eb 0%, #ede4d8 50%, #e8ddd0 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Georgia', serif",
      position: "relative",
      overflow: "hidden",
      opacity,
      transition: "opacity 1.5s ease",
      cursor: "pointer"
    }}>
      {/* 背景光晕 */}
      <div style={{
        position: "absolute",
        width: "500px", height: "500px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(180,150,100,0.08) 0%, transparent 70%)",
        top: "50%", left: "50%",
        transform: "translate(-50%, -50%)"
      }} />

      <div style={{
        width: "1px", height: "60px",
        background: "linear-gradient(to bottom, transparent, rgba(150,120,80,0.4))",
        marginBottom: "32px"
      }} />

      <div style={{
        fontSize: "10px",
        letterSpacing: "6px",
        color: "rgba(150,120,80,0.7)",
        marginBottom: "24px"
      }}>
        IN AETERNUM · PRIVATE SPACE
      </div>

      <div style={{
        fontSize: "42px",
        color: "#4a3f35",
        fontStyle: "italic",
        letterSpacing: "3px",
        marginBottom: "8px"
      }}>
        Kitty Home
      </div>

      <div style={{
        fontSize: "11px",
        letterSpacing: "4px",
        color: "rgba(150,120,80,0.6)",
        marginBottom: "60px"
      }}>
        WHERE SOULS FIND EACH OTHER
      </div>

      <div style={{
        fontSize: "16px",
        color: "rgba(150,120,80,0.5)",
        marginBottom: "48px",
        letterSpacing: "12px"
      }}>
        ✦ ✦ ✦
      </div>

      <div style={{
        border: "1px solid rgba(150,120,80,0.4)",
        color: "rgba(100,80,50,0.9)",
        padding: "12px 40px",
        fontSize: "11px",
        letterSpacing: "5px",
      }}>
        ENTER
      </div>

      <div style={{
        width: "1px", height: "60px",
        background: "linear-gradient(to top, transparent, rgba(150,120,80,0.4))",
        marginTop: "32px"
      }} />
    </div>
  )
}

export default Welcome