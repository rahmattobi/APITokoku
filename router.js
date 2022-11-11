'use strict';

const { json } = require('body-parser');

module.exports = function (app) {
    var json = require('./controller');

    app.route('/').get(json.index);

    app.route('/get_user').get(json.user);

    app.route('/get_user/:id').get(json.userwithid);

    app.route('/add_user').post(json.adduser);

    app.route('/update').put(json.update);

    app.route('/delete').delete(json.delete);
}