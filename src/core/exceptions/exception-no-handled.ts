process.on("uncaughtException", error => {
    console.error("Uncaught Exception:", error);
    process.exit(1);
})

process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
    process.exit(1);
})

process.on("SIGTERM", () => {
    console.log("Received SIGTERM. Exiting...");
    process.exit(0);
})

process.on("SIGINT", () => {
    console.log("Received SIGINT. Exiting...");
    process.exit(0);
})

process.on("exit", () => {
    console.log("Process exit");
    gracefullyShutdown();
})

export const gracefullyShutdown = () => {
    console.log("Gracefully shutting down...");

    setTimeout(() => {
        console.log("Cleanup complete. Exiting process.");
        process.exit(0);
    }, 1000); // Adjust the timeout as needed
}