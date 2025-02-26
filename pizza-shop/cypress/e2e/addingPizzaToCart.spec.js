describe('Pizza Shop - Add to Cart', () => {
  beforeEach(() => {
    // Visit the pizza shop homepage before each test
    cy.visit('/');
  });

  it('should add all four pizzas to the cart', () => {
    // Array of expected pizza names
    const pizzas = ['Vegetarian', 'Pepperoni', 'Hawaiian', 'Cheese'];

    // Check if all pizza names are visible
    pizzas.forEach((pizza) => {
      cy.contains(pizza).should('be.visible');
    });

    // Click "Add to Cart" button for each pizza
    cy.contains('Vegetarian').closest().contains('button','ADD TO ORDER').click();
    cy.contains('Pepperoni').closest().contains('ADD TO ORDER').click();
    cy.contains('Cheese').closest().contains('ADD TO ORDER').click();
    cy.contains('Hawaiian').closest().contains('ADD TO ORDER').click();

    // Verify that 4 items are in the cart
   // cy.get('.cart-item').should('have.length', 4); // Adjust the selector if needed

    // Optional: Check if cart total is updated
    //cy.get('.cart-total').should('not.have.text', '$0.00'); // Change selector if needed
  });
});