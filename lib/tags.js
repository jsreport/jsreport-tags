'use strict'

var shortid = require('shortid')

module.exports = function (reporter, definition) {
  reporter.options.tags = reporter.options.tags || definition.options

  // define entity Tag
  reporter.documentStore.registerEntityType('TagType', {
    _id: { type: 'Edm.String', key: true },
    name: { type: 'Edm.String', publicKey: true },
    shortid: { type: 'Edm.String' },
    color: { type: 'Edm.String' },
    modificationDate: { type: 'Edm.DateTimeOffset' }
  })

  // expose it as an entity set
  reporter.documentStore.registerEntitySet('tags', {
    entityType: 'jsreport.TagType',
    humanReadableKey: 'shortid',
    splitIntoDirectories: true
  })

  // after document store initialization, extend entity types with tag information
  // (just template entity for now, later we should iterate over all entities)
  reporter.documentStore.on('before-init', function (documentStore) {
    reporter.documentStore.model.entityTypes['TemplateType'].tags = {
      type: 'Collection(Edm.String)'
    }
  })

  // initialize operations after the extension has been loaded
  reporter.initializeListeners.add(definition.name, function () {
    var col = reporter.documentStore.collection('tags')
    var HEX_COLOR_REGEXP = /^#[0-9A-F]{6}$/i

    col.beforeInsertListeners.add('tags', function (doc) {
      doc.shortid = doc.shortid || shortid.generate()
      doc.modificationDate = new Date()

      if (!doc.color) {
        throw new Error('color field cannot be empty')
      }

      if (!HEX_COLOR_REGEXP.test(doc.color)) {
        throw new Error('color field must have a valid hex value')
      }
    })

    col.beforeUpdateListeners.add('tags', function (query, update) {
      update.$set.modificationDate = new Date()

      if (!update.$set.color) {
        throw new Error('color field cannot be empty')
      }

      if (!HEX_COLOR_REGEXP.test(update.$set.color)) {
        throw new Error('color field must have a valid hex value')
      }
    })
  })
}
