const apiUrl = Cypress.env('apiUrl')

describe("Basic CRUD operations", () => {
    beforeEach(() => {
        cy.visit(apiUrl)
        cy.addPet()
    })

    it("should add a new pet to the petStore", () => {
        cy.get("#operations-pet-addPet").find(".response-col_status").should((val) => {
            expect(val).to.contain("200")
        })
    })

    it("should update an existing pet in the petStore by its id", () => {
        cy.updatePet()
        cy.get("#operations-pet-updatePetWithForm").find(".response-col_status").should((val) => {
            expect(val).to.contain("200")
        })
    })

    it("should get an existing pet from the petStore by its id", () => {
        cy.getPet()
        cy.get('#operations-pet-getPetById').find('.response-col_status').should((val) => {
            expect(val).to.contain('200')
        })
    })

    it("should delete an existing pet from the petStore by its id", () => {
        cy.deletePet()
        cy.get('#operations-pet-deletePet').find('.response-col_status').should((val) => {
            expect(val).to.contain('200')
        })
    })
})