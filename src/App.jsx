import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Footer from './components/Footer'
import Img from './components/imgUrl'
import Info from './components/info'
import Header from './components/Header'
import BemVindo from './components/BemVindo'



function App() {
  return (
    <>
      <div>
        <Header  
        titulo="Meu Hábitos"
        descricao="Gerencie seu hábitos diários de forma simples e visual"
        />
        <BemVindo nomeUsuario="Cal" totalHabitos={5}></BemVindo>
        <Footer />
      </div>
    </>
  )
}

export default App
