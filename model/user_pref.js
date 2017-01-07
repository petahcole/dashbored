var knex = require('../db/db_connection')

module.exports = {

    savePreferences: function(user_id, pref_ids) {

      if (!pref_ids || pref_ids.length === 0) {
        return Promise.resolve(false);
      }

        return Promise.all(pref_ids.map(function(pref_id) {
            return knex('user_preference').insert({
                name: 'Whatever',
                user_id: user_id,
                pref_type_id: pref_id
            });
        }));
        return knex('preference_type').whereIn('id', pref_ids)

    }

}
