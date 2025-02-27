describe('Verifythe end to end test', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.contains("Jared's Pizza Shop")
  });

  it('should add all four pizzas to the cart', () => {
    const pizzas = ['Vegetarian', 'Pepperoni', 'Cheese', 'Hawaiian'];
    const pizzaCount = pizzas.length;
    pizzas.forEach((pizza) => {
      cy.contains('.MuiTypography-h5', pizza) 
        .should('be.visible')
        .parents('.MuiCard-root') 
        .find('.MuiCardActions-root') 
        .contains('button', 'Add to Order') 
        .click();
    });

    // Verify 4 items are added to the cart (update selector if needed)
    cy.wait(3000);
    cy.get('p.MuiTypography-root')
  .each(($el) => {
    const text = $el.text(); 
    if (text.includes('Quantity:')) { 
      const quantity = parseInt(text.replace('Quantity: ', '').trim(), 10); 
      expect(quantity).to.eq(pizzaCount); 
    }
  });
   
  //Verify if we are able to click on the cart button
  cy.get('span.MuiBadge-badge')  
    .click();

  //Verify the checkout button is available and click on it 
  cy.get('button[type="button"]')  
  .contains('Checkout')
  .should('be.visible')
  .click();
const customername='aeg'
  //verify new test box opened enter your name and you are able to add your name and click on confrim order
  cy.get('h2.MuiTypography-root') 
  .contains('Enter Your Name') 
  .should('be.visible'); 
  cy.get('input.MuiInputBase-input') 
  .should('be.visible')
  .type(customername);
  cy.get('button')
    .contains('Confirm Order')  // Find the button with the text "Confirm Order"
    .should('be.visible')  // Ensure the button is visible
    .click();

    //Verfiy clicking on confirm order takes us to new url for order -tracking

    cy.url().should('eq', 'http://localhost:5174/order-tracking');
cy.wait(40000)

  cy.contains('Ready')
    .parent()
    .contains(customername)
    .should('exist');
});
});

