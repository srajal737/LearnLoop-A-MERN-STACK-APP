##LearnLoop

LearnLoop is a MERN stack-based online learning platform designed to provide a seamless learning experience for students and a course management system for instructors.

The platform includes features such as secure role-based authentication, course purchasing, payment integration, course discovery, and a responsive user interface that works smoothly across desktop and mobile devices.

##🚀 Features
Role-based authentication for Students and Instructors
Secure JWT-based authentication
Payment integration using Razorpay
Single course purchase functionality
Bulk course purchase functionality
Category-wise course listing
Course filtering and exploration
Responsive design for laptop, tablet, and mobile devices
Instructor dashboard with analytics and statistics
State management using Redux


#🛠️ Tech Stack
Frontend
React.js
Redux
Tailwind CSS
JavaScript
Backend
Node.js
Express.js
MongoDB
JWT Authentication
Payment
Razorpay Payment Gateway


##⚙️ Project Setup
Clone the repository
git clone <repository-url>


Install frontend dependencies:

cd frontend
npm install

create a .env file where :-
VITE_BASE_URL=http://localhost:4000/api/v1   or backend url
VITE_RAZORPAY_KEY_ID=


Install backend dependencies:

cd backend
npm install

🔐 Environment Variables

Create a .env file in the backend folder and add required environment variables such as:

PORT=4000
FRONTEND_URL='http://localhost:5173'
DATABASE_URL=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
ADMIN_EMAIL=     //WRITE YOU EMAIL TO ACCESS CONTACT US FEATURE

//CLOUDINARY CREDENTIALS
CLOUD_NAME=  
API_KEY=
API_SECRET=
FOLDER_NAME=


JWT_SECRET=   //WRITE YOU KEY IT CAN BE RANDOM ALSO

//FOR SENDING MAIL FOR SERVICES LIKE OTP , UPDATE PASSWORD , FORGET PASSWORD , COURSE BUY CONFIRMATIONS ETC..
MAIL_HOST=smtp.gmail.com
MAIL_USER=
MAIL_PASS=


//ALSO GO TO ROOT DIRECTORY 
cd ..
npm intall

REMAIN AT ROOT DIRECTORY AND RUN 
npm run dev  ----->>>this will run both frontend and backend concurrently


#📱 Responsive Design
LearnLoop is designed to provide a consistent experience across:
Laptop
Mobile devices


📸 Screenshots


<img width="1918" height="892" alt="Screenshot 2026-07-18 214127" src="https://github.com/user-attachments/assets/a86749c5-5d2f-4114-b17a-d7221315b228" />


<img width="1917" height="797" alt="Screenshot 2026-07-18 214112" src="https://github.com/user-attachments/assets/62778f61-8413-4c2e-a71d-275e03d063e1" />


