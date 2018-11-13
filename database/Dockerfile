FROM mysql:5.7

RUN mkdir -p /db

COPY ["hour.csv", "reservation.csv", "restaurant.csv", "./db/"] 

COPY ["schema.sql", "seed.sh", "./docker-entrypoint-initdb.d/"] 

EXPOSE 3306
