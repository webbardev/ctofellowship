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

    it('Textfield only accepts [a-zA-Z0-9], validation will be turned on', () => {
        cy.mount(<TextFieldCrud />);

        cy.get('[data-test-id="textfieldcrud-input"]', { timeout: 500 })
            .clear()
            .type('Hello World!@#$%^&*()_+');

        // 🔴 Check if text was correctly sanitized
        cy.get('[data-test-id="textfieldcrud-input"][data-test-validation="0"]', {
            timeout: 500,
        }).should('have.class', 'border-red-500 text-red-500');

        cy.get('[data-test-id="textfieldcrud-input"]', { timeout: 500 })
            .clear()
            .type('HelloWorld007');

        cy.get('[data-test-id="textfieldcrud-input"][data-test-validation="1"]', {
            timeout: 500,
        }).should('not.have.class', 'border-red-500 text-red-500');
    });
});
