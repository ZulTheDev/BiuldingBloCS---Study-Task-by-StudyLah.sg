from flask import Flask, request, render_template, send_file
import csv

app = Flask(__name__)

# Sample data for the schedule table (you can replace this with your data)
schedule_data = [
    ["Time", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    ["8:00 AM - 9:00 AM", "Task 1", "Task 2", "Task 3", "Task 4", "Task 5", "Task 6", "Task 7"],
    # Add more rows as needed
]

@app.route('/')
def index():
    return render_template('schedule.html', schedule_data=schedule_data)

@app.route('/download')
def download_schedule():
    # Create a CSV file with the schedule data
    with open('schedule.csv', 'w', newline='') as csvfile:
        csvwriter = csv.writer(csvfile)
        csvwriter.writerows(schedule_data)
    
    # Send the CSV file for download
    return send_file('schedule.csv', as_attachment=True)

@app.route('/upload', methods=['POST'])
def upload_schedule():
    if 'file' in request.files:
        file = request.files['file']
        if file.filename != '':
            # Process the uploaded file (you can add your logic here)
            # Example: Read the CSV and update the schedule_data
            
    return redirect('/')

if __name__ == '__main__':
    app.run(debug=True)
