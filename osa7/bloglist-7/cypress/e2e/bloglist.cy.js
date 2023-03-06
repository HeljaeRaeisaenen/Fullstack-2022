describe('Bloglist ', function () {
	const user = {
		username: 'e2e_tester',
		name: 'Testaaja',
		password: '123abc',
	}

	beforeEach(function () {
		cy.request('POST', `${Cypress.env('BACKEND')}/tests/reset`)

		cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
		cy.visit('')
	})

	it('login form is shown on front page', function () {
		cy.visit('')
		cy.contains('bloglist')
		cy.contains('login')
	})

	describe('Login success', function () {
		it('succeeds with correct credentials', function () {
			cy.contains('login').click()
			cy.get('#username').type('e2e_tester')
			cy.get('#password').type('123abc')
			cy.get('#login-button').click()

			cy.contains('Testaaja logged in')
		})

		it('fails with wrong credentials', function () {
			cy.contains('login').click()
			cy.get('#username').type('my_name')
			cy.get('#password').type('epicpswd')
			cy.get('#login-button').click()

			cy.get('.error').contains('wrong credentials')
		})
	})

	describe('when logged in', function () {
		beforeEach(function () {
			cy.login({ username: 'e2e_tester', password: '123abc' })
			cy.createBlog({
				title: 'testing by cypress',
				author: 'cypress',
				url: 'cy.com',
				likes: '3',
				user: user,
			})
			cy.createBlog({
				title: 'the other blog',
				author: 'cypress',
				url: 'cy.com',
				likes: '0',
				user: user,
			})
			cy.createBlog({
				title: 'uusi testamentti',
				author: 'jumala',
				url: 'bible.com',
				likes: '69',
				user: user,
			})
		})

		it('a new blog can be added', function () {
			cy.contains('add new blog').click()
			cy.get('#title').type('nondefault blog')
			cy.get('#author').type('me')
			cy.get('#url').type('me.com')
			cy.get('#likes').type('3')
			cy.contains('save').click()
			cy.contains('nondefault blog by me')
		})

		it('likes can be added', function () {
			cy.contains('testing by cypress').contains('view').click()
			cy.contains('3 likes').contains('button', 'like').click()

			cy.contains('4 likes')
		})

		it('blog can be removed by user', function () {
			cy.contains('the other blog').contains('view').click()
			cy.contains('the other blog').contains('remove').click()

			cy.contains('the other blog').should('not.exist')
		})

		it.only('only the right user sees remove button', function () {
			const user = { username: 'toinen', password: '0980' }
			cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
			cy.login(user)

			cy.contains('the other blog').contains('view').click()
			cy.contains('the other blog').contains('remove').should('not.exist')
		})

		it('blogs are in descending like order', function () {
			pass
		})
	})
})
