import useSWR from "swr";
import axios from "src/services/axios";
import * as axiosObj from "axios";
import { Book } from "src/domain/Book";
import { useCallback, useState } from "react";

export interface ErrorResponse {
  message: string;
}

const isBook = (response: unknown): response is Book =>
  typeof response === "object" &&
  response !== null &&
  "id" in response &&
  "title" in response &&
  "author" in response &&
  "description" in response &&
  "genre" in response;

const getErrorObject = (
  error: unknown,
  customMessage: string = "Error"
): ErrorResponse => {
  const message = axiosObj.isAxiosError(error)
    ? `${customMessage} | Reason: ${error.message}`
    : "An unexpected error occurred";
  console.error(message, error);
  return Error(message);
};

export const useBooks = (callback?: (arg?: unknown) => void) => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const fetcher = async (url: string) => {
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (error) {
      throw getErrorObject(error, "Failed to fetch books");
    }
  };

  const { data, error, mutate } = useSWR<Book[], Error>("/books", fetcher, {
    onSuccess: () => {
      if (callback) {
        callback();
      }
    },
  });

  const getBook = useCallback(
    async (id: number): Promise<Book | ErrorResponse> => {
      try {
        if (data) {
          const book = data.find((b) => b.id === id);
          if (!book) return getErrorObject(new Error("Book not found"));
          setSelectedBook(book);
          return book;
        }

        const result = await axios.get<Book>(`/books/${id}`);
        if (isBook(result.data)) {
          setSelectedBook(result.data);
          return result.data;
        } else throw new Error("Invalid book data");
      } catch (error) {
        console.error("this is the error");
        return getErrorObject(error, "Failed to fetch book");
      }
    },
    [data]
  );

  const createBook = useCallback(
    async (book: Book): Promise<Book | ErrorResponse> => {
      try {
        const result = await axios.post<Book>("/books", book);
        if (isBook(result.data)) {
          mutate([...data || [], result.data], false);
          return result.data;
        } else throw new Error("Invalid book data");
      } catch (error) {
        return getErrorObject(error, "Failed to create book");
      }
    },
    [data, mutate]
  );

  const updateBook = useCallback(
    async (book: Book, id: number): Promise<Book | ErrorResponse> => {
      try {
        const result = await axios.put<Book>(`/books/${id}`, book);
        if (isBook(result.data)) {
          const updatedBooks = (data || []).map((b) =>
            b.id === id ? result.data : b
          );
          mutate(updatedBooks);
          return result.data;
        } else throw new Error("Invalid book data");
      } catch (error) {
        return getErrorObject(error, "Failed to update book");
      }
    },
    [data, mutate]
  );

  const deleteBook = useCallback(
    async (id: number) => {
      try {
        await axios.delete(`/books/${id}`);
        if (!data) return;
        mutate(
          data.filter((b) => b.id !== id),
          false
        );
      } catch (error) {
        return getErrorObject(error, "Failed to delete book");
      }
    },
    [data, mutate]
  );

  return {
    data,
    selectedBook,
    error,
    mutate,
    createBook,
    updateBook,
    deleteBook,
    getBook,
  };
};

export default useBooks;
