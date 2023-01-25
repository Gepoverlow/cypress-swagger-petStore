const apiUrl = Cypress.env("apiUrl");

const newPetJson : string = '{\n' +
    '"id": 1337,\n' +
    '  "category": {\n' +
    '    "id": 1,\n' +
    '    "name": "Dachshund"\n' +
    '  },\n' +
    '  "name": "Toffy",\n' +
    '  "photoUrls": [\n' +
    '    "string"\n' +
    '  ],\n' +
    '  "tags": [\n' +
    '    {\n' +
    '      "id": 1,\n' +
    '      "name": "Playful"\n' +
    '    }\n' +
    '  ],\n' +
    '  "status": "available"\n' +
    '}'

describe("Basic CRUD operations", () => {
    beforeEach(() => {
        cy.visit(apiUrl)
    })

    it("should add a new pet to the petStore", () => {
        cy.get('#operations-pet-addPet').click()
        cy.contains("Try it out").click()
        cy.get(".body-param").find(".body-param__text").invoke('val', newPetJson)
        cy.wait(5000)
    })

    it("should update an existing pet in the petStore", () => {
        cy.get('#operations-pet-updatePet').click()
        cy.contains("Try it out").click()
        cy.get(".body-param").find(".body-param__text").invoke('val', 'hello')
        cy.wait(5000)
    })

    it("should get a pet from the petStore by its id", () => {
        cy.get('#operations-pet-getPetById').click()
        cy.contains("Try it out").click()
    })

    it("should delete an existing pet from the petStore", () => {
        cy.get('#operations-pet-deletePet').click()
        cy.contains("Try it out").click()
    })
})