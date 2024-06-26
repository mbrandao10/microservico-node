/* eslint-disable no-undef */
// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const config = require('./jest.config')
config.testMatch = ['**/*.spec.ts']
module.exports = config