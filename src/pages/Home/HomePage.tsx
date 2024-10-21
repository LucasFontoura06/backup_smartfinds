import React from 'react';
import { Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom'; // Importando o useNavigate para navegação

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    background: 'linear-gradient(90deg, #7b1fa2, #2196f3)', // Degradê roxo para azul
    color: '#fff',
    textAlign: 'center',
    padding: '0 20px',
  },
  title: {
    fontSize: '4rem',
    fontWeight: 'bold',
    marginBottom: '20px',
    letterSpacing: '2px',
    textTransform: 'uppercase',
  },
  button: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    backgroundColor: '#fff', // Botão branco
    color: '#7b1fa2', // Texto roxo no botão
    '&:hover': {
      backgroundColor: '#f3e5f5', // Cor ao passar o mouse
    },
  },
}));

const MainScreen: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate(); // Inicializando o hook useNavigate

  // Função para redirecionar ao clicar no botão
  const handleNavigation = () => {
    navigate('/products'); // Caminho para onde deseja navegar
  };

  return (
    <div className={classes.container}>
      <Button
        variant="contained"
        className={classes.button}
        onClick={handleNavigation} // Chamando a função ao clicar no botão
      >
        Adm
      </Button>
      <h1 className={classes.title}>Smart Finds</h1>
    </div>
  );
};

export default MainScreen;
