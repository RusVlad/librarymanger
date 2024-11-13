import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Form from "../common/Form";
import { Book } from "src/domain/Book";
import useBooks, { ErrorResponse } from "src/hooks/useBooks";
import { useState } from "react";

const Create = () => {
  const navigate = useNavigate();
  const { createBook } = useBooks();
  const [error , setError] = useState<ErrorResponse | null>(null);

  const onSubmit = async (values: Book) => {
    const res = await createBook(values);
    if (res instanceof Error) {
      setError(res);
      return;
    }

    navigate(-1);
  };

  return (
    <Box
      sx={{ display: "flex", alignItems: "center", flexDirection: "column", marginTop: 6 }}
    >
      <Form
        onSubmitCallback={(values) => onSubmit(values as Book)}
        onCancelCallback={() => navigate(-1)}
        title=""
        author=""
        genre=""
        description=""
        rating={null}
        status={null}
      />
      { error && <Typography marginY={2} color={'error'} variant="body2">{error.message}</Typography> }
    </Box>
  );
};

export default Create;
