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
  // {
  //   name: 'Jadis',
  //   role: 'Gestora de Negócios', // ou outro cargo apropriado
  //   image: jadisImage,
  //   socialLinks: {
  //     linkedin: '#', // Adicione o link correto
  //   },
  // },
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
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      color: '#ffffff',
      transition: 'all 0.3s ease-in-out',
      height: '100%',
      width: '100%',
      maxWidth: '400px',
      '&:hover': {
        transform: 'translateY(-5px)',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
      }
    }}>
      <CardMedia
        component="img"
        sx={{ 
          width: 180, 
          height: 180, 
          borderRadius: '50%', 
          marginBottom: 3,
          border: '4px solid rgba(255, 255, 255, 0.8)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
          objectFit: 'cover',
        }}
        image={member.image}
        alt={member.name}
      />
      <CardContent sx={{ 
        textAlign: 'center', 
        width: '100%',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 2,
        '& > *': { marginBottom: 0 }
      }}>
        <Box>
          <Typography variant="h5" component="div" gutterBottom sx={{ 
            fontWeight: 'bold',
            color: '#ffffff',
          }}>
            {member.name}
          </Typography>
          <Typography variant="subtitle1" gutterBottom sx={{ 
            marginBottom: 4,
            color: 'rgba(255, 255, 255, 0.9)',
          }}>
            {member.role}
          </Typography>
        </Box>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          gap: 2,
          width: '100%',
          mt: 'auto'
        }}>
          {member.socialLinks.github && (
            <Button
              variant="outlined"
              startIcon={<GitHubIcon />}
              href={member.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ 
                borderRadius: 20,
                borderColor: 'rgba(255, 255, 255, 0.3)',
                color: '#ffffff',
                '&:hover': {
                  borderColor: 'rgba(255, 255, 255, 0.8)',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                }
              }}
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
              sx={{ 
                borderRadius: 20,
                borderColor: 'rgba(255, 255, 255, 0.3)',
                color: '#ffffff',
                '&:hover': {
                  borderColor: 'rgba(255, 255, 255, 0.8)',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                }
              }}
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
              sx={{ 
                borderRadius: 20,
                borderColor: 'rgba(255, 255, 255, 0.3)',
                color: '#ffffff',
                '&:hover': {
                  borderColor: 'rgba(255, 255, 255, 0.8)',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                }
              }}
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
        background: '#000000', // Fundo preto base
        position: 'relative',
        minHeight: "100vh",
        padding: 3,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `url("/waves-bg.svg")`, // Adicione o SVG de ondas
          backgroundSize: 'cover',
          opacity: 0.1,
          zIndex: 1,
        },
      }}
    >
      <Button
        onClick={() => navigate('/')}
        startIcon={<ArrowBackIcon />}
        sx={{
          position: 'absolute',
          top: 24,
          left: 24,
          color: '#ffffff',
          textTransform: 'none',
          fontSize: '0.9rem',
          padding: '8px 16px',
          minWidth: 'auto',
          border: '2px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '20px',
          background: 'transparent',
          zIndex: 9999,
          '&:hover': {
            background: 'transparent',
            opacity: 0.8,
          }
        }}
      >
        Voltar
      </Button>

      <Container maxWidth="lg" sx={{ pt: 8, position: 'relative', zIndex: 1 }}>
        <Typography 
          variant="h3" 
          align="center" 
          sx={{ 
            color: '#999999',
            mb: 6,
            fontSize: '2rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            '& span': {
              color: '#2196f3',
            }
          }}
        >
          Nossa <span>Equipe</span>
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
