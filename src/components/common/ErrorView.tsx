import { ErrorOutlineRounded } from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";
import { ErrorResponse } from "src/hooks/useBooks";

const ErrorView = ({ error }: { error: ErrorResponse }) => (
  <Grid
    container
    spacing={0}
    direction="column"
    alignItems="center"
    justifyContent="center"
    sx={{ minHeight: "100vh" }}
  >
    <Grid item xs={3}>
      <Typography variant="h5" align="center" alignItems="center" display="flex">
        <ErrorOutlineRounded sx={{ marginRight: 1 }} /> {error.message}
      </Typography>
    </Grid>
  </Grid>
);

export default ErrorView;
