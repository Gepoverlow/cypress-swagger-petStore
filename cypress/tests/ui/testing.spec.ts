describe("testing describe", ()=>{
    beforeEach(()=>{
        cy.visit("https://petstore.swagger.io/#/pet/findPetsByStatus")
    })

    it("lets see", ()=>{
        expect(true).to.equal(true)
    })
})