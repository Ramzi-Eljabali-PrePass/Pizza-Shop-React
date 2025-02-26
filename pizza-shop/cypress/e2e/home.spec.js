describe('Home Page', () => {
    it('should load the React app and display a welcome message', () => {
      cy.visit('http://localhost:5174');  
      cy.contains('Delicious pizzas, made fresh just for you! ')
      
    });
  });git 