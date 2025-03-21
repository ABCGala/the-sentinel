import axios from "axios";
import { API_URL, WALLET_ADDRESS, PRIVATE_KEY } from "./config";
import { signObject } from "./utils";

/**
 * Checks if the user is registered on GalaChain.
 * @returns {Promise<boolean>} True if the user is registered, otherwise false.
 */
export async function isUserRegistered(): Promise<boolean> {
  try {
    const requestData = { user: WALLET_ADDRESS };
    const signedData = signObject(requestData, PRIVATE_KEY);

    const response = await axios.post(
      `${API_URL}/galachain/api/asset/public-key-contract/GetPublicKey`,
      signedData,
      { headers: { "X-Wallet-Address": WALLET_ADDRESS, "Content-Type": "application/json" } }
    );

    return Boolean(response.data?.Data?.publicKey);
  } catch (error: any) {
    console.error("❌ User registration check failed:", error.response?.data || error.message);
    return false;
  }
}
