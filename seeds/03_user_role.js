exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex.raw('DELETE FROM "user_role"; ALTER SEQUENCE user_role_id_seq RESTART WITH 6;')
        .then(function() {
            return Promise.all([
                // Inserts seed entries
                knex('user_role').insert({
                    id: 1,
                    user_id: 1,
                    role_id: 1
                }),
                knex('user_role').insert({
                    id: 2,
                    user_id: 2,
                    role_id: 2
                }),
                knex('user_role').insert({
                    id: 3,
                    user_id: 3,
                    role_id: 2
                }),
                knex('user_role').insert({
                    id: 4,
                    user_id: 4,
                    role_id: 2
                }),
                knex('user_role').insert({
                    id: 5,
                    user_id: 5,
                    role_id: 3
                })
            ]);
        });
};
