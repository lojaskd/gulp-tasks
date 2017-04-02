# LojasKD [Gulp](http://gulpjs.com/) tasks [![Code Climate](https://codeclimate.com/github/lojaskd/gulp-tasks/badges/gpa.svg)](https://codeclimate.com/github/lojaskd/gulp-tasks)

> Nota: Esse projeto requer node >=6.9.0

## Instalação

```
npm install --save-dev @lojaskd/gulp-tasks
```

## Como usar

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

## Copyright e Licença

Copyright 2017 - [LojasKD.com.br](https://www.lojaskd.com.br/) sob a licença [MIT](/LICENSE).
