import "dotenv/config";
import app from "./src/app.js";
import prisma from "./src/config/db.js";

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // Verify database connection
    await prisma.$connect();
    console.log("Connected to PostgreSQL database (betteracco_db).");

    const server = app.listen(PORT, () => {
      console.log(`BetterAcco API server running at http://localhost:${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/api/v1/health`);
    });

    server.on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        console.error(`\n[Server Error] Port ${PORT} is already in use by another process.`);
        console.error(`To free port ${PORT}, run: fuser -k ${PORT}/tcp\n`);
      } else {
        console.error("Server error:", err);
      }
      process.exit(1);
    });

    const shutdown = async () => {
      console.log("\nShutting down server gracefully...");
      server.close(async () => {
        await prisma.$disconnect();
        console.log("Database disconnected. Server stopped.");
        process.exit(0);
      });
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
