import "./tick_loop";
import { sendDiscordNotification } from "./discord";

console.log("🔄 Gala Auto-Transfer Bot is running...");
sendDiscordNotification("🚀 **Gala Auto-Transfer Bot is now running!** ✅").catch(error => {
  console.error("❌ Failed to send startup notification to Discord:", error);
});

/**
 * Graceful shutdown handler
 */
async function shutdown() {
  console.log("🛑 Shutting down Gala Auto-Transfer Bot...");
  try {
    await sendDiscordNotification("🛑 **Gala Auto-Transfer Bot is shutting down...**");
  } catch (error) {
    console.error("❌ Failed to send shutdown notification to Discord:", error);
  }
  process.exit(0);
}

// Handle SIGINT (Ctrl+C) and SIGTERM (termination signal)
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
