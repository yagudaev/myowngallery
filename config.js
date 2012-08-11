module.exports = {
    dbhost: process.env.DBHOST || 'localhost',
    dbport: process.env.DBPORT || '',
    dbuser: process.env.DBUSER || '',
    dbpassword: process.env.DBPASSWORD || '',
    dbname: process.env.DBNAME || 'myowngallery',

    port: process.env.PORT || 4000
};