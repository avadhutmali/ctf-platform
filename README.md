# CTF Challenge Platform

*A full-stack web application designed to host Capture The Flag (CTF) challenges in an engaging, game-like format. Built with a robust Spring Boot backend and a dynamic React frontend.*

This project provides a complete platform for running CTF events. It features a "Candy Crush-style" level map where users can progress through challenges, submit flags, and see their scores update in real-time on a public leaderboard.

##  Features

* **Dynamic Challenge Management**: Challenges are managed via a simple configuration file in the backend, allowing for easy updates without database queries.
* **Full User Authentication**: Secure user registration and login system based on usernames.
* **Interactive Level Map**: A visual, winding path of challenges that unlock as the user solves them.
* **Real-time Scoring**: User scores are updated instantly upon correct flag submission.
* **Public Leaderboard**: A publicly accessible leaderboard to foster competition, which highlights the currently logged-in user.
* **Mentor-Friendly**: Includes an API endpoint for batch-registering a large number of participants at once.

## 🛠️ Tech Stack

| Backend           | Frontend            |
| :---------------- | :------------------ |
| **Java 17** | **React 18** |
| **Spring Boot 3** | **Vite** |
| **Spring Data JPA**| **Tailwind CSS** |
| **MySQL** | **JavaScript (ES6+)**|
| **Maven** | **npm** |

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

* **Java Development Kit (JDK) 17+**
* **Apache Maven**
* **MySQL Server** & **MySQL Workbench** (or any SQL client)
* **Node.js v18+** & **npm**

### Backend Setup (`ctf-backend`)

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/your-username/ctf-backend.git](https://github.com/your-username/ctf-backend.git)
    cd ctf-backend
    ```

2.  **Create the Database:**
    * Open MySQL Workbench and connect to your database server.
    * Run the following SQL query to create the necessary database schema:
        ```sql
        CREATE SCHEMA `ctf_db` DEFAULT CHARACTER SET utf8mb4;
        ```

3.  **Configure Application Properties:**
    * In the `src/main/resources/` directory, you will find a file named `application.properties.template`.
    * **Rename or copy** this file to `application.properties`.
    * Open `application.properties` and update the `spring.datasource.password` field with your own MySQL root password. This file is ignored by Git to keep your secrets safe.

4.  **Run the Backend Server:**
    * Open a terminal in the root of the `ctf-backend` project.
    * Run the following Maven command:
        ```sh
        mvn spring-boot:run
        ```
    * The server will start on `http://localhost:8080`. Spring Boot will automatically create the necessary tables (`users`) in your `ctf_db` database.

###  Frontend Setup (`ctf-frontend`)

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/your-username/ctf-frontend.git](https://github.com/your-username/ctf-frontend.git)
    cd ctf-frontend
    ```

2.  **Install Dependencies:**
    ```sh
    npm install
    ```

3.  **Run the Frontend Development Server:**
    ```sh
    npm run dev
    ```
    * Your browser will open to `http://localhost:5173` (or another port if 5173 is busy).
    * The application is now running and connected to your local backend.

##  API Endpoints

<details>
<summary>Click to view API Documentation</summary>

| Method | Path                  | Description                                            |
| :----- | :-------------------- | :----------------------------------------------------- |
| `POST` | `/api/register`       | Registers a single new user.                           |
| `POST` | `/api/register-batch` | Registers multiple users from a JSON array.            |
| `POST` | `/api/submit`         | Submits a flag for a specific level.                   |
| `GET`  | `/api/leaderboard`    | Retrieves a list of all users, sorted by score.        |
| `GET`  | `/api/challenges`     | Retrieves the list of all challenges from the config.  |

</details>

##  Deployment

The backend is configured for easy deployment. When you build the project into a `.jar` file, you can place an `application.properties` file in the same directory on your server. This external file will override the internal one, allowing you to manage production database credentials and challenge flags without rebuilding the application.

```sh
# On your server
java -jar ctf-platform-0.0.1-SNAPSHOT.jar

