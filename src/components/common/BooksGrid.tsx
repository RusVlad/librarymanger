import { Delete, Edit } from "@mui/icons-material";
import {
  Grid,
  Card,
  CardHeader,
  Typography,
  Box,
  styled,
  Rating,
  Divider,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Book } from "src/domain/Book";
import ConfirmationModal from "./ConfirmationModal";

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.grey[50],
  ":hover": {
    backgroundColor: theme.palette.grey[100],
    boxShadow: theme.shadows[1],
  },
}));

interface BookGridProps {
  books: Book[];
  onDelete: (id: number) => Promise<void>;
}

const BookGrid: React.FC<BookGridProps> = ({ books, onDelete }) => {
  const navigate = useNavigate();

  return (
    <>
      <Grid
        container
        spacing={{ xs: 1, md: 2 }}
        columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}
      >
        {books.length === 0 && (
          <Typography variant="h6" sx={{ padding: 2 }}>
            No books available
          </Typography>
        )}
        {books.map((book: Book, index: number) => (
          <Grid xs={4} sm={4} md={4} key={index} item>
            <StyledCard
              variant="outlined"
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <CardHeader
                title={book.title}
                subheader={book.author}
                style={{ textAlign: "left" }}
                onClick={() => navigate(`/${book.id}`)}
                sx={{
                  paddingX: 1.5,
                  paddingBottom: 0.5,
                  color: "primary.dark",
                  ":hover": {
                    cursor: "pointer",
                    color: "primary.light",
                  },
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  paddingX: 1.5,
                  flex: 1,
                }}
              >
                <Box display="flex" flexDirection="column" flex="1">
                  <Typography variant="caption" color="text.secondary">
                    {book.genre}
                  </Typography>
                  <Rating
                    name="read-only"
                    value={book.rating}
                    readOnly
                    size="small"
                    sx={{ marginLeft: "-3px"}}
                  />
                </Box>
                <Divider sx={{ marginTop: 1 }} />
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <ConfirmationModal
                    isIconButton
                    buttonIcon={<Delete />}
                    title={book.title}
                    message="Are you sure you want to delete this book?"
                    onConfirm={() => onDelete(book.id)}
                  />
                  <IconButton
                    color="primary"
                    onClick={() => {
                      navigate(`/edit/${book.id}`);
                    }}
                  >
                    <Edit />
                  </IconButton>
                </Box>
              </Box>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default BookGrid;
