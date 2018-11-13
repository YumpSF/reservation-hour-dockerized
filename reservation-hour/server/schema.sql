DROP DATABASE IF EXISTS reservation_hour;

CREATE DATABASE reservation_hour;

use reservation_hour;

CREATE TABLE restaurant
(

  id INT(11) NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)

);

CREATE TABLE reservation
(

  id INT(11) NOT NULL AUTO_INCREMENT,
  reservee VARCHAR(50) NOT NULL,
  time DATETIME NOT NULL,
  restaurantId INT(11) NOT NULL,
  PRIMARY KEY (id)

);

CREATE TABLE hour 
(

  id INT (11) NOT NULL AUTO_INCREMENT, 
  weekday INT(11) NOT NULL,
  openingHour TIME NOT NULL,
  closingHour TIME NOT NULL,
  restaurantId INT(11) NOT NULL,
  PRIMARY KEY (id)

)
