const apiUrl = Cypress.env('apiUrl')

describe("Basic CRUD operations", () => {
    beforeEach(() => {
        cy.visit('/')
        cy.window().then(win => {
            // @ts-ignore
            cy.stub(win, 'prompt').returns(win.prompt).as('copyToClipboardPrompt');
        })
    })

    it('should add a new pet to the petStore', () => {
        cy.intercept('POST', `${apiUrl}`).as('adding-pet')

        cy.fixture('newPetData.json').then((fixture) => {
            cy.addPet()
            cy.wait('@adding-pet').then((interception) => {
                expect(interception.response.body).to.deep.eq(fixture)
            })
            cy.get('#operations-pet-addPet').find('.highlight-code').find('.copy-to-clipboard').click()
            cy.get('@copyToClipboardPrompt').should('be.called')
            cy.get('@copyToClipboardPrompt').should(prompt => {
                expect(prompt.args[0][1].replace(/(\r\n|\n|\r)/gm, "").replace(/\s/g, "")).to.equal(JSON.stringify(fixture));
            });

        })

        cy.get('#operations-pet-addPet').find(".response-col_status").should((val) => {
            expect(val).to.contain("200")
        })
    })

    it("should update an existing pet in the petStore by its id", () => {
        cy.intercept('PUT', `${apiUrl}`).as('updating-pet')

        cy.fixture('updatePetData.json').then((fixture) => {
            cy.updatePet()
            cy.wait('@updating-pet').then((interception) => {
                expect(interception.response.body).to.deep.eq(fixture)
            })
            cy.get('#operations-pet-updatePet').find('.highlight-code').find('.copy-to-clipboard').click()
            cy.get('@copyToClipboardPrompt').should('be.called')
            cy.get('@copyToClipboardPrompt').should(prompt => {
                expect(prompt.args[0][1].replace(/(\r\n|\n|\r)/gm, "").replace(/\s/g, "")).to.equal(JSON.stringify(fixture));
            });
        })

        cy.get("#operations-pet-updatePet").find(".response-col_status").should((val) => {
            expect(val).to.contain("200")
        })
    })

    it("should get an existing pet from the petStore by its id", () => {
        cy.intercept('GET', `${apiUrl}/*`).as('getting-pet')
        cy.fixture('updatePetData.json').then((fixture) => {
            cy.request('POST', apiUrl, fixture)
            cy.getPet()
            cy.wait('@getting-pet').then((interception) => {
                expect(interception.response.body).to.deep.eq(fixture)
            })
            cy.get('#operations-pet-getPetById').find('.highlight-code').find('.copy-to-clipboard').click()
            cy.get('@copyToClipboardPrompt').should('be.called')
            cy.get('@copyToClipboardPrompt').should(prompt => {
                expect(prompt.args[0][1].replace(/(\r\n|\n|\r)/gm, "").replace(/\s/g, "")).to.equal(JSON.stringify(fixture));
            });
        })

        cy.get('#operations-pet-getPetById').find('.response-col_status').should((val) => {
            expect(val).to.contain('200')
        })
    })

    it("should delete an existing pet from the petStore by its id", () => {
        cy.intercept('DELETE', `${apiUrl}/*`).as('deleting-pet')

        cy.fixture('updatePetData.json').then((fixture) => {
            cy.request('POST', apiUrl, fixture)
            cy.deletePet()
            cy.wait('@deleting-pet').then((interception) => {
                expect(interception.response.statusCode).to.equal(200)
                expect(interception.response.body.message).to.contain(fixture.id)
            })
            cy.get('#operations-pet-deletePet').find('.highlight-code').find('.copy-to-clipboard').click()
            cy.get('@copyToClipboardPrompt').should('be.called')
            cy.get('@copyToClipboardPrompt').should(prompt => {
                expect(prompt.args[0][1].replace(/(\r\n|\n|\r)/gm, "").replace(/\s/g, "")).to.equal(`{"code":200,"type":"unknown","message":"${fixture.id}"}`);
            });
        })

        cy.get('#operations-pet-deletePet').find('.response-col_status').should((val) => {
            expect(val).to.contain('200')
        })
    })
})