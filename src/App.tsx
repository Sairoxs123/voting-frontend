import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./components/Home"
import Auth from "./components/Auth"
import VerifyAuth from "./components/VerifyAuth"
import EmailSent from "./components/EmailSent"
import { CookiesProvider } from "react-cookie"

function App() {

  return (
    <CookiesProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/verify/:verification_string" element={<VerifyAuth />} />
        <Route path="/email/sent" element={<EmailSent />} />
      </Routes>
    </BrowserRouter>
    </CookiesProvider>
  )
}

export default App
