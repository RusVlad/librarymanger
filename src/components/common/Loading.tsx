import { HourglassBottom } from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";

const Loading = () => (
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
        <HourglassBottom sx={{ marginRight: 1 }} /> Loading...
      </Typography>
    </Grid>
  </Grid>
);

export default Loading;
