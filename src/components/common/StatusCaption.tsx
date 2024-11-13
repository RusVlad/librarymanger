import { Box, Typography } from "@mui/material";
import { Status, statusIcons } from "src/domain/Book";

const StatusCaption = ({ status }: { status: Status }) => {
  if (!status) return null;
  return (
    <Box display="flex" marginTop={.5} color="GrayText">
      {statusIcons[status]}
      <Typography marginLeft={1}>{status}</Typography>
    </Box>
  );
};

export default StatusCaption;
