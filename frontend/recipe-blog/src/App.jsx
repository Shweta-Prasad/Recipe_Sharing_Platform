import React from 'react'
import './App.css'
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import Home from './pages/Home'; 
import MainNavigation from './components/MainNavigation';
import axios from 'axios'
import AddFoodRecipe from './pages/AddFoodRecipe';
import EditRecipe from './pages/EditRecipe';
import RecipeDetails from './pages/RecipeDetails';

// Fetch all recipes
const getAllRecipes = async() => {
  let allRecipes = []
  await axios.get('http://localhost:5000/recipe').then(res => {
    allRecipes = res.data
  })
  return allRecipes
}

// Fetch recipes created by the logged-in user
const getMyRecipes = async() => {
  let user = JSON.parse(localStorage.getItem("user"))
  let allRecipes = await getAllRecipes()
  return allRecipes.filter(item => item.createdBy === user._id)
}

// Fetch favorite recipes
const getFavRecipes = async() => {
  return JSON.parse(localStorage.getItem("fav"))
}

// Fetch a single recipe with user details
const getRecipe=async({params})=>{
  let recipe;
  await axios.get(`http://localhost:5000/recipe/${params.id}`)
  .then(res=>recipe=res.data)

  await axios.get(`http://localhost:5000/user/${recipe.createdBy}`)
  .then(res=>{
    recipe={...recipe,email:res.data.email}
  })

  return recipe
}

// Define routes
const router = createBrowserRouter([
  {path:"/", element:<MainNavigation/>, children:[
    {path:"/", element:<Home/>, loader:getAllRecipes},
    {path:"/myRecipe", element:<Home/>, loader:getMyRecipes},
    {path:"/favRecipe", element:<Home/> , loader:getFavRecipes},
    {path:"/addRecipe", element:<AddFoodRecipe/>},
    {path:"/editRecipe/:id", element:<EditRecipe/>},
    {path:"/recipe/:id", element:<RecipeDetails/>, loader:getRecipe}
  ]}
])

export default function App() {
  return (
    <>
    <RouterProvider router = {router}></RouterProvider>
    </>
  )
}
