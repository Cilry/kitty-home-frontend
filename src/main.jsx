import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Welcome from './Welcome.jsx'

function Root() {
  const [entered, setEntered] = useState(false)

  if (!entered) {
    return <Welcome onEnter={() => setEntered(true)} />
  }
  return <App />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)