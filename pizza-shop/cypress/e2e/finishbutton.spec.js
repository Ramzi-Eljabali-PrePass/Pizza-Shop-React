describe('FInishButton', () => {
    it('should have finish button and clicking on it should redirect to new url', () => {
      cy.visit('http://localhost:5174');  
      cy.contains('button','Finish').should('be.visible');  
      cy.contains('button','Finish').click();      
    });
  });