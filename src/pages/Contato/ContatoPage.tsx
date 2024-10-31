import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../lib/store';
import { handleSubmitContato } from '../../lib/features/Contato/ContatoAction';
import { resetStatus, setEmail, setMensagem, setNome, setTipo } from '../../lib/features/Contato/ContatoSlice';

const ContatoPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error, success, values } = useSelector((state: RootState) => state.contato);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(handleSubmitContato(values));
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
    }
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        dispatch(resetStatus());
      }, 4000);
      
      return () => clearTimeout(timer);
    }
  }, [success, dispatch]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: '#000000',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 30% 50%, rgba(30,30,30,1) 0%, rgba(0,0,0,0) 50%),
            radial-gradient(circle at 70% 50%, rgba(30,30,30,1) 0%, rgba(0,0,0,0) 50%)
          `,
          opacity: 0.5,
          zIndex: 1
        }
      }}
    >
      {/* Botão Voltar movido para fora do Container */}
      <Button
        onClick={() => navigate('/')}
        startIcon={<ArrowBackIcon />}
        sx={{
          position: { xs: 'fixed', md: 'absolute' },
          top: { xs: 'auto', md: 24 },
          bottom: { xs: 24, md: 'auto' },
          left: { xs: '50%', md: 24 },
          transform: { xs: 'translateX(-50%)', md: 'none' },
          color: '#ffffff',
          textTransform: 'none',
          fontSize: '0.9rem',
          padding: '8px 16px',
          minWidth: 'auto',
          border: '2px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '20px',
          background: 'transparent',
          zIndex: 2,
          '&:hover': {
            background: 'transparent',
            opacity: 0.8,
          }
        }}
      >
        Voltar
      </Button>

      <Container maxWidth="md" sx={{ pt: 8, position: 'relative', zIndex: 2 }}>
        {/* Título */}
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
          Entre em <span>Contato</span>
        </Typography>

        {/* Formulário */}
        <Paper
          elevation={3}
          sx={{
            p: 4,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: 2,
          }}
        >
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Nome"
              margin="normal"
              required
              value={values.nome}
              onChange={(e) => dispatch(setNome(e.target.value))}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#ffffff',
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#2196f3',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(255, 255, 255, 0.7)',
                },
              }}
            />

            <TextField
              fullWidth
              label="Email"
              margin="normal"
              required
              type="email"
              value={values.email}
              onChange={(e) => dispatch(setEmail(e.target.value))}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#ffffff',
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#2196f3',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(255, 255, 255, 0.7)',
                },
              }}
            />

            <FormControl fullWidth margin="normal" required>
              <InputLabel sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                Tipo de Contato
              </InputLabel>
              <Select
                value={values.tipo}
                label="Tipo de Contato"
                onChange={(e) => dispatch(setTipo(e.target.value))}
                sx={{
                  color: '#ffffff',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#2196f3',
                  },
                }}
              >
                <MenuItem value="reclamacao">Reclamação</MenuItem>
                <MenuItem value="sugestao">Sugestão de Melhoria</MenuItem>
                <MenuItem value="duvida">Dúvida</MenuItem>
                <MenuItem value="outro">Outro</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Mensagem"
              margin="normal"
              required
              multiline
              rows={4}
              value={values.mensagem}
              onChange={(e) => dispatch(setMensagem(e.target.value))}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#ffffff',
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#2196f3',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(255, 255, 255, 0.7)',
                },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{
                mt: 3,
                mb: 2,
                height: '46px',
                backgroundColor: '#2196f3',
                '&:hover': {
                  backgroundColor: '#1976d2',
                },
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Enviar Mensagem'
              )}
            </Button>
          </Box>
        </Paper>

        {/* Snackbar atualizado */}
        <Snackbar
          open={success || !!error}
          autoHideDuration={4000}
          onClose={() => dispatch(resetStatus())}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert 
            onClose={() => dispatch(resetStatus())} 
            severity={success ? 'success' : 'error'}
            sx={{ 
              width: '100%',
              backgroundColor: success ? '#4CAF50' : '#f44336',
              color: '#ffffff',
              '& .MuiAlert-icon': {
                color: '#ffffff'
              },
              '& .MuiSvgIcon-root': {
                color: '#ffffff'
              },
              boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
              borderRadius: '8px',
              '& .MuiAlert-message': {
                fontSize: '0.95rem',
                fontWeight: 500
              }
            }}
          >
            {success 
              ? 'Mensagem enviada com sucesso!' 
              : error || 'Ocorreu um erro ao enviar a mensagem.'}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default ContatoPage;
