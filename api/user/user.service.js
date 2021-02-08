const pool = require("../../config/database");

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `INSERT INTO users_table(username, password)
                values(?,?)`,
      [data.username, data.password],
      (err, results, fields) => {
        if (err) {
          return callBack(err);
        }
        return callBack(null, results);
      }
    );
  },
  getUsers: (callBack) => {
    pool.query(
      `SELECT user_id,username,created_at FROM users_table`,
      [],
      (err, results, fields) => {
        if (err) {
          return callBack(err);
        }
        return callBack(null, results);
      }
    );
  },
  getUserById: (id, callBack) => {
    pool.query(
      `SELECT id,username,created_at FROM users_table WHERE user_id = ?`,
      [id],
      (err, results, fields) => {
        if (err) {
          return callBack(err);
        }
        return callBack(null, results[0]);
      }
    );
  },
  updateUser: (data, callBack) => {
    pool.query(
      `UPDATE users_table SET username=?, password=? WHERE user_id = ?`,
      [data.username, data.password],
      (err, results, fields) => {
        if (err) {
          return callBack(err);
        }
        return callBack(null, results[0]);
      }
    );
  },
  deleteUser: (data, callBack) => {
    pool.query(
      `DELETE FROM users_table WHERE user_id = ?`,
      [data.id],
      (err, results, fields) => {
        if (err) {
          return callBack(err);
        }
        return callBack(null, results[0]);
      }
    );
  },
};
