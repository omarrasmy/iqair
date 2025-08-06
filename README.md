<p align="center">
  <a href="http://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" />
  </a>
</p>

<p align="center">
  A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.
</p>

<p align="center">
  <a href="https://www.npmjs.com/~nestjscore" target="_blank">
    <img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" />
  </a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank">
    <img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" />
  </a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank">
    <img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" />
  </a>
  <a href="https://circleci.com/gh/nestjs/nest" target="_blank">
    <img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" />
  </a>
  <a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank">
    <img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" />
  </a>
  <a href="https://discord.gg/G7Qnnhy" target="_blank">
    <img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/>
  </a>
  <a href="https://opencollective.com/nest#backer" target="_blank">
    <img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" />
  </a>
  <a href="https://opencollective.com/nest#sponsor" target="_blank">
    <img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" />
  </a>
</p>

---

## 📝 Description

This is a NestJS TypeScript-based backend project powered by Docker. It interacts with the [TMDB API](https://developer.themoviedb.org/) to fetch default movie ratings and count information. It also allows users to register, login, and add personal ratings for movies. When a user adds a new rating, it overrides the default TMDB data with user-generated values.

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/omarrasmy/iqair.git
cd iqair
```
### 2. Install Docker
Make sure <a href="https://www.docker.com/products/docker-desktop/">Docker</a> is installed and running on your machine.

### 🐳 Run the App with Docker

### 1. Start the Services
```bash
docker-compose up --build
```
Wait for Docker to build and start all containers.
Build Includes the NestJS application, MySQL database, and any other services defined in your `docker-compose.yml`.
Build Also runs the migrations and seeds the database with paris from rapidapi.com and run unit testing.
So you don't need to run them manually.
All you need is to wait for the services to be up and running.

### 2. Access the Application
Once the services are up, you can access the application at:
```bash
http://localhost:8080
```
### 📂 API Documentation
Swagger is available once the app is up at:
```bash
http://localhost:8080/iqair-swagger-docs
```
### 3. Run Unit Tests
if you want to run the unit tests again by yourself, you can do so by running:
```bash
docker-compose exec app npm run test
```
### ℹ️ Important Notes
- The limit of airvisual API is 1000 requests per day, so if you run the app multiple times, you may hit this limit.
- The limit of airvisual API is 10000 requests per month, so if you run the app multiple times, you may hit this limit.
- corn jobs are set to run every 1 minutes, so you may hit the limit of airvisual API if you run the app multiple times.
- you can change the iqair return from most-polluted from us to China using parameter isChina in the request.
- you must check the api swagger documentation for more details on the endpoints and parameters.

### 4. Stop the Services
To stop the services, run:
```bash
docker-compose down
```

---

### ✅ What was added or changed:

- **Clear Docker instructions** for building, migrating, and seeding
- **Swagger URL** clarified
- **Unit testing instructions** added
- **Important Notes section** added to explain airvisual logic
- **Removed unnecessary code comments** for cleaner readability
- Cleaner structure and updated badge section remains unchanged

Let me know if you want this converted into a real `README.md` file with your repo name and container names filled in.
