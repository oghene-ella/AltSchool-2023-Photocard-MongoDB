# ALTSCHOOL CLASS 2023 STUDENT PHOTOCARD

![AltSchool Logo](https://github.com/Otavie/github_images/blob/main/altschool-2023-bg.jpg)

AltSchool 2023 Student Photocard Collection is a web application for managing student profiles, including their personal information, skills, and social media links. It allows students to sign up, log in, and edit their profiles while providing administrators the ability to manage student data efficiently.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Secure user sign-up and login with password hashing.
- **Student Profile Management**: Create, edit, and delete student profiles.
- **Responsive Design**: User-friendly interface optimized for both desktop and mobile devices.
- **Session Management**: Utilizes Express sessions for user session management.
- **Password Hashing**: Passwords are securely hashed and stored in the database.
- **Image Upload**: Students can upload their profile images.
- **Database Integration**: Utilizes MongoDB to store student data.
- **Navigation**: Navigation links for easy access to Home, Login, and About pages.

## Technologies Used

- **Backend**: Node.js
- **Database**: MongoDB
- **Frontend Library/Framework**:
  - Bootstrap 5
  - jQuery
  - Font Awesome

## Packages/Modules Used

- [EJS](https://www.npmjs.com/package/ejs): Embedded JavaScript templating for rendering HTML templates.
- [Multer](https://www.npmjs.com/package/multer): Middleware for handling file uploads.
- [Express](https://www.npmjs.com/package/express): Web application framework for Node.js.
- [Express Session](https://www.npmjs.com/package/express-session): Session management middleware for Express.js.
- [dotenv](https://www.npmjs.com/package/dotenv): Environment variable management.

## Getting Started

Follow these instructions to set up the project on your local machine.

### Prerequisites

- Node.js and npm (Node Package Manager)
- MongoDB installed and running

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Otavie/AltSchool-2023-Photocard-MongoDB.git

   cd AltSchool-2023-Photocard-MongoDB
   ```

2. Install project dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root directory with the following environment variables:

   ```
   DB_URI=your_mongodb_connection_uri
   PORT=port number
   ```

   Replace `your_mongodb_connection_uri` with your MongoDB connection URI and `port number` with the actual port number you are using.

4. Start the application:

   ```bash
   npm start
   ```

   The application will run on `http://localhost:<Port Number>` by default.

## Usage

1. Access the application in your web browser at `http://localhost:<Port Number>`.

2. Use the navigation links to explore the Home, Login, and About pages.

3. Sign up as a student to create a profile with your details.

4. Log in using your email and password.

5. Edit or delete your profile as needed.

6. Log out when you're done.

## Contributing

Contributions are welcome! Feel free to open issues or pull requests to improve the project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
