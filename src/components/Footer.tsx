import React from "react";
import { Box, Typography } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Box sx={{ p: 2, textAlign: "center" }}>
      <Typography variant="body2">
        © 2024 Click Shopper
      </Typography>
    </Box>
  );
};

export default Footer;
