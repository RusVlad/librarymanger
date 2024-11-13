import {
  Typography,
  Box,
  Button,
  Paper,
  Divider,
  TextField,
  styled,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import BooksGrid from "src/components/common/BooksGrid";
import BooksTable from "src/components/common/BooksTable";
import { useNavigate } from "react-router-dom";
import { Add, GridView, Search, ViewList } from "@mui/icons-material";
import { useMemo, useState } from "react";
import useBooks from "src/hooks/useBooks";
import ErrorView from "../common/ErrorView";
import Loading from "../common/Loading";

const StyledTitle = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const StyledFilters = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: "auto",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    flexDirection: "column",
    gap: "16px",

    "& .MuiBox-root": {
      width: "100%",
      justifyContent: "space-between",
    },
  },
}));

const StyledSearch = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "flex-end",
  marginRight: "8px",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    marginRight: 0,

    "& .MuiTextField-root": {
      width: "100%",
    },
  },
}));

const Dashboard = () => {
  const navigate = useNavigate();
  const { data: books, error, deleteBook } = useBooks();
  const [view, setView] = useState(localStorage.getItem("view") || "grid");
  const [search, setSearch] = useState("");

  const onDelete = async (id: number) => {
    try {
      await deleteBook(id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleViewChange = (view: string) => {
    localStorage.setItem("view", view);
    setView(view);
  };

  const filteredBooks = useMemo(() => {
    if (!books) return [];
    return books.filter((book) => {
      return book.title.toLowerCase().includes(search.toLowerCase());
    });
  }, [books, search]);

  if (error) {
      return <ErrorView error={error} />
  }
  return (
    <div>
      <Paper sx={{ padding: 2, marginTop: 4, marginBottom: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <StyledTitle variant="h4">Your books</StyledTitle>
          <StyledFilters>
            <StyledSearch>
              <Search sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                id="input-with-sx"
                label="Search"
                variant="standard"
                onChange={($e) => setSearch($e.target.value)}
                value={search}
              />
            </StyledSearch>
            <Box display="flex">
              <ToggleButtonGroup
                size="small"
                color="primary"
                value={view}
                exclusive
                onChange={(_, value) => handleViewChange(value)}
                aria-label="grid view style"
              >
                <ToggleButton value="grid">
                  <GridView />
                </ToggleButton>
                <ToggleButton value="list">
                  <ViewList />
                </ToggleButton>
              </ToggleButtonGroup>
              <Button
                size="small"
                variant="outlined"
                endIcon={<Add />}
                onClick={() => navigate("/create")}
                sx={{ marginLeft: 2 }}
              >
                Add
              </Button>
            </Box>
          </StyledFilters>
        </Box>
        <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
        {!filteredBooks ? (
          <Loading />
        ) : view === "grid" ? (
          <BooksGrid books={filteredBooks} onDelete={onDelete} />
        ) : (
          <BooksTable books={filteredBooks} onDelete={onDelete} />
        )}
      </Paper>
    </div>
  );
};

export default Dashboard;
