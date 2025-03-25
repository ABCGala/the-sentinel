import "./tick_loop";
import { sendDiscordNotification } from "./discord";

console.log("🔄 The Sentinel is running...");
sendDiscordNotification("🚀 **The Sentinel is now running!** ✅").catch(error => {
  console.error("❌ Failed to send startup notification to Discord:", error);
});

/**
 * Graceful shutdown handler
 */
async function shutdown() {
  console.log("🛑 Shutting down The Sentinel...");
  try {
    await sendDiscordNotification("🛑 **The Sentinel is shutting down...**");
  } catch (error) {
    console.error("❌ Failed to send shutdown notification to Discord:", error);
  }
  process.exit(0);
}

// Handle SIGINT (Ctrl+C) and SIGTERM (termination signal)
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
