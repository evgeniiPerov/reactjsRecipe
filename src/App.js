
import { useEffect, useState } from 'react';
import './App.css';
import Recipe from './Recipe';




function App() {
  //API and APP adi from edamam.com
  const APP_ID = process.env.REACT_APP_ID

  const APP_KEY = process.env.REACT_APP_KEY
  //proto mam array in recepis (console.log(data.hits))
  //delam array a v useState([]) -> array
  const [recipes, setRecipes] = useState([])
  //Problem u search, nemuzu vyuzivat bez dalsiho useState -> 
  //delam dalsi useState
  const [search, setSearch] = useState('')
  //query -> konecne slovo 
  const [query, setQuery] = useState('chicken')

  //useEffect dobre vyuzivat na API, 
  //s async -> await funkci (Dostat api jednou, pockat na api)
  useEffect(() => {
    getRecipes()
  }, [query])

  const getRecipes = async () => {
    //`https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`   chicken dali do useState
    //vyuzivam query
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    //json data co dostali s API, momentalne sou Recipi
    const data = await response.json()
    //in hits mam vse recipi, dozvedel s console.log(data)
    console.log(data.hits)
    //Menime recipes na data.hits/DOPLUJEME TIMA DATAMA
    setRecipes(data.hits)
    //alternative reseni API s Promise
    //fetch(htttp://api.example.com/blablabla)
    //.then(response => {
    //  response.json
  }

  const updateSearch = e => {
    //Vzdy kdyz menime tak mame value input   
    setSearch(e.target.value)
  }

  const getSearch = e => {
    //stop page refresh
    e.preventDefault()
    //kdyz klikam na submit, tak jedu search s chicken neco
    setQuery(search)
    //po kazdym submit vratime se k prazdnemu input
    setSearch('')
  }


  return (
    <div className="App">
      <form onSubmit={getSearch} type='text' className='search-form'>
        <input type="text" className='search-bar' value={search} onChange={updateSearch} />
        <button type='submit'
          className='search-button'>Search</button>
      </form>
      <div className="recipes">
        <p>Popis: mapping recipes - arraym aby to vypadalo
        map - kazda funkce de k kazdemu elementu v array
      </p>
        <p>recipe.recipe.label, protoze v map mame recipe, a v array
        taky recipe, label - nazev jednotlivy v array
      </p>
        {recipes.map(recipe => (
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
