const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'database',
  user: 'root',
  database: 'reservation_hour',
});

connection.connect();

connection.getReservations = (id, callback) => {
  const query = `
    SELECT reservation.reservee,reservation.time,restaurant.name FROM reservation 
    INNER JOIN restaurant ON reservation.restaurantId = restaurant.id
    WHERE restaurantId = ${id}
  `;
  connection.query(query, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

connection.getHours = (id, callback) => {
  const query = `
    SELECT hour.weekday,hour.openingHour,hour.closingHour,restaurant.name FROM hour
    INNER JOIN restaurant ON hour.restaurantId = restaurant.id
    WHERE restaurantId = ${id}
  `;
  connection.query(query, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

module.exports = connection;
