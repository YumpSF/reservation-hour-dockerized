const faker = require('faker');
const moment = require('moment');
const fs = require('fs');
const path = require('path');
//const db = require('./index.js');


const generateRestaurant = () => {
  const restaurants = [];
  for (let i = 1; i <= 100; i += 1) {
    const randomName = `${faker.company.catchPhraseAdjective()} ${faker.company.bsNoun()}`;
    const restaurant = {
      id: i,
      name: randomName,
    };
    restaurants.push(restaurant);
    //const query = 'INSERT INTO restaurant(name) VALUES(?)';
    //db.query(query, [randomName], (err) => {
      //if (err) { throw new Error(err); }
    //});
  }
  return restaurants;
};

const generateReservation = () => {
  const reservations = [];
  for (let i = 1; i <= 2000; i += 1) {
    const restId = Math.floor(Math.random() * 100);
    const randomReservee = `${faker.name.findName()}`;
    const randomReservation = faker.date.future(0.05);
    let randomTime = parseInt(12 + (Math.random() * 10), 10);
    if (Math.random() >= 0.5) {
      randomTime += ':30:00';
    } else {
      randomTime += ':00:00';
    }
    randomTime = `${moment(randomReservation).format('YYYY-MM-DD')} ${randomTime}`;
    const reservation = {
      id: i,
      reservee: randomReservee,
      time: randomTime,
      restaurantId: restId,
    };
    reservations.push(reservation);
    //const query = 'INSERT INTO reservation(reservee, time, restaurantId) VALUES(?, CAST(? AS DATETIME), ?)';
    //db.query(query, [randomReservee, randomTime, restId], (err) => {
      //if (err) { throw new Error(err); }
    //});
  }
  return reservations;
};

const generateHour = () => {
  const hours = [];
  for (let i = 1; i <= 100; i += 1) {
    let openingHour = 6 + Math.floor(Math.random() * 5);
    if (openingHour > 10) {
      openingHour = `0${openingHour}`;
    }
    if (Math.random() >= 0.5) {
      openingHour += ':30';
    } else {
      openingHour += ':00';
    }
    let closingHour = 21 + Math.floor(Math.random() * 5);
    if (closingHour > 24) {
      closingHour -= 24;
    }
    if (Math.random() >= 0.5) {
      closingHour += ':30';
    } else {
      closingHour += ':00';
    }
    for (let j = 1; j <= 7; j += 1) {
      const hour = {
        id: (i - 1) * 7 + j,
        weekday: j - 1,
        openingHour,
        closingHour,
        restaurantId: i,
      };
      hours.push(hour);
      //const query = 'INSERT INTO hour(weekday, openingHour, closingHour, restaurantId) VALUES(?, ?, ?, ?)';
      //db.query(query, [j - 1, openingHour, closingHour, restId], (err) => {
        //if (err) { throw new Error(err); }
      //});
    }
  }
  return hours;
};

const csvConverter = (arr) => {
  let output = '';
  let column = [];
  for (let key in arr[0]) {
    column.push(key);
  }
  output += `${column.join()}\n`;
  for (let i = 0; i < arr.length; i++) {
    column = [];
    for (let key in arr[i]) {
      column.push(arr[i][key]);
    }
    output += `${column.join()}\n`;
  }
  return output;
};

const restaurantCSV = csvConverter(generateRestaurant());
const reservationCSV = csvConverter(generateReservation());
const hourCSV = csvConverter(generateHour());

fs.writeFile(path.join(__dirname, 'restaurant.csv'), restaurantCSV, (err) => {
  if (err) throw err;
  console.log('saved');
});

fs.writeFile(path.join(__dirname, 'reservation.csv'), reservationCSV, (err) => {
  if (err) throw err;
  console.log('saved');
});

fs.writeFile(path.join(__dirname, 'hour.csv'), hourCSV, (err) => {
  if (err) throw err;
  console.log('saved');
});
