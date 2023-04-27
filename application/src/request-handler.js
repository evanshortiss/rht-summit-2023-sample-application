'use strict'

const { readFileSync } = require('fs')
const { join } = require('path')

module.exports = function getRequestHandler(images) {
  const html = readFileSync(join(__dirname, 'index.html'), 'utf8')
  
  /**
   * Handler for incoming requests
   * @param {IncomingMessage} req 
   * @param {ServerResponse} res 
   */
  return function requestHandler (req, res) {
    if (req.url !== '/') {
      res
        .writeHead(301, {
          location: '/'
        })
        .end();
    } else {
      const imageIdx = Math.round(Math.random() * (images.length - 1))
      
      res
        .setHeader('content-type', 'text/html; charset=utf-8')
        .end(html.replace('{{imageUrl}}', images[imageIdx]))
    }
  }
}