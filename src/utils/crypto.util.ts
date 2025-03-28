import crypto from 'crypto';

/**
 * Generate a secure API key
 * @param {Object} options - Configuration options for API key generation
 * @param {number} [options.length=32] - Length of the API key (default 32 characters)
 * @param {boolean} [options.includeSpecialChars=true] - Include special characters
 * @param {string} [options.prefix=''] - Optional prefix for the API key
 * @returns {string} Generated API key
 */
export function generateApiKey(
  options: {
    length?: number;
    includeSpecialChars?: boolean;
    prefix?: string;
  } = {}
): string {
  // Default options
  const { length = 32, includeSpecialChars = true, prefix = '' } = options;

  // Define character sets
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numberChars = '0123456789';
  const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

  // Combine character sets
  let characterSet = lowercaseChars + uppercaseChars + numberChars;
  if (includeSpecialChars) {
    characterSet += specialChars;
  }

  // Generate cryptographically secure random bytes
  const randomBytes = crypto.randomBytes(length);

  // Convert random bytes to API key
  const apiKey = randomBytes.reduce((key, byte) => {
    return key + characterSet[byte % characterSet.length];
  }, prefix);

  return apiKey.slice(0, length + prefix.length);
}

/**
 * Decode a base64 string
 * @param {string} base64String - Base64 string to decode
 * @returns {string} Decoded string
 * @throws {Error} Throws an error if the input is not a valid base64 string
 *
 */

export function decodeBase64(base64String: string): string {
  const decodedString = Buffer.from(base64String, 'base64').toString('utf-8');
  return decodedString;
}
