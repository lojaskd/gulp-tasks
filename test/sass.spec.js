'use strict';

const exec = require('child_process').exec;
const tape = require('tape');
const utils = require('./utils');

tape('sass task', (test) => {
  test.plan(2);
  exec('gulp sass', { cwd: __dirname }, () => {
    const expected = utils.readFixture('output.css');
    const actual = utils.readResult('input.css');
    test.equal(expected, actual, 'Processes SASS Task, generate CSS non minified files');

    const expectedMin = utils.readFixture('output.min.css');
    const actualMin = utils.readResult('input.min.css');
    test.equal(expectedMin, actualMin, 'Processes SASS Task, enerate CSS Minified files');
  });
});
