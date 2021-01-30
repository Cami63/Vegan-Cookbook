import logo from './logo.svg';
import './App.css';
import Search from './search/Search';

const App = () => {
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
      <Search />
    </>
  );
}

export default App;
