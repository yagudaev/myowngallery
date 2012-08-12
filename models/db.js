var mongoose = require('mongoose'),
    config = require('../config'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    dbConnection = null,
    db = {},
    models = {};

/**
 * Connect to the database
 * @param host String The database host e.g. localhost
 * @param database String The database name e.g. snippet
 * @param username String [optional] The database username e.g. root
 * @param password String [optional] The database password
 * @param port Number [optional] The database port number e.g. 1234
 */
function connectTo(host, database, username, password, port) {
    username = username || '';
    password = password || '';
    port = port ? ':' + port : '';

    var authenticationStr; // e.g. <user>:<password>

    if (username === '' && password === '') {
        authenticationStr = '';
    } else {
        authenticationStr = username + ':' + password + '@';
    }

    // e.g. mongodb://<user>:<password>@<host>:<port>/<db> or 'mongodb://localhost/SnippetSkyDB_Dev'
    var dbLocation = 'mongodb://' + authenticationStr + host + port + '/' + database;

    if (!dbConnection) {
        dbConnection = mongoose.createConnection(dbLocation);
        db = buildDB();
    }

    return db;
}


function buildDB() {
    var UserSchema = new Schema({
        username : { type: String, required: true, unique: true },
        password : { type: String, required: true },
        name : {
            first : { type: String, required: true },
            last  : { type: String, required: true }
        },
        email : { type: String, required: true },
        phone: {type: String, require: true },
        biography: {type: String, require: true},
        timeCreated : { type: Date, 'default': Date.now },
        timeLastLogin : { type: Date },
    });

    UserSchema
        .virtual('name.full')
        .get(function () {
            return this.name.first + ' ' + this.name.last;
        })
        .set(function (fullName) {
            var firstSpaceIndex, firstName, lastName;

            firstSpaceIndex = indexOf(' ');
            if (firstSpaceIndex !== -1) {
                firstName = fullName.substring(0,firstSpaceIndex);
                lastName = fullName.substring(firstSpaceIndex+1);
            } else {
                firstName = fullName;
                lastName = '';
            }

            this.set('name.first', firstName);
            this.set('name.last', lastName);
        });

    // register models
    models.User = dbConnection.model('User', UserSchema);
    models.ObjectId = mongoose.Types.ObjectId;

    /**** Build and "export" DB object ****/
    db.models = models;
    db.anonymousUser = {};
    db.connection = dbConnection;

    return db;
}

exports.models = connectTo(config.dbhost, config.dbname, config.dbuser, config.dbpassword, config.dbport).models;