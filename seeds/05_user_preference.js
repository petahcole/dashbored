exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex.raw('DELETE FROM "user_preference"; ALTER SEQUENCE user_preference_id_seq RESTART WITH 6;')
        .then(function() {
            return Promise.all([
                // Inserts seed entries
                knex('user_preference').insert({
                    id: 1,
                    name: 'ESPN',
                    user_id: 1,
                    pref_type_id: 2
                }),
                knex('user_preference').insert({
                    id: 2,
                    name: 'Eventful',
                    user_id: 2,
                    pref_type_id: 4
                }),
                knex('user_preference').insert({
                    id: 3,
                    name: 'BBC',
                    user_id: 3,
                    pref_type_id: 1
                }),
                knex('user_preference').insert({
                    id: 4,
                    name: 'ESPN',
                    user_id: 4,
                    pref_type_id: 2
                }),
                knex('user_preference').insert({
                    id: 5,
                    name: 'BBC',
                    user_id: 5,
                    pref_type_id: 1
                })
            ]);
        });
};
