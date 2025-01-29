import { db } from './statements';

// Add a new user
const addUser = (username, password, api_token, callback) => {
  db.withTransactionSync(tx => {
    tx.executeSync(
      `INSERT INTO users (username, password, api_token) VALUES (?, ?, ?);`,
      [username, password, api_token],
      (_, result) => callback(null, result),
      (_, error) => callback(error)
    );
  });
};

// Get all exercises
const getExercises = callback => {
  db.withTransactionSync(tx => {
    tx.executeSync(
      `SELECT * FROM exercises;`,
      [],
      (_, { rows }) => callback(null, rows._array),
      (_, error) => callback(error)
    );
  });
};

export { addUser, getExercises };

