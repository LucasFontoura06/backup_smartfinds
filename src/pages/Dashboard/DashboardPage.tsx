// src/pages/DashboardPage.tsx

import React from "react";
import { Box, Paper, Typography, Container } from "@mui/material";
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

const DashboardPage: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <RocketLaunchIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
          <Typography variant="h4" gutterBottom>
            Dashboard em Construção
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Estamos trabalhando duro para trazer a você um dashboard incrível.
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Em breve, você terá acesso a todas as informações importantes do seu sistema aqui.
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default DashboardPage;
