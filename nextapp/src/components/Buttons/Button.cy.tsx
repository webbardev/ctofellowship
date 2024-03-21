import React from 'react';
import { Button } from './Button';
import '../../../styles/globals.scss';

describe('<Button />', () => {
    it('renders onClick Variant', () => {
        // see: https://on.cypress.io/mounting-react
        cy.mount(
            <Button onClick={() => {}} testId="test-button">
                Hello onClick!
            </Button>
        );

        cy.get('[data-test-id="test-button"]').should('exist');
    });

    it('renders href Variant', () => {
        // see: https://on.cypress.io/mounting-react
        cy.mount(
            <Button href="/" testId="test-button">
                Hello href;
            </Button>
        );

        cy.get('[data-test-id="test-button"]').should('exist');
    });
});
