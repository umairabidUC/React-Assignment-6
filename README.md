
# Project Setup and Run Instructions 🚀

Welcome to the project! Follow the steps below to set up and run the project.

## Step 1: Setup the Database 🛠️

1. Ensure you have **PostgreSQL** installed and configured on your command line.
   - You can download PostgreSQL from [here](https://www.postgresql.org/download/).

2. Open your command line and create a new database named `topicsdb`:
   ```bash
   createdb topicsdb
   ```

3. Initialize the database by restoring the `topicsdb.sql` file:
   ```bash
   psql topicsdb < /backend/db/topicsdb.sql
   ```

## Step 2: Install Project Dependencies 📦

1. Navigate to the root directory of the project:
   ```bash
   cd /path/to/your/project
   ```

2. Install all necessary dependencies:
   ```bash
   npm install
   ```

## Step 3: Start the Backend Server 🏃‍♂️

1. Run the following command to start the backend server:
   ```bash
   npm run backend
   ```

## Step 4: Start the Frontend Server 🌐

1. In a new terminal window, run the following command to start the frontend server:
   ```bash
   npm run dev
   ```

That's it! Your project should now be up and running. If you have any questions or run into issues, please refer to the project's documentation or contact the maintainer. Happy coding! 💻
