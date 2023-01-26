const apiKey = Cypress.env('apiKey')

Cypress.Commands.add("addPet", () => {
    cy.get('#operations-pet-addPet').click()
    cy.contains('Try it out').click()
    cy.fixture('newPetData.json').then((json) => {
        cy.get('#operations-pet-addPet').find('.body-param__text').invoke('val', '').type(JSON.stringify(json), {
            parseSpecialCharSequences: false,
            delay: 0,
            })
    })
    cy.get('#operations-pet-addPet').find('.execute-wrapper').click()
});

Cypress.Commands.add('updatePet', () => {
    cy.get('#operations-pet-updatePetWithForm').click()
    cy.contains('Try it out').click()
    cy.fixture('newPetData.json').then((json) => {
        cy.get('#operations-pet-updatePetWithForm').find('input[placeholder=petId]').type(json.id)
    })
    cy.fixture('updatePetData.json').then((json) => {
        cy.get('#operations-pet-updatePetWithForm').find('input[placeholder=name]').type(json.name)
        cy.get('#operations-pet-updatePetWithForm').find('input[placeholder=status]').type(json.status)
    })
    cy.get('#operations-pet-updatePetWithForm').find('.execute-wrapper').click()
})

Cypress.Commands.add('getPet', () => {
    cy.get('#operations-pet-getPetById').click()
    cy.contains('Try it out').click()
    cy.fixture('newPetData.json').then((json) => {
        cy.get('#operations-pet-getPetById').find('input[placeholder=petId]').type(json.id)
    })
    cy.get('#operations-pet-getPetById').find('.execute-wrapper').click()
})

Cypress.Commands.add("deletePet", () => {
    cy.get('#operations-pet-deletePet').click()
    cy.contains('Try it out').click()
    cy.get('#operations-pet-deletePet').find('input[placeholder=api_key]').type(apiKey)
    cy.fixture('newPetData.json').then((json) => {
        cy.get('#operations-pet-deletePet').find('input[placeholder=petId]').type(json.id)
    })
    cy.get('#operations-pet-deletePet').find('.execute-wrapper').click()
});






