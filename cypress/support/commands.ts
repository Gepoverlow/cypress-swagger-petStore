Cypress.Commands.add("addNewPet", () => {

    cy.get('#operations-pet-addPet').click()
    cy.contains("Try it out").click()
    cy.fixture('newPetData.json').then((json) => {
        cy.get(".body-param").find(".body-param__text").invoke('val', JSON.stringify(json))
    })

});


