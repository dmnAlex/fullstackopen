/// <reference types="Cypress" />

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Alexey',
      username: 'dmnAlex',
      password: '32167'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('login in to application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('dmnAlex')
      cy.get('#password').type('32167')
      cy.get('#login-button').click()

      cy.contains('Alexey logged-in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('dmnAlex')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.contains('Wrong credentials')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'dmnAlex', password: '32167' })
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('Some title')
      cy.get('#author').type('Some author')
      cy.get('#url').type('Some url')
      cy.get('#create').click()

      cy.contains('Some title')
    })

    describe('and one blog already exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Existing title', author: 'Existing author', url: 'Existing url'
        })
      })

      it('user can like a blog', function () {
        cy.contains('view').click()
        cy.contains('like').click()
        cy.contains('1')
      })

      it('user who created a blog can delete it', function () {
        cy.contains('view').click()
        cy.contains('remove').click()

        cy.get('html').should('not.contain', 'Existing title')
      })

      it('another user can not ', function () {
        const user2 = {
          name: 'Bob',
          username: 'doSomething',
          password: '911'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user2)
        cy.contains('logout').click()

        cy.get('#username').type('doSomething')
        cy.get('#password').type('911')
        cy.get('#login-button').click()

        cy.contains('view').click()
        cy.contains('remove').should('not.be.visible')
      })

      it('blogs are ordered according to likes', function () {
        cy.createBlog({
          title: 'Existing title 2', author: 'Existing author 2', url: 'Existing url 2', likes: 10,
        })
        cy.createBlog({
          title: 'Existing title 3', author: 'Existing author 3', url: 'Existing url 3', likes: 20,
        })
        cy.createBlog({
          title: 'Existing title 4', author: 'Existing author 4', url: 'Existing url 4', likes: 30,
        })

        cy.get('.blog').then(blogs => {
          //const x = blogs.map((i, blog) => blog.textContent)
          const array = [...blogs.map((i, blog) => Number(blog.textContent.match(/\d+(?=\slike)/)))]
          const result = array.reduce((a, c, i) => a && i > 0 ? c < array[i - 1] : true, true)
          expect(result).to.true
        })
      })
    })
  })
})