/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Cypress {
        interface Chainable {
            grantGeolocationAccess(latitude: number, longitude: number): Chainable<AUTWindow>;
            setGeolocation(latitude: number, longitude: number): Chainable<unknown>;
            assertMapRendersInMode(selector, mode: string): Chainable<unknown>;
            assertMapIsAtLocation(latitude: number, longitude: number);
        }
    }
}

Cypress.Commands.add('assertMapRendersInMode', (selector, mode) => {
    cy.get(`[data-test-map-mode="${mode}"]`).should('exist');
    cy.get(selector, { timeout: 1000 }).should('exist').and('be.visible');
});

Cypress.Commands.add('assertMapIsAtLocation', (latitude, longitude) => {
    cy.get(`[data-test-position-lat^="${latitude}"]`).should('exist');
    cy.get(`[data-test-position-lng^="${longitude}"]`).should('exist');
});

Cypress.Commands.add('grantGeolocationAccess', (latitude, longitude) => {
    return cy.window().then((window) => {
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        window.navigator.geolocation.getCurrentPosition = () => {
            return new Promise<GeolocationPosition>((resolve) => {
                resolve({
                    coords: {
                        latitude: latitude ?? 51.1, // desired latitude
                        longitude: longitude ?? 45.3, // desired longitude
                        accuracy: 0,
                        altitude: null,
                        altitudeAccuracy: null,
                        heading: null,
                        speed: null,
                    },
                    timestamp: Date.now(),
                });
            });
        };
    });
});

Cypress.Commands.add('setGeolocation', (latitude, longitude) => {
    cy.window().then((win) => {
        cy.stub(win.navigator.geolocation, 'getCurrentPosition').callsFake((callback) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-return
            return callback({
                coords: {
                    latitude,
                    longitude,
                    accuracy: 100, // You can specify accuracy as needed
                },
            });
        });
        cy.stub(win.navigator.geolocation, 'watchPosition').callsFake((success, error, options) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            success({
                coords: {
                    latitude,
                    longitude,
                    accuracy: 100, // Adjust accuracy as needed
                },
            });
            // Return a mock ID for the watchPosition call
            return 1;
        });
    });
});

export {};
