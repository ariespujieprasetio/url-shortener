const db = require("./db");

const saveUrl = (originalUrl, shortCode) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO urls (original_url, short_code) VALUES (?, ?)`;
    db.run(query, [originalUrl, shortCode], function (err) {
      if (err) {
        return reject(err);
      }
      resolve({ id: this.lastID, originalUrl, shortCode });
    });
  });
};

const findByShortCode = (code) => {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT original_url FROM urls WHERE short_code = ?`,
      [code],
      (err, row) => {
        if (err) {
          return reject(err);
        }
        resolve(row);
      },
    );
  });
};

module.exports = {
  saveUrl,
  findByShortCode,
};
