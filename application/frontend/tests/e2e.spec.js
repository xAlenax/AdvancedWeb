describe('CRUD operations', () => {
    it('Should load the page and add an item', () => {
      cy.visit('http://localhost:3001'); // Adjust if frontend runs on a different port
  
      // Fill in the form
      cy.get('input[id="name"]').type('Test Item');
      cy.get('input[id="description"]').type('Test Description');
      cy.get('input[id="category"]').type('Test Category');
  
      // Intercept the POST request to check the response
      cy.intercept('POST', 'http://localhost:3000/items').as('postItem');
      cy.get('button').contains('Add').click(); // Click the "Add" button
  
      // Wait for the POST request to complete and log the response
      cy.wait('@postItem').then((interception) => {
        console.log(interception); // Logs the POST response
      });
  
      // Ensure the item is added and visible
      cy.contains('Test Item').should('be.visible');
      cy.contains('Test Description').should('be.visible');
      cy.contains('Test Category').should('be.visible');
    });
  });
  