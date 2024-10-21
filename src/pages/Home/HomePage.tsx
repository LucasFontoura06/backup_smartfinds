import React, { useState, useEffect } from 'react';
import { Button, ButtonGroup } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  '@keyframes gradientMove': {
    '0%': {
      backgroundPosition: '0% 50%',
    },
    '50%': {
      backgroundPosition: '100% 50%',
    },
    '100%': {
      backgroundPosition: '0% 50%',
    },
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    background: 'linear-gradient(90deg, #7b1fa2, #2196f3, #ff5722, #00bcd4)',
    backgroundSize: '400% 400%',
    animation: '$gradientMove 15s ease infinite',
    color: '#fff',
    textAlign: 'center',
    padding: '0 20px',
    position: 'relative',
  },
  title: {
    fontSize: '4rem',
    fontWeight: 'bold',
    marginBottom: '20px',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    fontFamily: "'Zen Dots', cursive", // Aplicando a fonte Zen Dots ao título
  },
  description: {
    fontSize: '1.5rem',
    marginBottom: '30px',
    maxWidth: '900px',
    lineHeight: '1.6',
    minHeight: '4rem',
    fontFamily: "'Inconsolata', monospace", // Aplicando a fonte Inconsolata ao texto
  },
  buttonBar: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    backgroundColor: '#fff',
    borderRadius: '5px',
    '& .MuiButton-root': {
      color: '#7b1fa2',
      '&:hover': {
        backgroundColor: '#f3e5f5',
      },
    },
  },
  buttonProducts: {
    marginTop: '20px',
    backgroundColor: '#fff',
    color: '#7b1fa2',
    '&:hover': {
      backgroundColor: '#f3e5f5',
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
      <ButtonGroup className={classes.buttonBar}>
        <Button onClick={() => navigate('/admin')}>Adm</Button>
        <Button onClick={() => navigate('/developer')}>Developer</Button>
        <Button onClick={() => navigate('/contact')}>Contato</Button>
      </ButtonGroup>
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
