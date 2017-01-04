exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex.raw('DELETE FROM "preference_type"; ALTER SEQUENCE preference_type_id_seq RESTART WITH 5;')
        .then(function() {
            return Promise.all([
                // Inserts seed entries
                knex('preference_type').insert({
                    id: 1,
                    type: 'News'
                }),
                knex('preference_type').insert({
                    id: 2,
                    type: 'Sports'
                }),
                knex('preference_type').insert({
                    id: 3,
                    type: 'Games'
                }),
                knex('preference_type').insert({
                    id: 4,
                    type: 'Events'
                })
            ]);
        });
};
