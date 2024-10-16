// src/pages/ProductsPage.tsx
import React from "react";
import ListProducts from "../../components/ListProducts"; // Importe o componente que criamos
import { Typography } from "@mui/material";
import { CONSTANTES } from "../../commom/constantes";

const ProductsPage: React.FC = () => {
  return (
    <div>
      <Typography
          variant="h4" // Define o tamanho do título
          align="center" // Centraliza o título
          sx={{ fontWeight: 'bold', marginBottom: 6, marginTop: 4 }} // Estilo adicional para aumentar o tamanho e margem
        >
          {CONSTANTES.LBL_TITLE_PAGE}
        </Typography>
      <ListProducts />
    </div>
  );
};

export default ProductsPage;
