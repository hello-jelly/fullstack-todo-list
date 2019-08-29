const client = require('../lib/client');

client.query(`
    CREATE TABLE items (
        id SERIAL PRIMARY KEY NOT NULL,
        name VARCHAR(256) NOT NULL UNIQUE,
        inactive BOOLEAN NOT NULL DEFAULT FALSE
    );

    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(256) NOT NULL,
        hash VARCHAR(512) NOT NULL,
        display_name VARCHAR(256) NOT NULL
    );
`)
    .then(
        () => console.log('create tables complete'),
        err => console.log(err)
    )
    .then(() => {
        client.end();
    });
