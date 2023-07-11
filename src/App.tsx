import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Test from './pages/test';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
      <BrowserRouter>
        <div style={{ width: "100%", minHeight: "100vh", height: "auto" }}>
          <Routes>
            <Route path="/" element={<Test/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
