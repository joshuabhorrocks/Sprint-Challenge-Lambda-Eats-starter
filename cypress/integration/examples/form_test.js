describe("Testing the order form", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/pizza");
    })
    it("input name and fill out order", () => {
        cy.get('input[name="name"]')
        .type("Bob")
        .should("have.value", "Bob");
        cy.get('#pieSize')
        .select('14"')
        .should("have.value", "14");
        cy.get('.topPep > input')
        .check()
        .should("have.value", "on");
        // cy.get('.topSau > input')
        // .check()
        // .should("have.value", "on");
        cy.get('.topBac > input')
        .check()
        .should("have.value", "on");
        cy.get('.topChe > input')
        .check()
        .should("have.value", "on");
        cy.get("button")
        .click()
    })
})