const express = require("express");
const jwt = require("jsonwebtoken");
const regd_users = express.Router();

const { fetchBookByIsbn } = require("./booksdb");
const { authenticatedUser } = require("./usersdb");

const secretKey = process.env.JWT_SECRET;

/**
 * @route POST /login
 * @group Auth
 * @summary Authenticates a registered user and returns a JWT token.
 * @param {string} username.body.required - Username
 * @param {string} password.body.required - Password
 * @returns {200} User successfully logged in
 * @returns {400} Username or password is missing
 * @returns {401} Invalid username or password
 * @returns {500} Internal Server Error
 */
regd_users.post("/login", async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }
    const isAuthenticated = await authenticatedUser(username, password);
    if (!isAuthenticated) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    let accessToken = jwt.sign({ data: password }, secretKey, {
      expiresIn: 60 * 60,
    });
    req.session.authorization = { accessToken, username };
    return res.status(200).send("User successfully logged in");
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

/**
 * @route PUT /auth/review/:isbn
 * @group Auth
 * @summary Adds or updates a book review for the authenticated user.
 * @param {string} isbn.path.required - ISBN of the book
 * @param {string} review.body.required - Review text
 * @returns {200} Review added/updated successfully
 * @returns {400} Review is required
 * @returns {401} Unauthorized
 * @returns {404} Book not found
 * @returns {500} Internal Server Error
 */
regd_users.put("/auth/review/:isbn", async (req, res) => {
  try {
    const username = req.session?.authorization?.username;
    if (!username) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const book = await fetchBookByIsbn(req.params.isbn);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    const { review } = req.body;
    if (!review) {
      return res.status(400).json({ message: "Review is required" });
    }
    const currentUserReview = Object.keys(book.reviews).find(
      (username) => username === username
    );
    book.reviews[username] = review;
    const addedOrUpdated = !currentUserReview ? "added" : "updated";
    return res.status(200).json({
      message: `Review ${addedOrUpdated} successfully for ${book.title}`,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

/**
 * @route DELETE /auth/review/:isbn
 * @group Auth
 * @summary Deletes the authenticated user's review for a book.
 * @param {string} isbn.path.required - ISBN of the book
 * @returns {200} Review deleted successfully
 * @returns {401} Unauthorized
 * @returns {404} Book or review not found
 * @returns {500} Internal Server Error
 */
regd_users.delete("/auth/review/:isbn", async (req, res) => {
  try {
    const username = req.session?.authorization?.username;
    if (!username) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const book = await fetchBookByIsbn(req.params.isbn);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    if (!book.reviews[username]) {
      return res.status(404).json({ message: "Review not found" });
    }
    delete book.reviews[username];
    return res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports.authenticated = regd_users;
module.exports.secretKey = secretKey;
