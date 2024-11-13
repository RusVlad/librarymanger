import { Delete, Edit, MoreVert, RemoveRedEye } from "@mui/icons-material";
import {
  List,
  Table,
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  styled,
  Typography,
  Rating,
  IconButton,
  MenuItem,
  Menu,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Book } from "src/domain/Book";
import ConfirmationModal from "./ConfirmationModal";
import React, { useState } from "react";

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.grey[300]
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  "&:hover": {
    backgroundColor: theme.palette.grey[300],
  }
}));

const DesktopOnlyTableCell = styled(TableCell)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    }
  }
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
  boxShadow: theme.shadows[1],
}));

interface BookGridProps {
  books: Book[];
  onDelete: (id: number) => Promise<void>;
}

const BookGrid: React.FC<BookGridProps> = ({ books, onDelete }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <List>
        <TableContainer component={Paper}>
          <Table aria-label="books table" size="small">
            <StyledTableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <DesktopOnlyTableCell align="left">Author</DesktopOnlyTableCell>
                <TableCell align="left">Genre</TableCell>
                <DesktopOnlyTableCell align="left">Rating</DesktopOnlyTableCell>
                <DesktopOnlyTableCell align="left">Status</DesktopOnlyTableCell>
                <TableCell sx={{ paddingRight: 7 }} align="right">
                  Actions
                </TableCell>
              </TableRow>
            </StyledTableHead>

            <TableBody>
              {books.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4}>
                    <Typography variant="subtitle1" sx={{ padding: 2 }}>Found nothing...</Typography>
                  </TableCell>
                </TableRow>
              )}
              {books.map((book: Book) => (
                <StyledTableRow key={book.id}>
                  <TableCell onClick={() => navigate(`/${book.id}`)} sx={{
                    cursor: "pointer",
                    color: "primary.main",
                    '&:hover': {
                      color: "primary.dark"
                    }
                  }}>{book.title}</TableCell>
                  <DesktopOnlyTableCell align="left">{book.author}</DesktopOnlyTableCell>
                  <TableCell align="left">{book.genre}</TableCell>
                  <DesktopOnlyTableCell align="left">
                    <Rating
                      name="read-only"
                      value={book.rating}
                      readOnly
                      size="small"
                    />
                  </DesktopOnlyTableCell>
                  <DesktopOnlyTableCell align="left">{book.status}</DesktopOnlyTableCell>
                  <TableCell align="right">
                  <IconButton
                      id={book.id.toString() + "-menuButton"}
                      aria-controls={open ? book.id.toString() : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                      onClick={openMenu}
                    >
                      <MoreVert />
                    </IconButton>
                    {
                      anchorEl && anchorEl.id === book.id.toString() + "-menuButton" ?
                      <StyledMenu
                        id={book.id.toString()}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                      >
                        <MenuItem>
                          <ConfirmationModal
                            buttonIcon={<Delete />}
                            buttonText="Delete"
                            title={book.title}
                            message="Are you sure you want to delete this book?"
                            onConfirm={() => onDelete(book.id)}
                          />
                        </MenuItem>
                        <MenuItem>
                          <Button
                            color="primary"
                            startIcon={<RemoveRedEye />}
                            onClick={() => {
                              navigate(`/${book.id}`);
                            }}
                          >
                            View
                          </Button>
                        </MenuItem>
                        <MenuItem>
                          <Button
                            color="primary"
                            startIcon={<Edit />}
                            onClick={() => {
                              navigate(`/edit/${book.id}`);
                            }}
                          >
                            Edit
                          </Button>
                        </MenuItem>
                      </StyledMenu> : null
                    }
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </List>
    </>
  );
};

export default BookGrid;
