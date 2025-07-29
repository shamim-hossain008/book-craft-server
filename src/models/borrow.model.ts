import { Document, model, Schema } from "mongoose";
import { IBorrow } from "../interface/borrow.interface";
import { Book } from "./book.model";

interface IBorrowDocument extends IBorrow, Document {}

const borrowSchema = new Schema<IBorrowDocument>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    dueDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Pre-save middleware
borrowSchema.pre("save", async function (next) {
  try {
    const borrow = this;
    const book = await Book.findById(borrow.book);

    if (!book) {
      throw new Error("Book not found");
    }
    if (book.copies < borrow.quantity) {
      throw new Error("Not enough copies available to borrow");
    }

    // update copies and availability
    book.copies -= borrow.quantity;
    await book.save();

    await Book.updateAvailability(book.id.toString())

    next();
  } catch (error) {
    next(error as Error);
  }
});

export const Borrow = model<IBorrowDocument>("Borrow", borrowSchema);
