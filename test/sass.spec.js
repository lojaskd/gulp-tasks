'use strict';

const exec = require('child_process').exec;
const tape = require('tape');
const utils = require('./utils');

tape('sass task', (test) => {
  test.plan(1);
  exec('gulp sass', { cwd: __dirname }, () => {
    const expected = utils.readFixture('output.css');
    const actual = utils.readResult('input.css');
    test.equal(expected, actual, 'Processes sass task!');
  });
});
