import React, { useState, useEffect } from 'react';
import { Button, ButtonGroup } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import wallpaper from '../../assets/wallpaper_home_screen.jpg';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start', // Mudado de 'center' para 'flex-start'
    paddingTop: '120px', // Adiciona um espaçamento do topo
    height: '100vh',
    backgroundImage: `url(${wallpaper})`, // Use a variável importada
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    '&::before': { // Adiciona um overlay escuro para melhorar a legibilidade
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Ajuste a opacidade conforme necessário
      zIndex: 1,
    },
    padding: '120px 20px 20px 20px', // Adiciona padding em todos os lados
  },
  title: {
    fontSize: '4rem',
    fontWeight: 'bold',
    marginBottom: '20px',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    fontFamily: "'Zen Dots', cursive",
    color: '#fff',
    position: 'relative',
    zIndex: 2, // Coloca o texto acima do overlay
    textShadow: '2px 2px 4px rgba(0,0,0,0.5)', // Adiciona sombra para melhor legibilidade
    '@media (max-width: 600px)': {
      fontSize: '2.5rem', // Fonte menor para mobile
      marginBottom: '15px',
      padding: '0 10px',
    },
  },
  description: {
    fontSize: '1.5rem',
    marginBottom: '30px',
    maxWidth: '900px',
    lineHeight: '1.6',
    minHeight: '4rem',
    fontFamily: "'Inconsolata', monospace",
    color: '#fff',
    position: 'relative',
    zIndex: 2, // Coloca o texto acima do overlay
    textShadow: '1px 1px 2px rgba(0,0,0,0.5)', // Adiciona sombra para melhor legibilidade
    '@media (max-width: 600px)': {
      fontSize: '1.1rem', // Fonte menor para mobile
      marginBottom: '20px',
      padding: '0 10px',
      maxWidth: '100%',
    },
  },
  buttonBar: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    zIndex: 2,
    display: 'flex',
    alignItems: 'center',
    '& .MuiButton-root': {
      color: '#fff',
      backgroundColor: 'transparent',
      border: 'none',
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
      },
    },
    '& .separator': {
      color: '#fff',
      margin: '0 8px',
    },
    '@media (max-width: 600px)': {
      fontSize: '0.9rem',
      right: '10px', // Ajusta posição no mobile
      top: '10px',
    },
  },
  buttonProducts: {
    marginTop: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    color: '#7b1fa2',
    position: 'relative',
    zIndex: 2, // Coloca o botão acima do overlay
    '&:hover': {
      backgroundColor: '#fff',
    },
  },
}));

const MainScreen: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [typedText, setTypedText] = useState('');
  const fullText = 'O Smart Finds é o seu portal de redirecionamento para as melhores ofertas online. Aqui você encontra uma curadoria de produtos com links para os maiores marketplaces como Amazon, Shopee, Mercado Livre e AliExpress.';

  useEffect(() => {
    let index = 0;
    const typingEffect = () => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1));
        index++;
        setTimeout(typingEffect, 50);
      }
    };
    typingEffect();
  }, [fullText]);

  return (
    <div className={classes.container}>
      <div className={classes.buttonBar}>
        <Button 
          onClick={() => navigate('/Login')}
          sx={{ textTransform: 'none' }}
        >
          Login
        </Button>
        <span className="separator">|</span>
        <Button 
          onClick={() => navigate('/developer')}
          sx={{ textTransform: 'none' }}
        >
          Quem Somos Nós?
        </Button>
        <span className="separator">|</span>
        <Button 
          onClick={() => navigate('/')}
          sx={{ textTransform: 'none' }}
        >
          Contato
        </Button>
      </div>
      <h1 className={classes.title}>Smart Finds</h1>
      <p className={classes.description}>{typedText}</p>
      <Button
        variant="contained"
        className={classes.buttonProducts}
        onClick={() => navigate('/produtos')}
      >
        Ir para Produtos
      </Button>
    </div>
  );
};

export default MainScreen;
