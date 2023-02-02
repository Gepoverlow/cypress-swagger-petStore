const apiUrl = Cypress.env('apiUrl')

describe("Basic CRUD operations", () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it("should add a new pet to the petStore", () => {
        cy.intercept('POST', `${apiUrl}`).as('adding-pet')
        cy.addPet()

        cy.fixture('newPetData.json').then((fixture) => {
            cy.wait('@adding-pet').then((interception) => {
                expect(interception.response.body).to.deep.eq(fixture)
            })
        })

        cy.get("#operations-pet-addPet").find(".response-col_status").should((val) => {
            expect(val).to.contain("200")
        })
    })

    it("should update an existing pet in the petStore by its id", () => {
        cy.intercept('PUT', `${apiUrl}`).as('updating-pet')
        cy.updatePet()

        cy.fixture('updatePetData.json').then((fixture) => {
            cy.wait('@updating-pet').then((interception) => {
                expect(interception.response.body).to.deep.eq(fixture)
            })
        })

        cy.get("#operations-pet-updatePet").find(".response-col_status").should((val) => {
            expect(val).to.contain("200")
        })
    })

    it("should get an existing pet from the petStore by its id", () => {
        cy.intercept('GET', `${apiUrl}/*`).as('getting-pet')
        cy.getPet()

        cy.fixture('updatePetData.json').then((fixture) => {
            cy.wait('@getting-pet').then((interception) => {
                expect(interception.response.body).to.deep.eq(fixture)
            })
        })

        cy.get('#operations-pet-getPetById').find('.response-col_status').should((val) => {
            expect(val).to.contain('200')
        })
    })

    it("should delete an existing pet from the petStore by its id", () => {
        cy.intercept('DELETE', `${apiUrl}/*`).as('deleting-pet')
        cy.deletePet()

        cy.fixture('updatePetData.json').then((fixture) => {
            cy.wait('@deleting-pet').then((interception) => {
                expect(interception.response.statusCode).to.equal(200)
                expect(interception.response.body.message).to.contain(fixture.id)
            })
        })

        cy.get('#operations-pet-deletePet').find('.response-col_status').should((val) => {
            expect(val).to.contain('200')
        })
    })
})