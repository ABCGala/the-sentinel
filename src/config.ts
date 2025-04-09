import dotenv from "dotenv";
import path from "path";

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

// ✅ Export all necessary configuration variables for The Sentinel
export const API_URL = process.env.API_URL?.trim() || "https://api-galaswap.gala.com";
export const WALLET_ADDRESS = process.env.WALLET_ADDRESS?.trim() || "";
export const PRIVATE_KEY = process.env.PRIVATE_KEY?.trim() || "";
export const PUBLIC_KEY = process.env.PUBLIC_KEY?.trim() || "";
export const MIN_BALANCE = parseFloat(process.env.MIN_BALANCE?.trim() || "100");
export const RECIPIENTS = (process.env.RECIPIENTS?.trim() || "").split(",").filter(r => r);
export const CHECK_INTERVAL = parseInt(process.env.CHECK_INTERVAL?.trim() || "30000", 10); // Default: 30s
export const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL?.trim() || ""; // ✅ Ensured trimming
