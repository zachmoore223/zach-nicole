import React, { useState, useEffect } from 'react';
import { ShoppingListItems } from '../shoppingListItems';
import { v4 as uuidv4 } from 'uuid';

function Shopping() {
  const [items, setItems] = useState([]);
  const frequentItems = ShoppingListItems;
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [newItemType, setNewItemType] = useState('');
  const [selectedFrequentItem, setSelectedFrequentItem] = useState('');

  useEffect(() => {
    // Get the shopping list data from local storage
    const storedItems = JSON.parse(localStorage.getItem('shoppingList')) || [];

    // Set the items state to the stored shopping list data
    setItems(storedItems);
  }, []);

  useEffect(() => {
    // Save the shopping list data to local storage whenever the items state changes
    localStorage.setItem('shoppingList', JSON.stringify(items));
  }, [items]);

  function addItem(name, price, type) {
    // Create a new item object with a unique ID using the uuid package
    const newItem = { id: uuidv4(), name, price, type };

    // Add the new item to the items state
    setItems([...items, newItem]);
  }

  function removeItem(id) {
    // Filter out the item with the specified ID and update the items state
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
  }

  const handleSelectFrequentItem = (event) => {
    const selectedName = event.target.value;
    const selectedPrice = frequentItems.find((item) => item.name === selectedName)
      .price;
    const selectedType = frequentItems.find((item) => item.name === selectedName)
      .type;
    const newItem = {
      name: selectedName,
      price: selectedPrice,
      type: selectedType,
    };
    setItems([...items, newItem]);
  };


  return (
    <div>
      <h1 className="groceryListHeader">Shopping List</h1>
      <div className="shoppingList">
     <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name} - ${item.price} - {item.type} 
            &nbsp; &nbsp; 
            <button className="xButton" onClick={() => removeItem(item.id)}> X </button>
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

      <br/>
      <h2 className ="addAnyHeader">Add Any Item</h2>
        <AddItemForm addItem={addItem} />
    </div>
  );
}

function AddItemForm({ addItem }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    addItem(name, price, type);
    setName('');
    setPrice('');
    setType('');
  }

  return (
    <div className='addAnyItem'>
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <br />
      <input type="text" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />
      <br />
      <input type="text" placeholder="Type" value={type} onChange={e => setType(e.target.value)} />
      <br /><br />
      <button className="addButton" type="submit">Add Item</button>
    </form>
    </div>
  );
}

export default Shopping;