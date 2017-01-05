var knex = require('../db/db_connection')

module.exports ={

    loadDash: function(username) {
        return knex('user').where('user.username', username)
            .join('user_preference', 'user.id', '=', 'user_preference.user_id')
            .join('user_role', 'user.id', '=', 'user_role.user.id')
            .select('user.username', 'user.password', 'user_preference.pref_type_id', 'user_role.user_id')
    },
    validSignUp: function(username) {
        return knex('user').where('username', username)
    },
    validSignIn: function(username, password) {
        return knex('users').where({
            username: 'username',
            password: 'password'
        })
    },
    createUser: function(userInfo) {
      return knex('user').returning('id').insert(userInfo)
    }
}
//
//
//     ```sql
//     SELECT u.username, u.password, up.pref_type_id, ur.role_id
//     FROM "user" u
//     JOIN user_preference up ON up.user_id = u.id
//     JOIN user_role ur ON ur.user_id = u.id
//     WHERE u.id = up.user_id
//     AND ur.user_id = u.id;
//     ```
