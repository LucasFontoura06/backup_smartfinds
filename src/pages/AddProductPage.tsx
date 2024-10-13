import React from "react";
import AddProductForm from "../components/addProduct";
import { Box } from "@mui/material";

const AddProductPage: React.FC = () => {
  return (
    <Box sx={{ padding: 4 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <h1>Cadastro de Produto</h1>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <AddProductForm />
      </Box>
    </Box>
  );
};

export default AddProductPage;
