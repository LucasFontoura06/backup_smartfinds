import React from 'react';
import ProductList from '../../components/Card';
import { Typography, Box } from '@mui/material';

export default function HomePage() {
  return (
    <Box
      sx={{
        backgroundColor: '#001529', // Cor de fundo
        minHeight: '100vh', // Para cobrir toda a altura da tela
        padding: 0, // Remove qualquer padding
        margin: 0, // Remove qualquer margem
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Centraliza os itens horizontalmente
      }}
    >
      <Typography
        variant="h4"
        align="center"
        sx={{ fontWeight: 'bold', marginBottom: 6, marginTop: 4, color: '#fff' }} // Ajuste de cor para o texto
      >
        Seja Bem Vindo a Nossa Loja!
      </Typography>
      <ProductList />
    </Box>
  );
}
