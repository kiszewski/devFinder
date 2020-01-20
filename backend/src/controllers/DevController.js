const axios = require('axios')
const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')
const { findConnections, sendMessage } = require('../websocket')

module.exports = {
    async store(req, res) {
        const { github_username, techs, latitude, longitude } = req.body

        let dev = await Dev.findOne({ github_username })

        if (!dev) {
            //chamando api do github
            const response = await axios.get(`https://api.github.com/users/${github_username}`)

            const { name = login, avatar_url, bio } = response.data

            const techsArray = parseStringAsArray(techs)

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }

            dev = await Dev.create({
                github_username,
                name,
                techs: techsArray,
                avatar_url,
                bio,
                location
            })

            //filtrar as conexões que estao há no maximo 10km de distancia
            // e que o novo dev tenha uma das tecnologias filtradas

            const sendSocketMessageTo = findConnections(
                { latitude, longitude },
                techsArray
            )

            sendMessage(sendSocketMessageTo, 'new-dev', dev)
        }
        return res.json(dev)
    },

    async index(req, res) {
        const devs = await Dev.find()

        return res.json(devs)
    }
}