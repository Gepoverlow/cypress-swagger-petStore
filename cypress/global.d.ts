/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable<Subject = any> {
        addPet(): Chainable<any>;
        updatePet(): Chainable<any>
        getPet(): Chainable<any>
        deletePet(): Chainable<any>
        assertValueCopiedToClipboard(text): Chainable<any>
    }
    interface JQuery {

    }

    interface SinonStub<T> {

    }
}
