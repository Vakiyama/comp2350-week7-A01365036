const mysql = require('mysql2/promise');

const is_qoddi = process.env.IS_QODDI || false;

const dbConfigQoddi = {
  host: 'sql.freedb.tech',
  user: 'freedb_freedb_main_2_2350',
  password: '2!HJ!xbSxQ2MvgS',
  database: 'freedb_comp2350-week2-A01365036',
  multipleStatements: false,
  namedPlaceholders: true,
};

const dbConfigLocal = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: '',
  multipleStatements: false,
  namedPlaceholders: true,
};

if (is_qoddi) {
  var database = mysql.createPool(dbConfigQoddi);
} else {
  var database = mysql.createPool(dbConfigLocal);
}

module.exports = database;
