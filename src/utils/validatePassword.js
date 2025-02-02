/**
 * Validates a password to ensure it meets these criteria:
 * - At least 8 characters long
 * - Contains at least one uppercase letter
 * - Contains at least one lowercase letter
 * - Contains at least one number
 * - Contains at least one special character (!@#$%^&* etc.)
 *
 * @param {string} password - The password string to validate.
 * @returns {boolean} - True if valid, false otherwise.
 */

export function validatePassword(password) {
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
  return passwordRegex.test(password);
}
