const connection    = require('../database/connection');

module.exports      = {
    async create (request, response) {
        const { id } = request.body;
        console.log( "caiu no request de login com o id " + id );
        const ong = await connection('ongs')
            .select(['name', 'id'])
            .where('id', id)
            .first();

        if (!ong) { 
            return response.status(400).json(
                { error: 'No ONG found with this ID!' }
            );
        }
        
        return response.json(ong.name);
    }
};