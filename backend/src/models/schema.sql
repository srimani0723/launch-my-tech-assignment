CREATE TABLE IF NOT EXISTS admins (
         id TEXT PRIMARY KEY,
         name TEXT NOT NULL,
         email TEXT UNIQUE ,
         password TEXT NULL,
         google_id TEXT UNIQUE NULL,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);

CREATE TABLE IF NOT EXISTS posts (
         id TEXT PRIMARY KEY,
         title TEXT NOT NULL,
         content TEXT NOT NULL,
         image TEXT NOT NULL,
         admin_id TEXT NOT NULL,
         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
         FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE CASCADE
     );