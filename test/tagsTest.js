var path = require('path')
var should = require('should')
var Reporter = require('jsreport-core')
var reservedTagNamesExport = require('../shared/reservedTagNames')
var reservedTagNames = reservedTagNamesExport.default
var tagsGroupName = reservedTagNamesExport.tagsGroupName

describe('tags', function () {
  var reporter

  beforeEach(function (done) {
    reporter = Reporter({
      rootDirectory: path.join(__dirname, '../')
    }).use(require('../')())

    reporter.init().then(function () {
      done()
    }).fail(done)
  })

  it('should not allow creation with reserved tag names', function (done) {
    var creations = reservedTagNames.map(function (tagName) {
      return reporter.documentStore.collection('tags').insert({
        name: tagName,
        color: '#000000'
      })
    })

    var errorsCount = 0

    creations.forEach(function (createPromise, index) {
      createPromise.then(function () {
        done(new Error('should not create tag with reserved name'))
      }).catch(function (err) {
        if (err) {
          errorsCount++

          if (index === creations.length - 1) {
            if (errorsCount === creations.length) {
              return done()
            }

            done(new Error('all creations should have failed'))
          }
        }
      })
    })
  })

  it('should not allow creation without color', function (done) {
    reporter.documentStore.collection('tags').insert({
      name: 'tag1'
    }).then(function (t) {
      done(new Error('should not create tag without color'))
    }).catch(function (err) {
      if (err) {
        done()
      }
    })
  })

  it('should not allow creation with invalid color', function (done) {
    reporter.documentStore.collection('tags').insert({
      name: 'tag1',
      color: 'testing'
    }).then(function (t) {
      done(new Error('should not create tag with invalid color'))
    }).catch(function (err) {
      if (err) {
        done()
      }
    })
  })

  it('should not allow updating with reserved tag name', function (done) {
    reporter.documentStore.collection('tags').insert({
      name: 'tag1',
      color: '#000000'
    }).then(function (t) {
      return reporter.documentStore.collection('tags').update({
        shortid: t.shortid
      }, {
        $set: {
          name: tagsGroupName
        }
      }).then(function () {
        done(new Error('should not update entity with reserved name'))
      }).catch(function (err) {
        if (err) {
          done()
        }
      })
    }).catch(done)
  })

  it('should not allow updating with invalid color', function (done) {
    reporter.documentStore.collection('tags').insert({
      name: 'tag1',
      color: '#000000'
    }).then(function (t) {
      return reporter.documentStore.collection('tags').update({
        shortid: t.shortid
      }, {
        $set: {
          color: 'invalid'
        }
      }).then(function () {
        done(new Error('should not update entity with invalid color'))
      }).catch(function (err) {
        if (err) {
          done()
        }
      })
    }).catch(done)
  })

  it('deleting should work', function (done) {
    reporter.documentStore.collection('tags').insert({
      color: '#000000'
    }).then(function (t) {
      return reporter.documentStore.collection('tags').remove({shortid: t.shortid}).then(function () {
        return reporter.documentStore.collection('tags').find({}).then(function (list) {
          should(list.length).eql(0)
          done()
        })
      })
    }).catch(done)
  })
})
