describe('Navigation', () => {
	it('should verify home page with header Hr Dashboard', () => {
		cy.visit('http://localhost:3000');
		// cy.get('a[href*="/clients"]').click();
		// cy.url().should('include', 'clients');
		cy.get('h1').contains('Hr Dashboard');
		cy.get('li').contains('clients').click();
		cy.url({
			timeout: 600000,
		}).should('include', 'clients');
	});
});

export {};
