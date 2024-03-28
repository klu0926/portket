# Portket

Portket is a web application designed to provide a platform for users to share and discover creative content. Whether you're an artist, photographer, designer, or any other type of creative individual, Portket aims to connect you with a community of like-minded people and showcase your work to the world.

![home page](https://portket-ed8f173e9326.herokuapp.com/images/readme/web-users.webp)

## Features

- **User Authentication:** Users can create accounts, log in, and log out securely.
- **Social Authentication:** Users can log in using their Facebook or Google accounts.
- **Content Sharing:** Users can upload and share their creative content, including images and other media files.
- **Content Discovery:** Users can explore and discover creative content shared by other users.
- **Interactive Experience:** The application provides an interactive and engaging user experience, with features such as likes, comments, and more.
- **Google Authentication:** Users can log in using their Google accounts for streamlined access and security.
- **Responsive Design:** Portket is designed to be responsive and accessible across various devices, including desktops, tablets, and smartphones.

## Technologies Used

- **Backend:** Express.js, Sequelize (with MySQL database), Passport.js for authentication, dotenv for environment variables
- **Frontend:** HTML, CSS, JavaScript, Handlebars.js for template
- **Image Processing:** Sharp.js for image processing
- **API Integration:** Imgur API for image uploading
- **Development Tools:** Nodemon for automatic server restart, ESLint for code linting, Prettier for code formatting, Webpack for bundling assets
- **Testing:** Mocha for unit testing

## Getting Started

### Prerequisites

- Node.js installed on your machine
- MySQL database server

### Installation

1. Clone the repository:

```
git clone https://github.com/klu0926/portket.git
```

2. Navigate to the project directory:

```
cd portket
```

3. Install npm modules

```
npm install
```

4. Create a `.env` file in the root directory based on the provided `.env.example` file. Fill in the required values, such as database credentials and API keys.

```
MESSAGE=
SESSION_SECRET=
GOOGLE_ID=
GOOGLE_SECRET=
GOOGLE_CALLBACK=
FACEBOOK_ID=
FACEBOOK_SECRET=
FACEBOOK_CALLBACK=
IMGUR_CLIENT_ID=
JAWDB_HOST=
JAWDB_USER=
JAWDB_PASSWORD=
JAWDB_DATABASE=
```

### Setting Up Sequelize Database

1. Create SQL database portket
2. Migrate database
```
npx sequelize db:migrate:all
```
3. Seeding database
```
npx sequelize db:seed:all
```

### Start App
```
npm run dev
```

