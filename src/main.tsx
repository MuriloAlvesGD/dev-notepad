import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './index.css'
import Home from './pages/home/Home.tsx'
import Insert from './pages/insert/Insert.tsx'
import FloatingMenu from "./components/floatingMenu/FloatingMenu";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FloatingMenu />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/insert" element={<Insert />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
