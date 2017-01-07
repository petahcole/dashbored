
var knex = require('../db/db_connection')

module.exports = {

    loadDash: function(username) {
        return knex('user')
            .join('user_preference', 'user_preference.user_id', '=', 'user.id')
            // .join('user_role', 'user_role.user_id', '=', 'user.id')
            .select('user.id','user.username', 'user.password', 'user_preference.pref_type_id')
            .where('user.username', username)

    },
    validSignUp: function(email) {
        return knex('user').where({
            email: email
        }).first()
    },
    validSignIn: function(username, password) {
        return knex('user').where({
            username: username,
        })
    },
    createUser: function(userInfo) {
        if (userInfo.username.length < 3) {
          return Promise.reject({
            constraint: 'Username not long enough'
          });
        } else if (userInfo.email.length < 3) {
          return Promise.reject({
            constraint: 'Email not long enough'
          });
        } else {
          return knex('user').returning('id').insert(userInfo)
        }

    },
    getUser: function(userID)   {
        return knex('user').select("username").where("id", userID)

    },
    getUserByUsername: function(username) {
        return knex('user').first().where('username', username);
    }
}
