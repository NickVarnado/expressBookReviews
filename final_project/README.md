# Express Book Reviews

A simple Express.js API for managing and reviewing books. This project is designed as a coding exercise for learning RESTful API development with Node.js and Express.

## Features

- User registration and authentication
- Add, update, and delete book reviews
- Browse books by ISBN, author, or title
- Modular routing and in-memory data storage

## Project Structure

```
final_project/
  index.js              # Main server entry point
  package.json          # Project dependencies and scripts
  router/
    auth_users.js       # Routes for user authentication and registration
    booksdb.js          # In-memory books database
    general.js          # General book routes
    usersdb.js          # In-memory users database
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher recommended)
- npm (Node package manager)

### Installation

1. Clone this repository:
   ```sh
   git clone <repo-url>
   cd expressBookReviews/final_project
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

### Running the Server

Start the Express server:

```sh
node index.js
```

The server will run on `http://localhost:5000` by default.

## API Endpoints

### User Authentication

- `POST /register` — Register a new user
- `POST /login` — Log in as a registered user

### Book Operations

- `GET /books` — Get all books
- `GET /books/isbn/:isbn` — Get book details by ISBN
- `GET /books/author/:author` — Get books by author
- `GET /books/title/:title` — Get books by title
- `POST /books/review/:isbn` — Add or update a book review (authenticated)
- `DELETE /books/review/:isbn` — Delete a book review (authenticated)

## Notes

- Data is stored in-memory and will reset when the server restarts.
- This project is for educational purposes and not intended for production use.

## License

See [LICENSE](../LICENSE) for details.
