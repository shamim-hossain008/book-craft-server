import express, { NextFunction, Request, Response } from "express";
import { Book } from "../models/book.model";
import { success } from "../utils/apiRes";

export const booksRoutes = express.Router();

// Create Book /api/books
booksRoutes.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const book = await Book.create(req.body);
      res.status(201).json(success("Book created successfully..", book));
    } catch (error) {
      next(error);
    }
  }
);

// Get /api/books.  All books
booksRoutes.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const books = await Book.find();

      res.json(books);
    } catch (error) {
      next(error);
    }
  }
);

// Get /api/books/:bookId  single book-craft

booksRoutes.get(
  "/:bookId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const book = await Book.findById(req.params.bookId);
      if (!book) return res.status(404).json({ message: "Book not found" });

      res.status(201).json(success("Book retrieved successfully", book));
    } catch (error) {
      next(error);
    }
  }
);

// PATCH updated book
booksRoutes.patch(
  "/:bookId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const book = await Book.findByIdAndUpdate(req.params.bookId, req.body, {
        new: true,
        runValidators: true,
      });
      if (!book) {
        throw new Error("Book not found");
      }
      await Book.updateAvailability(book.id.toString());
      res.status(201).json(success("Book updated successfully"));
    } catch (error) {
      next(error);
    }
  }
);

// delete book
booksRoutes.delete(
  "/:bookId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bookId = req.params.bookId;
      const book = await Book.findByIdAndDelete(bookId);

      if (!book) {
        throw new Error("Book not found");
      }

      res.status(201).json(success("Book deleted successfully", book));
    } catch (error) {
      next(error);
    }
  }
);
