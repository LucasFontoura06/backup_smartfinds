import ListProducts from "../../components/ListProducts";
import { CONSTANTES } from "../../commom/constantes";
import { Typography, Box } from "@mui/material"; // Importando o Box para layout
import React from "react";

const ProductsPage: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#ffffff", // Fundo da página
        minHeight: "100vh", // Altura mínima para cobrir toda a viewport
        padding: 4, // Espaçamento em torno do conteúdo
      }}
    >
      <Typography
        variant="h4"
        align="center"
        sx={{ 
          fontWeight: 'bold', 
          marginBottom: 6, 
          marginTop: 4, 
          color: '#000' // Alterando a cor do título para se ajustar ao fundo escuro
        }}
      >
        {CONSTANTES.LBL_TITLE_PAGE}
      </Typography>
      <ListProducts />
    </Box>
  );
};

export default ProductsPage;
