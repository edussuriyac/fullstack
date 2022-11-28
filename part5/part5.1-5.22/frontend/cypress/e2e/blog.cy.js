describe('Blog app', function() {

    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'Matti Luukkainen',
            username: 'mluukkai',
            password: 'salainen'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user) 
        cy.visit('http://localhost:3000')
        cy.contains('login')
        cy.get('#username').type('mluukkai')
        cy.get('#password').type('salainen')
        cy.get('#login-button').click()
    })

    it('a new blog can be created', function() {
        cy.contains('new note').click()
        cy.get('#title').type('test blog')
        cy.get('#author').type('test author')
        cy.get('#url').type('test url')
        cy.contains('create').click()

        cy.contains('a new blog test blog by test author added')
        cy.contains('test blog')
    })

    it('a blog can be edited', function() {
        cy.contains('new note').click()
        cy.get('#title').type('test blog')
        cy.get('#author').type('test author')
        cy.get('#url').type('test url')
        cy.contains('create').click()

        cy.contains('a new blog test blog by test author added')
        cy.contains('test blog')

        cy.contains('show').click()
        cy.contains('likes 0')
        cy.contains('like').click()
        cy.contains('likes 1')


    })
    it('a blog can be deleted', function() {
        cy.contains('new note').click()
        cy.get('#title').type('test blog')
        cy.get('#author').type('test author')
        cy.get('#url').type('test url')
        cy.contains('create').click()

        cy.contains('a new blog test blog by test author added')
        cy.contains('test blog')

        cy.contains('show').click()
        cy.contains('likes 0')
        cy.contains('remove').click()
        cy.get('test blog').should('not.exist')

    })

    it('blog list order', function() {
        cy.contains('new note').click()
        cy.get('#title').type('test blog')
        cy.get('#author').type('test author')
        cy.get('#url').type('test url')
        cy.contains('create').click()

        cy.contains('a new blog test blog by test author added')
        cy.contains('test blog')

        cy.contains('show').click()
        cy.contains('likes 0')
        cy.contains('like').click()
        cy.contains('likes 1')

        cy.contains('new note').click()
        cy.get('#title').type('test blog 2')
        cy.get('#author').type('test author 2')
        cy.get('#url').type('test url 2')
        cy.contains('create').click()

        // cy.contains('a new blog test blog by test author added')
        cy.contains('test blog 2')

        cy.get('.blog').eq(0).should('contain', 'test blog')
        cy.get('.blog').eq(1).should('contain', 'test blog 2')

    })
  
  

})



