# football-manager

Online Football Manager

## **Table of Contents**

1. [Installation](#installation)
2. [Usage](#usage)
3. [Time spent](#time)

## **Installation**

Follow these steps to install and set up the project locally.

### **Prerequisites**

- [Node.js](https://nodejs.org/) (v20 or higher)
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/)

### **Steps**

1. Clone the repository:

   ```bash
   git clone https://github.com/aminetakha/football-manager.git
   ```

2. Run the docker compose file:

   ```bash
   docker compose up --build
   ```

3. Install backend dependencies:

   ```bash
   npm install
   ```

4. Install frontend dependencies:

   ```bash
   cd client
   npm install
   ```

5. Create **.env** file and copy the contents of the **.env-sample** inside it.

6. Run database migration:

   6.1. On the root directory, run the following:

   ```bash
   npm run db:migrate
   ```

7. Run database seeds:

   7.1. On the root directory run:

   ```bash
   npm run db:seed
   ```

8. Create **.env** file inside **client** directory and copy the contents of **.env.sample** that's inside **client** in **.env**.

9. Start the project:

   9.1. On the root directory, run the following:

   ```bash
   npm run start
   ```

## **Usage**

Open your browser and navigate to: [http://localhost:5173](http://localhost:5173/)

## **Time**

|               Section | Time    |
| --------------------: | ------- |
|    Study requirements | 27m     |
|       database schema | 55m     |
|     Bootstrap project | 34m     |
|                  Auth | 2h 33m  |
| Team/players creation | 7h 29m  |
|       Transfer market | 5h 27m  |
|              Frontend | 15h 40m |
