import React, {useEffect, useState} from 'react';
import Recipe from "./Recipe" ;
import './App.css';

const App = () => {

  const APP_ID = '4b4b0413';
  const APP_KEY = 'af7edad56e076b97764ce9d25ddacf31';

  const [recipes, setRecipes] =  useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState("chicken")

  useEffect(()=> {
      getRecipes();
  }, [query])

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`); 
    const data = await response.json();
    console.log(data);

    setRecipes(data.hits);
  }

  const updateSearch = e => {
    setSearch(e.target.value);
    // console.log(search);
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
  }

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <div className="recipes">
        {recipes.map(recipe => (
          <Recipe 
            key={recipe.recipe.totalWeight}
            title={recipe.recipe.label} 
            calories={recipe.recipe.calories} 
            image={recipe.recipe.image} 
            ingredients={recipe.recipe.ingredients}
            />
        ))}
      </div>
    </div>
  )
}

export default App;
