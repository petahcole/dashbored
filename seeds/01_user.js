const bcrypt = require('bcryptjs');

exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex.raw('DELETE FROM "user"; ALTER SEQUENCE user_id_seq RESTART WITH 6;')
        .then(function() {
            return Promise.all([
                // Inserts seed entries
                knex('user').insert({
                    id: 1,
                    first_name: 'Michael',
                    last_name: 'Roque',
                    email: 'mycroquet@gmail.com',
                    password: bcrypt.hashSync('bacon'),
                    username: 'mycroquet',
                    joined: new Date()
                }),
                knex('user').insert({
                    id: 2,
                    first_name: 'Daisha',
                    last_name: 'Walton',
                    email: 'dash@gmail.com',
                    password: bcrypt.hashSync('bacon'),
                    username: 'dash',
                    joined: new Date()
                }),
                knex('user').insert({
                    id: 3,
                    first_name: 'Phil',
                    last_name: 'Cunnell',
                    email: 'philthy@gmail.com',
                    password: bcrypt.hashSync('cactus'),
                    username: 'philthy',
                    joined: new Date()
                }),
                knex('user').insert({
                    id: 4,
                    first_name: 'Jordon',
                    last_name: 'Storz',
                    email: 'jstorz@gmail.com',
                    password: bcrypt.hashSync('banana'),
                    username: 'jstorz',
                    joined: new Date()
                }),
                knex('user').insert({
                    id: 5,
                    first_name: 'Cole',
                    last_name: 'Batson',
                    email: 'petahcole@gmail.com',
                    password: bcrypt.hashSync('socks'),
                    username: 'petahcole',
                    joined: new Date()
                })
            ]);
        });
};
