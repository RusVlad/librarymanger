import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Divider,
  Paper,
  Rating,
  Typography,
} from "@mui/material";
import StatusCaption from "../common/StatusCaption";
import { Face } from "@mui/icons-material";
import { styled } from "@mui/system";
import { useLayoutEffect, useState } from "react";
import useBooks, { ErrorResponse } from "src/hooks/useBooks";
import Loading from "../common/Loading";
import ErrorView from "../common/ErrorView";

const StyledHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 8,
    '& .title': {
      marginBottom: 8
    },
    '& .author-genre': {
      alignItems: "flex-start",
      margin: 0
    }
  },
}));

const Details = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<ErrorResponse | null>(null);
  const { id } = useParams();
  const { selectedBook: book, getBook } = useBooks();

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

  if (error) {
    return <ErrorView error={error} />;
  }

  return (
    <Box display="flex" flexDirection="column" alignItems={"center"}>
      {book ? (
        <Paper
          sx={{
            padding: 4,
            marginTop: 4,
            marginBottom: 4,
            maxWidth: "960px",
            width: "100%",
          }}
        >
          <div>
            <StyledHeader>
              <Box>
                <Typography className="title" variant="h2">{book.title}</Typography>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="flex-start"
                >
                  <Rating value={4} readOnly />
                  <StatusCaption status={book.status} />
                </Box>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="flex-start"
                alignItems="flex-end"
                marginTop={2.5}
                color="GrayText"
                className="author-genre"
              >
                <Box display="flex" alignItems="center">
                  <Face sx={{ marginRight: 0.5 }} />
                  <Typography noWrap variant="subtitle1">{book.author}</Typography>
                </Box>
                <Typography variant="caption">{book.genre}</Typography>
              </Box>
            </StyledHeader>
          </div>
          <p dangerouslySetInnerHTML={{ __html: book.description }}></p>
          <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
          <Box display={"flex"} justifyContent={"flex-end"}>
            <Button
              variant="contained"
              onClick={() => {
                navigate(-1);
              }}
            >
              Back
            </Button>
            <Button
              sx={{ marginLeft: 1 }}
              variant="contained"
              onClick={() => {
                navigate(`/edit/${id}`);
              }}
            >
              Edit
            </Button>
          </Box>
        </Paper>
      ) : (
        <Loading />
      )}
    </Box>
  );
};

export default Details;
