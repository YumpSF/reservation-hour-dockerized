#!/bin/bash

mysqlimport --ignore-lines=1 --fields-terminated-by=, --verbose --local -u root reservation_hour ./db/hour.csv

mysqlimport --ignore-lines=1 --fields-terminated-by=, --verbose --local -u root reservation_hour ./db/reservation.csv

mysqlimport --ignore-lines=1 --fields-terminated-by=, --verbose --local -u root reservation_hour ./db/restaurant.csv
