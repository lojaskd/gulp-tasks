# [LojasKD](https://www.lojaskd.com.br) [Gulp](http://gulpjs.com/) tasks [![Code Climate](https://codeclimate.com/github/lojaskd/gulp-tasks/badges/gpa.svg)](https://codeclimate.com/github/lojaskd/gulp-tasks)

> Nota: Esse projeto requer node >=6.9.0

## Installation

```
npm install --save-dev @lojaskd/gulp-tasks
```

## Usage

```js
/* gulpfile.js */

const gulp = require('gulp');
const gulpTasks = require('@lojaskd/gulp-tasks');

/**
 * Register the sass task
 */

gulpTasks.sass(gulp, {
  // Task options
});
```

## TODO tasks

 - [ ] clean
 - [x] copy
 - [x] sass
 - [ ] javascript
 - [ ] javascript lint
 - [ ] images
 - [ ] fonts
 - [ ] s3 deploy

## License

Code is under [MIT License](/LICENSE) - © [LojasKD.com.br](https://www.lojaskd.com.br/)
