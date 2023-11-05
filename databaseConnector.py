

import mysql.connector

db = mysql.connector.connect(
    host="localhost",  # Replace with the actual hostname or IP address
    user="root",
    password="1234",
    database="fannie"
)

cursor = db.cursor()

month_car_payment = 300
student_loan_payment = 2

sql = f"INSERT INTO users (monthly_car_payment, student_loan_payment) VALUES ('{month_car_payment}', '{student_loan_payment}')"

cursor.execute(sql)

result = cursor.fetchone()

# if result[0] == 1:
#     print("Database connection is successful.")
# else:
#     print("Database connection failed.")

db.commit()
