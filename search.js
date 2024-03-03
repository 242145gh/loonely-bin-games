// hello_algolia.js
const algoliasearch = require('algoliasearch')

// Connect and authenticate with your Algolia app
const client = algoliasearch('5JJ918ZR72', 'bfa1ff7e84adfc18c3c139c2cf42bfb2')

// Create a new index and add a record
const index = client.initIndex('stack')
const record = { objectID: 1, name: 'test_record' }
index.saveObject(record).wait()

// Search the index and print the results
index
  .search('test_record')
  .then(({ hits }) => console.log(hits[0]))
