'use strict';

const { json } = require('body-parser');

module.exports = function (app) {
    var jsonku = require('./controller');

    app.route('/').get(jsonku.index);

    app.route('/get_user').get(jsonku.user);

    app.route('/get_user/:id').get(jsonku.userwithid);
}