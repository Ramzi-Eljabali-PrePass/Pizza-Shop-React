describe('Home Page', () => {
    it('should load the React app and display a welcome message', () => {
      cy.visit('http://localhost:5173');  // Ensure this matches your local dev URL
      cy.contains('Welcome');  // Adjust based on what your app shows
    });
  });