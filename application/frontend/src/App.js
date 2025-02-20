import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  
  const apiUrl = 'http://localhost:3000/items';

  const fetchItems = () => {
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); 
      })
      .then(data => {
        console.log('Fetched items:', data);  
        setItems(data);  
      })
      .catch(error => {
        console.error('Error fetching items:', error);
      });
  };

  const addItem = (e) => {
    e.preventDefault();

    const newItem = { name, description, category };

    fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem),
    })
      .then(response => response.json())
      .then(() => {
        fetchItems(); 
        setName('');  
        setDescription('');
        setCategory('');
      })
      .catch(error => console.error('Error adding item:', error));
  };

  const deleteItem = (id) => {
    fetch(`${apiUrl}/${id}`, { method: 'DELETE' })
      .then(() => fetchItems()) 
      .catch(error => console.error('Error deleting item:', error));
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <Container>
      <h1>Item Manager</h1>
      
      <Row className="mb-4">
        <Col>
          <Form onSubmit={addItem}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter item name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
              />
            </Form.Group>
            <Form.Group controlId="description" className="mt-2">
              <Form.Label>Description</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter item description" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
              />
            </Form.Group>
            <Form.Group controlId="category" className="mt-2">
              <Form.Label>Category</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter item category" 
                value={category} 
                onChange={(e) => setCategory(e.target.value)} 
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Add Item
            </Button>
          </Form>
        </Col>
      </Row>

      <h3>Items List</h3>
      <Row>
        {items.map((item) => (
          <Col key={item.id} sm={12} md={6} lg={4} className="mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">{item.description}</p>
                <p className="card-text"><strong>Category:</strong> {item.category}</p>
                <Button variant="danger" onClick={() => deleteItem(item.id)}>
                  Delete
                </Button>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;
