'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Imagem extends Model {

    imovel(){
        return this.belongsTo('App/Models/Imovel') 
        // cada imagem pertemce a um imovel
    }
}

module.exports = Imagem
