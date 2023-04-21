import { useState } from 'react';
import { data } from '../data';
import { ShoppingListItems } from '../shoppingListItems';

const frequentItems = ShoppingListItems;

function ShoppingList() {
  const [items, setItems] = useState(data);
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [selectedFrequentItem, setSelectedFrequentItem] = useState('');

  const handleRemoveItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const handleAddItem = () => {
    const newItem = {
      name: newItemName,
      price: parseFloat(newItemPrice),
    };
    setItems([...items, newItem]);
    setNewItemName('');
    setNewItemPrice('');
  };

  const handleSelectFrequentItem = (event) => {
    const selectedName = event.target.value;
    const selectedPrice = frequentItems.find((item) => item.name === selectedName)
      .price;
    const newItem = {
      name: selectedName,
      price: selectedPrice,
    };
    setItems([...items, newItem]);
  };

  return (
    <div>
      <h1 className="shoppingListHeader">Shopping List</h1>
      <div className="shopping-list">
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <button onClick={() => handleRemoveItem(index)}> X </button>
            &nbsp;&nbsp;
            {item.name} - ${item.price.toFixed(2)} 
            
          </li>
        ))}
      </ul>
      </div>
      <h2 className ="frequentlyBoughtHeader">Add Frequently Bought Item</h2>
      <div className="frequently-bought">
      
      <label>
        Item:
        <select value={selectedFrequentItem} onChange={handleSelectFrequentItem}>
          <option value="">Select an item</option>
          {frequentItems.map((item, index) => (
            <option key={index} value={item.name}>
              {item.name} - ${item.price.toFixed(2)}
            </option>
          ))}
        </select>
      </label>
      </div>
      <br />
      <h2 className ="addAnyHeader">Add Any Item</h2>
      <div className="add-any-item">
      
      <label>
        Name:
        <input
          type="text"
          value={newItemName}
          onChange={(event) => setNewItemName(event.target.value)}
        />
      </label>
      <br />
      <label>
        Price:
        <input
          type="number"
          value={newItemPrice}
          onChange={(event) => setNewItemPrice(event.target.value)}
        />
      </label>
      <br />
      <button onClick={handleAddItem}>Add</button>
      </div>
    </div>
  );
}

export default ShoppingList;
