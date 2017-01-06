
var knex = require('../db/db_connection')

module.exports = {

    loadDash: function(username) {
        return knex('user')
            .join('user_preference', 'user_preference.user_id', '=', 'user.id')
            .join('user_role', 'user_role.user_id', '=', 'user.id')
            .select('user.username', 'user.password', 'user_preference.pref_type_id', 'user_role.user_id')
            .where('user.username', username)

    },
    validSignUp: function(username) {
        return knex('user').where('username', username)
    },
    validSignIn: function(username, password) {
        return knex('user').where({
            username: username,
        })
    },
    createUser: function(userInfo) {
        return knex('user').returning('id').insert(userInfo)
    },
    getUser: function(userID)   {
        return knex('user').select("username").where("id", userID)
    }


}
