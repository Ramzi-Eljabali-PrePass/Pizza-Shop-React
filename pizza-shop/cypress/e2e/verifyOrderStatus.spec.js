describe('Verify Order Status Updates Dynamically', () => {
    it('Waits for each status update', () => {
      cy.visit('/order-tracking'); // Change this to your actual URL
  
      const statuses = ['Order Received', 'Preparing', 'Baking', 'Ready'];
  
      statuses.forEach((status) => {
        cy.contains('h5', status, { timeout: 120000 }) // Waits for the correct text in <h5>
          .should('be.visible');
      });
    });
  });