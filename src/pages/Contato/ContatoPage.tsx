import React, { useState } from 'react';
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
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ContatoPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    tipo: '',
    mensagem: '',
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você implementa a lógica para enviar o feedback
    console.log(formData);
    setOpenSnackbar(true);
    // Limpar formulário após envio
    setFormData({
      nome: '',
      email: '',
      tipo: '',
      mensagem: '',
    });
  };

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
            fontSize: '1rem',
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
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
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
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                value={formData.tipo}
                label="Tipo de Contato"
                onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
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
              value={formData.mensagem}
              onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
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
              Enviar Mensagem
            </Button>
          </Box>
        </Paper>

        {/* Snackbar de confirmação */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={() => setOpenSnackbar(false)}
            severity="success"
            sx={{ width: '100%' }}
          >
            Mensagem enviada com sucesso!
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default ContatoPage;
