import * as SQLite from "expo-sqlite";

let db;

// Function to initialize and open the database
const initializeDatabase = async () => {
  try {
    db = SQLite.openDatabaseSync("database.db");
    console.log("Database opened successfully:", db);

    db.with(
      tx => {
        // Create the `users` table
        tx.executeSync(
          `CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            api_token TEXT
          );`
        );

        // Create the `exercises` table
        tx.executeSync(
          `CREATE TABLE IF NOT EXISTS exercises (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT,
            muscle_group TEXT,
            api_id TEXT UNIQUE
          );`
        );

        // Create the `workout_plans` table
        tx.executeSync(
          `CREATE TABLE IF NOT EXISTS workout_plans (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            name TEXT NOT NULL,
            FOREIGN KEY(user_id) REFERENCES users(id)
          );`
        );
      },
      error => {
        console.error("Transaction error:", error);
      },
      () => {
        console.log("Database tables created successfully.");
      }
    );
  } catch (error) {
    console.error("Error initializing database:", error);
  }
};

// Export the `db` variable and `initializeDatabase` function
export { db, initializeDatabase };
