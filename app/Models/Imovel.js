'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Database = use('Database')

class Imovel extends Model {

           
    static scopeProximidade(query, latitude, longitude, distancia){ // 6371 faz o calculo da distancia em km
            const haversine = `(6371 * acos(cos(radians(${latitude})) 
                                * cos(radians(latitude))
                                * cos(radians(longitude)
                                - radians(${longitude}))
                                + sin(radians(${latitude}))
                                * sin(radians(latitude))))`
                                // Código  para realizar o calculo de geolocalização

            return query
                        .select('*', Database.raw(`${haversine} as distancia`)) 
                        .whereRaw(`${haversine} < ${distancia}`) 
    }
  
    user(){
            return this.belongsTo('App/Models/User') 

    }
    fotos(){
        return this.hasMany('App/Models/Imagem') 
    
    }

}


module.exports = Imovel
