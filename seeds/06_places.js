exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex.raw('ALTER SEQUENCE preference_type_id_seq RESTART WITH 6;')
        .then(function() {
            return Promise.all([
                // Inserts seed entries
                knex('preference_type').insert({
                    id: 5,
                    type: 'Places'
                })
            ]);
        });
};
