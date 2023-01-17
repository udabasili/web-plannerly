describe('Navigation', () => {
	it('should verify home page with header Hr Dashboard', () => {
		cy.visit('http://localhost:3000');
		// cy.get('a[href*="/clients"]').click();
		// cy.url().should('include', 'clients');
		cy.get('h1').contains('Hr Dashboard');
	});
	it('should verify employee page with header Employees and url employees', () => {
		cy.visit('http://localhost:3000');
		cy.get('li').contains('employees').click();
		cy.get('h1').contains('Employees');

		cy.url().should('include', 'employees');
	});
});

export {};
