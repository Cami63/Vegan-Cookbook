import logo from './logo.svg';
import './App.css';
import SearchPage from './search/SearchPage';
import { useEffect, useState } from 'react';
import ApiConnector from './api/ApiConnector';

const App = () => {
  const [mealTypes, setMealTypes] = useState([]);
  useEffect(() => {
    ApiConnector.getMealTypes().then((data) => {setMealTypes(data.meal_types)})
  }, []);
  return (
    <>
      <div className="app">
        <header>
          { /* I will start by defining the three navigation buttons at the top of the search page */ }
          <nav className="top-btn">
          <a href="#" className="search">Search</a>
          <a href="#" className="browse">Browse</a>
          <a href="#" className="add-recipe">Add Recipe</a>
          </nav>
          <h1 className="title">
            Vegan Recipe Book
          </h1>
        </header>
      </div>
      {
        !!mealTypes?.length && <SearchPage mealTypes={mealTypes} />
      }
    </>
  );
}

export default App;
