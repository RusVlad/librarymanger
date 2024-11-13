import { Route, Routes } from "react-router-dom";

import Dashboard from "src/components/pages/Dashboard";
import Create from "src/components/pages/Create";
import Edit from "src/components/pages/Edit";
import Details from "src/components/pages/Details";

import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, responsiveFontSizes, ThemeProvider } from "@mui/material/styles";

import { Container } from "@mui/material";
import { grey } from "@mui/material/colors";

let theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: grey[200],
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Container maxWidth="xl" sx={{ alignItems: "flex-start" }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/create" element={<Create />} />
          <Route path="/:id" element={<Details />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
