describe('Pizza Shop - Add to Cart and verify the quantity is 4', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should add all four pizzas to the cart', () => {
    const pizzas = ['Vegetarian', 'Pepperoni', 'Cheese', 'Hawaiian'];
    const pizzaCount = pizzas.length;
    pizzas.forEach((pizza) => {
      cy.contains('.MuiTypography-h5', pizza) // Find pizza name in <div class="MuiTypography-h5">
        .should('be.visible')
        .parents('.MuiCard-root') // Move up to the entire card container
        .find('.MuiCardActions-root') // Locate the actions section where the button exists
        .contains('button', 'Add to Order') // Ensure it finds the button
        .click();
    });

    // Verify 4 items are added to the cart (update selector if needed)
    cy.wait(3000);
    cy.get('p.MuiTypography-root')
  .each(($el) => {
    const text = $el.text(); // Get the text content of the <p> element
    if (text.includes('Quantity:')) { // Check if it contains "Quantity:"
      const quantity = parseInt(text.replace('Quantity: ', '').trim(), 10); // Extract the number after "Quantity:"
      expect(quantity).to.eq(pizzaCount); // Verify that the quantity is 1 (or change the value as needed)
    }
  });
   
  cy.get('span.MuiBadge-badge')  // click on the cart button
    .click();

  //Verify the checkout button is available and click on it 
  cy.get('button[type="button"]')  // Target the button with type="button"
  .contains('Checkout')
  .should('be.visible')
  .click();

  //verify new test box opened enter your name and you are able to add your name and click on confrim order
  cy.get('h2.MuiTypography-root')  // Selector for the <h2> element
  .contains('Enter Your Name')  // Ensure it contains the text "Enter Your Name"
  .should('be.visible');  // Ensure the dialog is visible on the page

  });
});