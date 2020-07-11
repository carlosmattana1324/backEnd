'use strict'

const Route = use('Route')

Route.resource('/imoveis', 'ImovelController').apiOnly().middleware('auth') 
Route.post('/usuarios', 'UserController.create').middleware()
Route.post('/login', 'SessionController.create').middleware()