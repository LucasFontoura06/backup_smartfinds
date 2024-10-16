import React from "react";
import { Box, Typography } from "@mui/material";
import { CONSTANTES } from "../commom/constantes";

const Footer: React.FC = () => {
  return (
    <Box sx={{ p: 2, textAlign: "center" }}>
      <Typography variant="body2">
        {CONSTANTES.LBL_FOOTER}
      </Typography>
    </Box>
  );
};

export default Footer;
