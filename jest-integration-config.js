/* eslint-disable no-undef */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('./jest.config')
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: './.env.test' })
config.testMatch = ['**/*.test.ts']
module.exports = config