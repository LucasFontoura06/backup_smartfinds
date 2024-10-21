import React from "react";
import { Box, Typography } from "@mui/material";
import { CONSTANTES } from "../commom/constantes";

const Footer: React.FC = () => {
  return (
    <Box sx={{ p: 2, textAlign: "center", backgroundColor: "#f0f2f5", width: '100%' }}> {/* Adicionando cor de fundo e largura total */}
      <Typography variant="body2">
        {CONSTANTES.LBL_FOOTER}
      </Typography>
    </Box>
  );
};

export default Footer;
