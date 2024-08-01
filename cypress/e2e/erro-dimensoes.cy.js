import { dadosIncorretos } from '../fixtures/dadosIncorretos.json'

describe('Acessar página do Superfrete para calcular frete', () => {

  beforeEach(() => {
    cy.viewport(1366, 768)
    cy.visit('https://superfrete.com')
    cy.get('.header__button-col > .header__button')
    .invoke('attr', 'target', '_self');
    cy.get('.header__button-col > .header__button').click()
    cy.wait(10000)
    cy.clearCookies()
    cy.clearLocalStorage()
    cy.contains('Crie ou entre na sua conta').should('be.visible')
  })

  dadosIncorretos.forEach(consulta => {
    it('Preencher os campos para efetuar calculo do frete', () => {

      cy.get('#originPostcode').clear().type(consulta.cepOrigem)
      cy.get('#originPostcode').should('have.value', consulta.cepOrigem)
      cy.get('#object_format').click()
      cy.get('.Mui-selected').click()
      cy.get('#object_format').should('contain', consulta.formato)
      cy.get('#weight').click()
      cy.contains(consulta.peso).click()
      cy.get('#weight').should('contain', consulta.peso)
      cy.get('#packageHeight').clear().type(consulta.altura)
      cy.get('#packageHeight').should('have.value', consulta.altura)
      cy.get('#packageWidth').clear().type(consulta.largura)
      cy.get('#packageWidth').should('have.value', consulta.largura)
      cy.get('#packageDepth').clear().type(consulta.comprimento)
      cy.get('#packageDepth').should('have.value', consulta.comprimento)
      cy.get('#destinationPostcode').clear().type(consulta.cepDestino)
      cy.get('#destinationPostcode').should('have.value', consulta.cepDestino)
      cy.get('[data-cy="calculator-submit"]').click()
      cy.contains('Altura mínima 0.4 cm.').should('be.visible')
      cy.contains('Largura mínima 8 cm.').should('be.visible')
      cy.contains('Comprimento mínimo 13 cm.').should('be.visible')
    })

  })

})