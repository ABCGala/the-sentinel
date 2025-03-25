/**
 * The Sentinel - Type Definitions
 * Core data structures for GALA token monitoring and transfers
 */

export interface TokenBalance {
  /**
   * Token collection identifier (e.g., "GALA")
   */
  collection: string;
  
  /**
   * Current balance as a string (for precision)
   */
  quantity: string;
}

export interface FetchBalancesResponse {
  /**
   * Array of token balances returned by GalaChain API
   */
  Data: TokenBalance[];
}

export interface TransferResponse {
  /**
   * Optional transaction ID from GalaChain
   * @remarks Marked optional to handle API responses where ID might be missing
   */
  transactionId?: string;
}

/**
 * Sentinel-specific monitoring metrics
 * @future Can be extended for advanced monitoring features
 */
export interface SentinelMetrics {
  lastCheckTimestamp?: Date;
  averageTransferTime?: number;
}