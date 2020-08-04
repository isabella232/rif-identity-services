const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const debug = require('debug')('rif-id:services:tinyQr')
const crypto = require('crypto')

function tinyQr(port, serviceUrl) {
  const app = express()
  app.use(cors())
  app.use(bodyParser.json())

  let presentations = {};

  app.post('/presentation', async function(req, res) {
    const { jwt } = req.body

    debug(`Incoming presentation JWT ${jwt}`)

    const id = (await crypto.randomBytes(4)).toString('hex')
    const pwd = (await crypto.randomBytes(32)).toString('hex')

    const presentation = { jwt, pwd }

    presentations[id] = presentation;

    const response = {
      url: `${serviceUrl}/jwt/${id}`,
      pwd
    }

    res.json(response).end()
  })

  app.get('/jwt/:id', function(req, res) {
    const { id } = req.params
    const { pwd } = req.body

    debug(`Incoming JWT request with id ${id}`)

    const presentation = presentations[id]

    if (presentation && presentation.pwd == pwd) {
      res.json({ jwt: presentation.jwt }).end()
    } else {
      res.status(404).end()
    }
  })

  app.listen(port, () => debug(`Tiny QR service started on port ${port}`))
}

module.exports = tinyQr;