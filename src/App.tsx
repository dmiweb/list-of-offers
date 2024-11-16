import './App.css';
import data from './etsy.json';
import Listing from './Listing';

function App() {
  const items = data;

  return (
    <Listing items={items} />
  )
}

export default App;
