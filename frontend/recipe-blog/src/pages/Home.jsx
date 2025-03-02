import React, { useState } from 'react'
import foodRecipe from '../assets/foodRecipe.jpg'
import RecipeItems from '../components/RecipeItems'
import { useNavigate } from 'react-router-dom'
import Modal from '../components/Modal'
import InputForm from '../components/InputForm'

export default function Home() {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  const addRecipe = () => {
    let token = localStorage.getItem("token")
    if(token) {
      navigate("/addRecipe")
    }
    else {
      setIsOpen(true)
    }
  }

  return (
    <>
      <section className='home'>
          <div className='left'>
              <h1>Food Recipe</h1>
              <h5>This Recipe Sharing Platform allows users to discover, share, and organize their favorite recipes in an interactive and user-friendly environment.</h5>
              <button onClick={addRecipe}>Share your recipe</button>
          </div>
          <div className='right'>
              <img src={foodRecipe} width="400px" height="395px"/>
          </div>
      </section>
      <div className='bg'>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#ebb8d7" fillOpacity="1" d="M0,192L48,181.3C96,171,192,149,288,165.3C384,181,480,235,576,229.3C672,224,768,160,864,149.3C960,139,1056,181,1152,170.7C1248,160,1344,96,1392,64L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
      </div>
      { (isOpen) && <Modal onClose = {() => setIsOpen(false)}><InputForm setIsOpen = {() => setIsOpen(false)}/></Modal> }

      <div className='recipe'>
        <RecipeItems/>
      </div>
    </>
  )
}
