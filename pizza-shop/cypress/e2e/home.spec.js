describe('Home Page', () => {
    it('should load the React app and display a welcome message', () => {
      cy.visit('/');  
      cy.contains("Jared's Pizza Shop")
      
    });
  });