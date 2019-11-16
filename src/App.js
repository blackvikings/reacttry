import React, {useEffect, useState} from 'react';
import Recipe from "./Recipe" ;
import './App.css';

const App = () => {

  const APP_ID = '4b4b0413';
  const APP_KEY = 'af7edad56e076b97764ce9d25ddacf31';

  const [recipes, setRecipes] =  useState([]);

  useEffect(()=> {
      getRecipes();
  }, [])

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`); 
    const data = await response.json();
    // console.log(data);

    setRecipes(data.hits);
  }

  return (
    <div className="App">
      <form className="search-form">
        <input className="search-bar" type="text"/>
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      {recipes.map(recipe => (
        <Recipe 
          key={recipe.recipe.label}
          title={recipe.recipe.label} 
          calories={recipe.recipe.calories} 
          image={recipe.recipe.image} />
      ))}
    </div>
  )
}

export default App;
