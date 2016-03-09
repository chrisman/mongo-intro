#!bin/sh
mongoimport --db test --collection cats --drop --file seed.json
