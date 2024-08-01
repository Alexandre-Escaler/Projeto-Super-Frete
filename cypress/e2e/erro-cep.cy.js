import { massaDeTeste } from '../fixtures/massaDeTeste.json'

describe('Validar mensagens de erros apresentadas quando os campos "CEP de origem" e "CEP de destino" não são preenchidos', () => {

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

  massaDeTeste.forEach(consulta => {
    it('Preencher os campos sem o cep de origem para receber mensagem de erro', () => {

      cy.get('#originPostcode').clear()
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
      cy.wait(10000)
      cy.contains('CEP de origem é obrigatório').should('be.visible')
    })

  })

  massaDeTeste.forEach(consulta => {
    it('Preencher os campos sem o cep de destino para receber mensagem de erro', () => {

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
      cy.get('#destinationPostcode').clear()
      cy.get('[data-cy="calculator-submit"]').click()
      cy.wait(10000)
      cy.contains('CEP de destino é obrigatório').should('be.visible')
    })

  })

})