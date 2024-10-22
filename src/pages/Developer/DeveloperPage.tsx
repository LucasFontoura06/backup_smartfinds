import React from 'react';
import { Box, Typography, IconButton, Container, Card, CardContent, CardMedia, Button, useMediaQuery, useTheme } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LanguageIcon from '@mui/icons-material/Language';
import developerImage from '../../assets/lucas_profile.jpg';

interface Developer {
  name: string;
  role: string;
  image: string;
  socialLinks: {
    github: string;
    linkedin: string;
    portfolio: string;
  };
}

const developer: Developer = {
  name: 'Lucas Fontoura Righi Fontes',
  role: 'Desenvolvedor Full Stack',
  image: developerImage,
  socialLinks: {
    github: 'https://github.com/DevLucasFontoura',
    linkedin: 'https://www.linkedin.com/in/lucas-fontoura-706a45212/',
    portfolio: 'https://lucas-fontoura-portfolio.netlify.app/',
  },
};

const DeveloperPage: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: 3,
      }}
    >
      <IconButton
        onClick={() => navigate('/')}
        sx={{
          position: 'absolute',
          top: 16,
          left: 16,
          color: '#333',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 1)',
          }
        }}
      >
        <ArrowBackIcon />
      </IconButton>

      <Typography variant="h3" component="h1" gutterBottom sx={{ mb: 4, fontWeight: 'bold', color: '#333' }}>
        Desenvolvedor
      </Typography>

      <Container maxWidth="sm">
        <Card sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          padding: 4,
          borderRadius: 4,
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          transition: 'box-shadow 0.3s ease-in-out',
          '&:hover': {
            boxShadow: '0 15px 40px rgba(0, 0, 0, 0.15)',
          }
        }}>
          <CardMedia
            component="img"
            sx={{ 
              width: 180, 
              height: 180, 
              borderRadius: '50%', 
              marginBottom: 3,
              border: '4px solid #fff',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            }}
            image={developer.image}
            alt={developer.name}
          />
          <CardContent sx={{ textAlign: 'center', width: '100%' }}>
            <Typography variant="h4" component="div" gutterBottom sx={{ fontWeight: 'bold' }}>
              {developer.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom sx={{ marginBottom: 4 }}>
              {developer.role}
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: isMobile ? 'column' : 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 2,
              width: '100%'
            }}>
              <Button
                variant="outlined"
                startIcon={<GitHubIcon />}
                href={developer.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ borderRadius: 20, minWidth: 200, flexGrow: isMobile ? 0 : 1 }}
              >
                GitHub
              </Button>
              <Button
                variant="outlined"
                startIcon={<LinkedInIcon />}
                href={developer.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ borderRadius: 20, minWidth: 200, flexGrow: isMobile ? 0 : 1 }}
              >
                LinkedIn
              </Button>
              <Button
                variant="outlined"
                startIcon={<LanguageIcon />}
                href={developer.socialLinks.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ 
                  borderRadius: 20, 
                  minWidth: 200, 
                  flexGrow: isMobile ? 0 : 1,
                  flexBasis: isMobile ? 'auto' : 'calc(50% - 8px)', // Ajuste para telas maiores
                  marginTop: isMobile ? 0 : 2
                }}
              >
                Portfólio
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default DeveloperPage;
