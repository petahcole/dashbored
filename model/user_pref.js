var knex = require('../db/db_connection')

module.exports = {

  savePreferences: function(user_id, pref_ids) {
    console.log(user_id);
    if (!pref_ids || pref_ids.length === 0) {
      return Promise.resolve(false);
    }
    return knex('user_preference').where('user_id', user_id).del()
      .then(function() {
        return Promise.all(pref_ids.map(function(pref_id) {
            return knex('user_preference').insert({
                name: 'poop',
                user_id: user_id,
                pref_type_id: pref_id
            });
        }));
      })
  }
}
