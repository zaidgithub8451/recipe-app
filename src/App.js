import React, { useEffect, useState } from 'react';
import Recipe from './Recipe';
import './App.css';

const App = () => {
  const APP_ID = "4592ad93"
  const APP_KEY = "91799aa66c7f3620161fca0aef5e51da"

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken")

  useEffect(() => {
    getRecipe()
  }, [query])

  const getRecipe = async() => {
    const response = await fetch(
    `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    const data = await response.json();
    console.log(data)
    setRecipes(data.hits)
  };

  const updateSearch = e =>{
    setSearch(e.target.value)
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search)
    setSearch("")
  }

  return (
    <div className="App">
      <form onSubmit={getSearch} className='search-form'>
        <input className='search-bar' type="text" value={search} onChange={updateSearch} />
        <button className='search-button' type='submit'>Seach</button>
      </form>
      <div className='recipes'>
      {recipes.map(recipe => (
        <Recipe 
        key={recipe.recipe.label}
        title= {recipe.recipe.label} 
        calories= {recipe.recipe.calories} 
        image= {recipe.recipe.image} 
        ingredients = {recipe.recipe.ingredients}/>
      ))}
      </div>
    </div>
  );
}

export default App;
