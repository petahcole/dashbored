exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex.raw('DELETE FROM "role"; ALTER SEQUENCE user_id_seq RESTART WITH 4;')
        .then(function() {
            return Promise.all([
                // Inserts seed entries
                knex('role').insert({
                    id: 1,
                    title: 'Default'
                }),
                knex('role').insert({
                    id: 2,
                    title: 'Admin'
                }),
                knex('role').insert({
                    id: 3,
                    title: 'Super User'
                })
            ]);
        });
};
