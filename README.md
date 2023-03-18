# Medicare

Medicare is a web-based hospital management system that enables patients and doctors to manage appointments, medical records, and other important information.

## Features

- **User authentication and authorization**: Patients and doctors can create accounts and log in to access their respective dashboards.

- **Appointments management**: Patients can book appointments with available doctors, and doctors can view and accept or reject appointments. Users can cancel appointments if needed.

- **Medical records management**: Doctors can create and manage medical records for their patients, including diagnoses, treatments, and prescriptions. Patients can view their own records.

- **Inpatient/outpatient management**: Doctors can create and manage records for patients who are currently staying in the hospital (inpatients) and those who are receiving care on an outpatient basis.

## Technologies Used

- **Backend**: Django with Django Graphene to create a secure and scalable backend that handles user authentication, data storage and retrieval, and business logic.

- **Database**: PostgreSQL to store user data, appointments, medical records, and other important information.

- **Frontend**: React with Redux for state management to create a user-friendly and responsive frontend that allows patients and doctors to interact with the system.

- **API**: GraphQL API to allow the frontend to communicate with the backend and perform CRUD operations on the database.

- **Testing**: Jest and Enzyme for frontend unit and integration tests, and Pytest for backend unit and integration tests to ensure that the code works as expected and catches bugs before they reach production.

## Getting Started

1. Clone the repository and navigate to the project root directory. <br />
`cd medicare <br />
cd backend <br />
pip install -r requirements.txt <br />
python manage.py runserver`

2. In a new terminal window, run the frontend server <br />
`cd ../frontend <br />
npm install <br />
npm run dev`


3. Open your web browser and go to `http://localhost:5173` to see the app running.

4. For admistration navigate to `http://localhost:8000/admin`

## Conclusion

That's it! You now have a working hospital management system that allows patients and doctors to manage appointments, medical records, and other important information. Feel free to modify the code and experiment with it. Happy coding!
