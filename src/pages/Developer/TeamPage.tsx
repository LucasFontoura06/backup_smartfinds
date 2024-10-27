import React from 'react';
import { Box, Typography, IconButton, Container, Card, CardContent, CardMedia, Button, Grid, useMediaQuery, useTheme } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LanguageIcon from '@mui/icons-material/Language';
import lucasImage from '../../assets/lucas_profile.jpg';
import jadisImage from '../../assets/jadis_profile.jpg'; // Adicione a foto do Jadis

interface TeamMember {
  name: string;
  role: string;
  image: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    portfolio?: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    name: 'Lucas Fontoura Righi Fontes',
    role: 'Desenvolvedor Full Stack',
    image: lucasImage,
    socialLinks: {
      github: 'https://github.com/DevLucasFontoura',
      linkedin: 'https://www.linkedin.com/in/lucas-fontoura-706a45212/',
      portfolio: 'https://lucas-fontoura-portfolio.netlify.app/',
    },
  },
  {
    name: 'Jadis',
    role: 'Gestora de Negócios', // ou outro cargo apropriado
    image: jadisImage,
    socialLinks: {
      linkedin: '#', // Adicione o link correto
    },
  },
];

const TeamPage: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const TeamMemberCard: React.FC<{ member: TeamMember }> = ({ member }) => (
    <Card sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      padding: 4,
      borderRadius: 4,
      backgroundColor: '#ffffff',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease-in-out',
      height: '100%',
      width: '100%', // Garante largura total
      maxWidth: '400px', // Limita a largura máxima
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 15px 40px rgba(0, 0, 0, 0.2)',
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
          objectFit: 'cover', // Garante que a imagem cubra o espaço uniformemente
        }}
        image={member.image}
        alt={member.name}
      />
      <CardContent sx={{ 
        textAlign: 'center', 
        width: '100%',
        flex: 1, // Permite que o conteúdo ocupe o espaço disponível
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        <Box>
          <Typography variant="h5" component="div" gutterBottom sx={{ fontWeight: 'bold' }}>
            {member.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom sx={{ marginBottom: 4 }}>
            {member.role}
          </Typography>
        </Box>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          gap: 2,
          width: '100%',
          mt: 'auto' // Empurra os botões para baixo
        }}>
          {member.socialLinks.github && (
            <Button
              variant="outlined"
              startIcon={<GitHubIcon />}
              href={member.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ borderRadius: 20 }}
            >
              GitHub
            </Button>
          )}
          {member.socialLinks.linkedin && (
            <Button
              variant="outlined"
              startIcon={<LinkedInIcon />}
              href={member.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ borderRadius: 20 }}
            >
              LinkedIn
            </Button>
          )}
          {member.socialLinks.portfolio && (
            <Button
              variant="outlined"
              startIcon={<LanguageIcon />}
              href={member.socialLinks.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ borderRadius: 20 }}
            >
              Portfólio
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #1a237e 0%, #121858 100%)', // Fundo azul escuro gradiente
        minHeight: "100vh",
        padding: 3,
      }}
    >
      <IconButton
        onClick={() => navigate('/')}
        sx={{
          position: 'fixed',
          top: 16,
          left: 16,
          color: '#ffffff',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
          }
        }}
      >
        <ArrowBackIcon />
      </IconButton>

      <Container maxWidth="lg" sx={{ pt: 8 }}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom 
          sx={{ 
            mb: 6, 
            textAlign: 'center',
            fontWeight: 'bold', 
            color: '#ffffff', // Texto branco para contrastar com o fundo escuro
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)' // Sombra suave no texto
          }}
        >
          Nossa Equipe
        </Typography>

        <Grid 
          container 
          spacing={4} 
          justifyContent="center"
          alignItems="stretch" // Garante que os items se esticam para ter a mesma altura
          sx={{
            padding: { xs: 1, md: 3 },
            '& .MuiGrid-item': {
              display: 'flex',
              justifyContent: 'center'
            }
          }}
        >
          {teamMembers.map((member, index) => (
            <Grid item xs={12} md={6} key={index} sx={{ display: 'flex' }}>
              <TeamMemberCard member={member} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default TeamPage;
