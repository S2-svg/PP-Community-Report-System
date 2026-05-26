<<<<<<< HEAD
import app from './app.ts';
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
=======
import app from "./app";
import { AppDataSource } from "./config/data-source";

const port = Number(process.env.PORT ?? 3000);

AppDataSource.initialize()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed", error);
    process.exit(1);
  });
>>>>>>> feature/savin
