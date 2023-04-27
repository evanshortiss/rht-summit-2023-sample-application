'use strict'

const test = require('node:test')
const yaml = require('yamljs')
const assert = require('assert')
const { join } = require('path')

test('Image URLs in ConfigMap resolve to 200 OK responses with image content-type', async (t) => {
  const { data } = yaml.load(join(__dirname, '../k8s/config-map.yaml'))
  const images = JSON.parse(data['images.json'])


  const fetchies = images.map((url) => {
    return t.test(`URL: ${url}`, () => {
      return fetch(url).then(res => {
        const statusCode = res.status
        const contentType = res.headers.get('content-type')

        assert(
          statusCode === 200,
          `Expected 200 OK but received ${res.status}`
        )
        
        assert(
          contentType.includes('image'),
          `Expected content-type header to contain "image", but it was ${contentType}`
        )
      })
    })
  })

  return Promise.all(fetchies)
})