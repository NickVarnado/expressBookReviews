let books = {
  1: {
    author: "Chinua Achebe",
    title: "Things Fall Apart",
    reviews: {},
    isbn: "9780385474542",
  },
  2: {
    author: "Hans Christian Andersen",
    title: "Fairy tales",
    reviews: {},
    isbn: "9780143039525",
  },
  3: {
    author: "Dante Alighieri",
    title: "The Divine Comedy",
    reviews: {},
    isbn: "9780142437223",
  },
  4: {
    author: "Unknown",
    title: "The Epic Of Gilgamesh",
    reviews: {},
    isbn: "9780140449198",
  },
  5: {
    author: "Unknown",
    title: "The Book Of Job",
    reviews: {},
    isbn: "9780199538895",
  },
  6: {
    author: "Unknown",
    title: "One Thousand and One Nights",
    reviews: {},
    isbn: "9780140442892",
  },
  7: {
    author: "Unknown",
    title: "Nj\u00e1l's Saga",
    reviews: {},
    isbn: "9780140447699",
  },
  8: {
    author: "Jane Austen",
    title: "Pride and Prejudice",
    reviews: {},
    isbn: "9780141439518",
  },
  9: {
    author: "Honor\u00e9 de Balzac",
    title: "Le P\u00e8re Goriot",
    reviews: {},
    isbn: "9780140449723",
  },
  10: {
    author: "Samuel Beckett",
    title: "Molloy, Malone Dies, The Unnamable, the trilogy",
    reviews: {},
    isbn: "9780802144478",
  },
};

/**
 * Fetch all books.
 * @returns {Promise<Object>} A promise that resolves with the books object.
 */
const fetchBooks = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(books);
    }, 1000);
  });
};

/**
 * Fetch a book by its ISBN.
 * @param {string} isbn - The ISBN of the book to fetch.
 * @returns {Promise<Object|null>} A promise that resolves with the book object or null if not found.
 */
const fetchBookByIsbn = (isbn) => {
  return new Promise((resolve) => {
    const book = Object.values(books).find((b) => b.isbn === isbn);
    setTimeout(() => {
      resolve(book || null);
    }, 1000);
  });
};

/**
 * Fetch books by author.
 * @param {string} author - The author of the books to fetch.
 * @returns {Promise<Array>} A promise that resolves with an array of book objects by the author.
 */
const fetchBookByAuthor = (author) => {
  return new Promise((resolve) => {
    const booksByAuthor = Object.values(books).filter(
      (b) => b.author === author
    );
    setTimeout(() => {
      resolve(booksByAuthor);
    }, 1000);
  });
};

/**
 * Fetch a book by its title.
 * @param {string} title - The title of the book to fetch.
 * @returns {Promise<Object|null>} A promise that resolves with the book object or null if not found.
 */
const fetchBookByTitle = (title) => {
  return new Promise((resolve) => {
    const book = Object.values(books).find((b) => b.title === title);
    setTimeout(() => {
      resolve(book || null);
    }, 1000);
  });
};

module.exports = {
  books,
  fetchBooks,
  fetchBookByIsbn,
  fetchBookByAuthor,
  fetchBookByTitle,
};
