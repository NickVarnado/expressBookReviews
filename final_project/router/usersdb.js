const users = [];

/**
 * Check if the username is valid. The username must be unique.
 * @param {string} username The username to check
 * @returns {boolean} Whether the username is valid or not
 */
const isValid = (username) => {
  return !users.find((user) => user.username === username);
};

/**
 * Check if the user is authenticated.
 * Simulates a database lookup.
 * @param {string} username The username of the user
 * @param {string} password The password of the user
 * @returns {Promise<boolean>} Whether the user is authenticated or not
 */
const authenticatedUser = async (username, password) => {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        resolve(
          (user = users.find(
            (user) => user.username === username && user.password === password
          ))
        );
      }, 300);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { users, isValid, authenticatedUser };
