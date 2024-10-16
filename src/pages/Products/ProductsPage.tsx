import ListProducts from "../../components/ListProducts"; 
import { CONSTANTES } from "../../commom/constantes";
import { Typography } from "@mui/material";
import React from "react";

const ProductsPage: React.FC = () => {
  return (
    <div>
      <Typography
          variant="h4" 
          align="center" 
          sx={{ fontWeight: 'bold', marginBottom: 6, marginTop: 4 }} 
        >
          {CONSTANTES.LBL_TITLE_PAGE}
        </Typography>
      <ListProducts />
    </div>
  );
};

export default ProductsPage;
