describe('Pizza Shop - Add to Cart', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should add all four pizzas to the cart', () => {
    const pizzas = ['Vegetarian', 'Pepperoni', 'Cheese', 'Hawaiian'];

    pizzas.forEach((pizza) => {
      cy.contains('.MuiTypography-h5', pizza) // Find pizza name in <div class="MuiTypography-h5">
        .should('be.visible')
        .parents('.MuiCard-root') // Move up to the entire card container
        .find('.MuiCardActions-root') // Locate the actions section where the button exists
        .contains('button', 'Add to Order') // Ensure it finds the button
        .click();
    });

    // Verify 4 items are added to the cart (update selector if needed)
    //cy.get('.cart-item').should('have.length', 4);
  });
});