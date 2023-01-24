# newsprojectapp

and you're good to go!

> Note: Make sure to have Docker and Docker Compose installed on your machine before running the command.

# Features
- User registration and login using fullName, email, and password
- Home page that shows news and articles from subscribed sources (powered by News API)
- Sources page where users can subscribe or unsubscribe to different sources (powered by Sources API)
- Login history page to view the latest 10 logins and track success and failed logins
- Top 5 most subscribed sources page for all users
- Utilizes Node.js, Express, MongoDB, React.js, Redis caching, and Pino logger

# Deployment
To deploy the project, you will need to provide an `app.env` file located in the server folder. Once you have the file in place, run the following command in your terminal:

`docker-compose up --build`

This will build and run the project using Docker Compose.
