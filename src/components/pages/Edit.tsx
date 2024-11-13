import { Box, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Form from "../common/Form";
import { Book } from "src/domain/Book";
import useBooks, { ErrorResponse } from "src/hooks/useBooks";
import { useLayoutEffect, useState } from "react";
import Loading from "../common/Loading";

const Create = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { selectedBook: book, getBook, updateBook } = useBooks();
  const [error , setError] = useState<ErrorResponse | null>(null);

  const onSubmit = async (values: Book) => {
    const res = await updateBook(values, Number(id));
    if (res instanceof Error) {
      setError(res);
      return;
    }

    navigate(-1);
  };

  useLayoutEffect(() => {
    (
      async () => {
        const res = await getBook(Number(id));
        if (res instanceof Error) {
          setError(res);
        }
      }
    )();
  }, []);

  return (
    <Box
      sx={{ display: "flex", alignItems: "center", flexDirection: "column", marginTop: 6 }}
    >
      {!book ? (
        <Loading />
      ) : (
        <>
          <Form
            isEdit={true}
            title={book.title}
            author={book.author}
            genre={book.genre}
            description={book.description}
            onSubmitCallback={(values) => onSubmit(values as Book)}
            onCancelCallback={() => navigate(-1)}
            rating={book.rating}
            status={book.status}
          />
          { error && <Typography marginY={2} color={'error'} variant="body2">{error.message}</Typography> }
        </>
      )}
    </Box>
  );
};

export default Create;
