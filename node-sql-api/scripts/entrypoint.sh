#start SQL Server, start the script to create the DB and import the data, start the app
/opt/mssql/bin/sqlservr & /app/scripts/import-data.sh & yarn start:prod