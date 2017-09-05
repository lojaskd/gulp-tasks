'use strict'

var exec = require('child_process').exec
var tape = require('tape')
var utils = require('./utils')

tape('copy task', function (test) {
  test.plan(1)
  exec('gulp copy', { cwd: __dirname }, function () {
    var expected = utils.readFixture('static/logo.png')
    var actual = utils.readResult('logo.png')
    test.equal(expected, actual, 'Processes copy task: Files copied!')
  })
})
