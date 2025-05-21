const express = require("express");
const {
  fetchBookByAuthor,
  fetchBookByIsbn,
  fetchBookByTitle,
  fetchBooks,
} = require("./booksdb.js");
const { isValid, users } = require("./usersdb.js");
const public_users = express.Router();

/**
 * @route POST /register
 * @group Users - Operations about users
 * @summary Register a new user
 * @param {string} username.body.required - The username to register
 * @param {string} password.body.required - The password for the user
 * @returns {201} User registered successfully
 * @returns {400} Username or password is missing, or user already exists
 */
public_users.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (!username) {
    return res.status(400).json({ message: "Username is required" });
  }
  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }
  if (!isValid(username)) {
    return res.status(400).json({ message: "User already exists" });
  }
  users.push({ username, password });
  return res.status(201).json({ message: "User registered successfully" });
});

/**
 * @route GET /
 * @group Books - Operations about books
 * @summary Get the list of all books
 * @returns {200} List of books
 * @returns {500} Internal Server Error
 */
public_users.get("/", async (_, res) => {
  try {
    const books = await fetchBooks();
    console.log("books", books);
    return res.status(200).json({ books });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

/**
 * @route GET /isbn/:isbn
 * @group Books
 * @summary Get book details by ISBN
 * @param {string} isbn.path.required - ISBN of the book
 * @returns {200} Book details
 * @returns {400} ISBN is required
 * @returns {404} Book for given ISBN not found
 * @returns {500} Internal Server Error
 */
public_users.get("/isbn/:isbn", async (req, res) => {
  try {
    const { isbn } = req.params;
    if (!isbn) {
      return res.status(400).json({ message: "ISBN is required" });
    }
    const book = await fetchBookByIsbn(isbn);
    if (book) {
      return res.status(200).json({ book });
    }
    return res
      .status(404)
      .json({ message: `Book with ISBN ${isbn} not found` });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

/**
 * @route GET /author/:author
 * @group Books
 * @summary Get books by author
 * @param {string} author.path.required - Author's name
 * @returns {200} List of books by the author
 * @returns {400} Author is required
 * @returns {500} Internal Server Error
 */
public_users.get("/author/:author", async (req, res) => {
  try {
    const { author } = req.params;
    if (!author) {
      return res.status(400).json({ message: "Author is required" });
    }
    const booksByAuthor = await fetchBookByAuthor(author);
    return res.status(200).json({ books: booksByAuthor });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

/**
 * @route GET /title/:title
 * @group Books
 * @summary Get book by title
 * @param {string} title.path.required - Title of the book
 * @returns {200} Book details
 * @returns {400} Title is required
 * @returns {404} Book not found
 * @returns {500} Internal Server Error
 */
public_users.get("/title/:title", async (req, res) => {
  try {
    const { title } = req.params;
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
    const book = await fetchBookByTitle(title);
    if (book) {
      return res.status(200).json({ book });
    }
    return res
      .status(404)
      .json({ message: `Book with title ${title} not found` });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

/**
 * @route GET /review/:isbn
 * @group Books
 * @summary Get reviews for a book by ISBN
 * @param {string} isbn.path.required - ISBN of the book
 * @returns {200} Book reviews
 * @returns {400} ISBN is required
 * @returns {404} Book not found
 * @returns {500} Internal Server Error
 */
public_users.get("/review/:isbn", async (req, res) => {
  try {
    const { isbn } = req.params;
    if (!isbn) {
      return res.status(400).json({ message: "ISBN is required" });
    }
    const book = await fetchBookByIsbn(isbn);
    if (book) {
      return res.status(200).json({ reviews: book.reviews });
    }
    return res
      .status(404)
      .json({ message: `Book with ISBN ${isbn} not found` });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

module.exports.general = public_users;
