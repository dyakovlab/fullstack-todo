import * as dotenv from "dotenv";
import { connect } from "./db/connect";
import { server } from "./server";

dotenv.config();

const PORT = parseInt(process.env.PORT || "8080", 10);

if (isNaN(PORT)) {
  console.error("Invalid PORT configuration. Please check your .env file.");
  process.exit(1);
}

const startServer = async () => {
  try {
    await connect();
    server.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  } catch (error: any) {
    console.error("Failed to start the server:", error.message);
    process.exit(1);
  }
};

startServer();
