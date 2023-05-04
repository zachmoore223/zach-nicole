import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

function Shopping() {
  const [items, setItems] = useState([]);

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

  return (
    <div className="groceryList">
      <h1 className="groceryListHeader">Shopping List</h1>
      <ul className="groceryListItems">
        {items.map(item => (
          <li key={item.id}>
            {item.name} - ${item.price} - {item.type}
            <button onClick={() => removeItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
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
      <br />
      <button type="submit">Add Item</button>
    </form>
    </div>
  );
}

export default Shopping;