'use strict'

const Imovel = require('../../Models/Imovel')


const imovel = use ('App/Models/Imovel')

class ImovelController {

  async index ({ request }) {

    const { latitude, longitude } = request.all()
                                    
    const imoveis = await Imovel.query().proximidade( latitude, longitude, 5000 ).fetch() 

    return imoveis;
  }

  async store ({ auth, request, response }) {

    const data = request.only([
          'descricao',
          'endereco',
          'valor', 
          'latitude',
          'longitude'
    ])

    data.user_id = auth.user.id 

    const imovel = await Imovel.create(data)
    return imovel;
  }

  async show ({ params }) { 
    const imovel = await Imovel.findOrFail(params.id) 
    return imovel;
  }

  async update ({ params, request, response }) {
    const imovel = await Imovel.findOrFail(params.id)

    const data = request.only([
      'descricao',
      'endereco',
      'valor', 
      'latitude',
      'longitude'
    ])

    imovel.merge(data) 
    await imovel.save() 
    return imovel;

  }

  async destroy ({ auth, params, response }) {
    const imovel = await Imovel.findOrFail(params.id)

    if (imovel.user_id !== auth.user.id) { 
        return response.status(401).send({ error: 'Você não tem permissão!' })
    }
    await imovel.delete()
  }
}

module.exports = ImovelController
