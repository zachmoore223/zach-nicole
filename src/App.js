import './App.css';
import Weather from './components/Weather.js'
import Shopping from './components/Shopping'
import ShoppingList from './components/ShoppingList'
import uuid from 'uuid';

function App() {
  return (
    <div className="App">
      <header>
      </header>
      <Weather />
      <Shopping />
    </div>
          

  );
}

export default App;
