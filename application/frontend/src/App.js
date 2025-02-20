import React, { useState, useEffect } from 'react';
import { Button, Form, ListGroup } from 'react-bootstrap';

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const apiUrl = 'http://localhost:3000/items';

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setItems(data));
  };

  const addItem = () => {
    fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description, category }),
    }).then(() => fetchItems());
  };

  const deleteItem = (id) => {
    fetch(`${apiUrl}/${id}`, { method: 'DELETE' }).then(() => fetchItems());
  };

  return (
    <div className="container mt-5">
      <h2>Add Item</h2>
      <Form>
        <Form.Control
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="mb-2"
        />
        <Form.Control
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="mb-2"
        />
        <Form.Control
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          className="mb-3"
        />
        <Button variant="primary" onClick={addItem}>Add</Button>
      </Form>

      <h2 className="mt-5">Items List</h2>
      <ListGroup>
        {items.map((item) => (
          <ListGroup.Item key={item.id}>
            {item.name} - {item.description} - {item.category}
            <Button
              variant="danger"
              size="sm"
              className="float-right"
              onClick={() => deleteItem(item.id)}
            >
              Delete
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default App;
