import React from 'react';
import { TextFieldCrud } from '../TextFieldCrud';

describe('<TextFieldCrud />', () => {
    it('Textfields renders and is type-able and Button is not disabled', () => {
        cy.mount(<TextFieldCrud />);

        cy.get('[data-test-id="textfieldcrud-input"]', { timeout: 500 })
            .scrollIntoView()
            .type('Hello World');

        // Check if text Hello World is really typed
        cy.get('[data-test-id="textfieldcrud-input"]', { timeout: 500 }).should(
            'have.value',
            'Hello World'
        );

        cy.get('[data-test-id="textfieldcrud-button"]', { timeout: 500 })
            .should('not.be.disabled')
            .and('be.visible');
    });
});
