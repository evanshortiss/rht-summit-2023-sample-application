'use strict'

const log = require('barelog')

/**
 * Reads the images.json file, and verifies it contains a flat array of URLs
 * @param {string} filepath
 * @returns {string[]}
 */
module.exports = function loadImages (filepath) {
  log(`loading images from ${filepath}`)

  const images = require(filepath)

  if (!Array.isArray(images)) {
    throw new Error('Uh oh! Looks like the images.json file wasn\'t a flat array of URLs')
  }

  const errors = images
    .map((url, idx) => {
      if (typeof url !== 'string' || isValidUrl(url) === false) {
        return `Uh oh! The images.json entry at index ${idx} ("${url}") is not a valid entry. It must be a URL string, e.g "http://acme.com/some-image.jpg".`
      }
    })
    .filter((e) => e instanceof Error)

  if (errors.length !== 0) {
    throw new Error(errors.join(' '))
  }

  log(`successfully loaded images from ${filepath}: `, images)

  return images
}

/**
 * Determines if the input string is a valid URL
 * @param {string} mayBeUrl 
 */
function isValidUrl (mayBeUrl) {
  try {
    return new URL(mayBeUrl) ? true : false
  } catch (e) {
    return false
  }
}
