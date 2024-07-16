const fs = require('fs');
const { con } = require('../../config/db');
const sqlstring = require('sqlstring');
const CryptoJS = require('crypto-js');

// module.exports={
//     executeQuery:async(filePath, params)=> {
//         try {
//           const query = await readSQLFile(filePath);
//           return new Promise((resolve, reject) => {
//             con.query(query, [...params, ...params], (error, results) => {
//               if (error) {
//                 reject(error);
//               } else {
//                 resolve(results);
//               }
//             });
//           });
//         } catch (error) {
//           throw error;
//         }
//       }
// }

// const readSQLFile = (filePath) => {
//   return new Promise((resolve, reject) => {
//     fs.readFile(filePath, 'utf8', (err, data) => {
//       if (err) {
//         return reject(err);
//       }
//       resolve(data);
//     });
//   });
// };

module.exports = {
  executeQuery: async (filePath, params) => {
    let connection;
    try {
      connection = await con.getConnection();
      const query = await readSQLFile(filePath);
      const interpolatedQuery = sqlstring.format(query, params);

      console.log('interpolatedQuery', interpolatedQuery);
      const [results] = await connection.query(
        {
          sql: query,
          namedPlaceholders: true,
        },
        params,
      );
      return results;
    } catch (error) {
      throw error;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  },

  EncryptData: (strString) => {
    return CryptoJS.AES.encrypt(
      strString.toString(),
      process.env.CRYPTO_KEY,
    ).toString();
  },

  DecryptData: (dataValues) => {
    let dataStr = '';
    if (dataValues) {
      const bytes = CryptoJS.AES.decrypt(dataValues, process.env.CRYPTO_KEY);
      dataStr = bytes.toString(CryptoJS.enc.Utf8);
    }
    return dataStr;
  },

  generateRandomFiveDigitNumber: () => {
    return Math.floor(10000 + Math.random() * 90000);
  },
};

const readSQLFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(data);
    });
  });
};
