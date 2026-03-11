import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Footer from './components/Footer'
import Img from './components/imgUrl'
import Info from './components/info'

function App() {
  return (
    <>
      <div>
        <Info />
        <Img />

        <Footer />
      </div>
    </>
  )
}

export default App
