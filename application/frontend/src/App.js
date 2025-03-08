import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Spinner } from 'react-bootstrap';

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false); // Added loading state
  
  const apiUrl = 'http://localhost:3000/items';

  const fetchItems = () => {
    setLoading(true);  // Start loading state
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched items:', data);  
        setItems(data);  // Update state with fetched items
        setLoading(false);  // Stop loading state
      })
      .catch(error => {
        console.error('Error fetching items:', error);
        setLoading(false);  // Stop loading state on error
      });
  };

  const addItem = (e) => {
    e.preventDefault();

    const newItem = { name, description, category };

    // Posting the new item to the backend
    fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem),
    })
      .then(response => response.json())
      .then((data) => {
        console.log('Added new item:', data);
        setItems((prevItems) => [...prevItems, data]); // Directly add the new item to the state
        setName('');  
        setDescription('');
        setCategory('');
      })
      .catch(error => console.error('Error adding item:', error));
  };

  const deleteItem = (id) => {
    fetch(`${apiUrl}/${id}`, { method: 'DELETE' })
      .then(() => fetchItems())  // Refresh the items after deletion
      .catch(error => console.error('Error deleting item:', error));
  };

  useEffect(() => {
    fetchItems();  // Fetch items when the component mounts
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
      {loading ? (
        <Spinner animation="border" variant="primary" />  // Show a spinner while loading
      ) : (
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
      )}
    </Container>
  );
}

export default App;
