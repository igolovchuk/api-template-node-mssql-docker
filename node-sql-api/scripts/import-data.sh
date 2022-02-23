#run the setup script to create the DB and the schema in the DB
#do this in a loop because the timing for when the SQL instance is ready is indeterminate
for i in {1..50};
do
    /opt/mssql-tools/bin/sqlcmd -S localhost -U $DB_USERNAME -P $DB_PASSWORD -d master -i /app/db/setup.sql
    if [ $? -eq 0 ]
    then
        echo "setup.sql completed"
        break
    else
        echo "not ready yet..."
        sleep 1
    fi
done

#import the data from the csv file
/opt/mssql-tools/bin/bcp DemoData.dbo.Products in "/app/products.csv" -c -t',' -S localhost -U $DB_USERNAME -P $DB_PASSWORD