import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  CircularProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { collection, query, getDocs, orderBy, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

interface Mensagem {
  id: string;
  nome: string;
  email: string;
  tipo: string;
  mensagem: string;
  dataCadastro: string;
  resolvido?: boolean;
}

const CentralDeMensagens = () => {
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [mensagemSelecionada, setMensagemSelecionada] = useState<Mensagem | null>(null);
  const [atualizandoStatus, setAtualizandoStatus] = useState(false);

  useEffect(() => {
    fetchMensagens();
  }, []);

  const fetchMensagens = async () => {
    try {
      const q = query(collection(db, 'contatos'), orderBy('dataCadastro', 'desc'));
      const querySnapshot = await getDocs(q);
      const mensagensData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        resolvido: doc.data().resolvido || false
      })) as Mensagem[];
      setMensagens(mensagensData);
    } catch (error) {
      console.error('Erro ao buscar mensagens:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'reclamacao':
        return '#f44336';
      case 'sugestao':
        return '#4CAF50';
      case 'duvida':
        return '#2196f3';
      default:
        return '#ff9800';
    }
  };

  const formatTipo = (tipo: string) => {
    const tipos = {
      reclamacao: 'Reclamação',
      sugestao: 'Sugestão',
      duvida: 'Dúvida',
      outro: 'Outro'
    };
    return tipos[tipo as keyof typeof tipos] || tipo;
  };

  const formatarData = (dataString: string) => {
    try {
      // Extrair a data da string original
      const match = dataString.match(/(\d{1,2}) de (\w+) de (\d{4}) às (\d{2}:\d{2}:\d{2})/);
      if (!match) return dataString;

      const [, dia, mes, ano, hora] = match;
      
      // Retornar no formato desejado
      return `${dia.padStart(2, '0')}/${getMesNumero(mes)}/${ano} às ${hora}`;
    } catch (error) {
      console.error('Erro ao formatar data:', error);
      return dataString;
    }
  };

  const getMesNumero = (mes: string): string => {
    const meses: { [key: string]: string } = {
      'janeiro': '01',
      'fevereiro': '02',
      'março': '03',
      'abril': '04',
      'maio': '05',
      'junho': '06',
      'julho': '07',
      'agosto': '08',
      'setembro': '09',
      'outubro': '10',
      'novembro': '11',
      'dezembro': '12'
    };
    return meses[mes.toLowerCase()] || '00';
  };

  const handleOpenModal = (mensagem: Mensagem) => {
    setMensagemSelecionada(mensagem);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setMensagemSelecionada(null);
  };

  const handleStatusChange = async (mensagemId: string, novoStatus: string) => {
    const statusBooleano = novoStatus === 'true';
    try {
      setAtualizandoStatus(true);
      const mensagemRef = doc(db, 'contatos', mensagemId);
      await updateDoc(mensagemRef, {
        resolvido: statusBooleano
      });

      // Atualiza o estado local
      setMensagens(mensagens.map(msg => 
        msg.id === mensagemId ? { ...msg, resolvido: statusBooleano } : msg
      ));

      // Atualiza a mensagem selecionada no modal
      if (mensagemSelecionada && mensagemSelecionada.id === mensagemId) {
        setMensagemSelecionada({ ...mensagemSelecionada, resolvido: statusBooleano });
      }
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    } finally {
      setAtualizandoStatus(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ 
      flexGrow: 1, 
      p: 3,
      backgroundColor: '#f5f5f5',
      minHeight: '100vh'
    }}>
      <Container maxWidth="xl">
        <Typography
          variant="h4"
          sx={{
            mb: 4,
            fontWeight: 500,
            textAlign: 'center',
            fontFamily: "'Montserrat', sans-serif",
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}
        >
          Central de <span style={{ color: '#2196f3' }}>Mensagens</span>
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>E-mail</TableCell>
                <TableCell>Data Geração</TableCell>
                <TableCell>Mensagem</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mensagens.map((mensagem) => (
                <TableRow key={mensagem.id}>
                  <TableCell>{mensagem.nome}</TableCell>
                  <TableCell>{mensagem.email}</TableCell>
                  <TableCell>{formatarData(mensagem.dataCadastro)}</TableCell>
                  <TableCell sx={{ 
                    maxWidth: '300px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    '&:hover': {
                      whiteSpace: 'normal',
                      wordBreak: 'break-word'
                    }
                  }}>
                    {mensagem.mensagem}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={formatTipo(mensagem.tipo)}
                      sx={{
                        backgroundColor: getTipoColor(mensagem.tipo),
                        color: '#ffffff',
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={mensagem.resolvido ? 'Resolvido' : 'Pendente'}
                      sx={{
                        backgroundColor: mensagem.resolvido ? '#4caf50' : '#ff9800',
                        color: '#ffffff',
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="text"
                      size="small"
                      startIcon={<VisibilityIcon />}
                      onClick={() => handleOpenModal(mensagem)}
                      sx={{
                        color: '#2196f3',
                        '&:hover': {
                          backgroundColor: 'rgba(33, 150, 243, 0.08)'
                        }
                      }}
                    >
                      Visualizar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Modal de Visualização */}
        <Dialog
          open={modalOpen}
          onClose={handleCloseModal}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: '12px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
              background: 'linear-gradient(to bottom, #ffffff, #f8f9fa)'
            }
          }}
        >
          <DialogTitle 
            sx={{
              borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
              padding: '24px 32px',
              fontSize: '1.5rem',
              fontWeight: 500,
              color: '#1a1a1a',
              fontFamily: "'Montserrat', sans-serif",
              letterSpacing: '0.02em',
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              '&::before': {
                content: '""',
                width: '4px',
                height: '24px',
                backgroundColor: '#2196f3',
                borderRadius: '4px',
                marginRight: '8px'
              }
            }}
          >
            Detalhes da Mensagem
          </DialogTitle>
          <DialogContent sx={{ 
            p: 4,
            '& .MuiGrid-root': {
              '& > .MuiGrid-item': {
                borderColor: 'transparent'
              }
            },
            '& .MuiBox-root': {
              border: 'none'
            }
          }}>
            {mensagemSelecionada && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Grid container spacing={3} sx={{ border: 'none' }}>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ 
                      p: 2.5, 
                      bgcolor: '#f8f9fa', 
                      borderRadius: '8px',
                      border: 'none',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                    }}>
                      <Typography variant="overline" sx={{ color: '#666', letterSpacing: '0.1em' }}>
                        Informações do Remetente
                      </Typography>
                      <Typography variant="h6" sx={{ mt: 1, color: '#1a1a1a', fontWeight: 500 }}>
                        {mensagemSelecionada.nome}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#666', mt: 0.5 }}>
                        {mensagemSelecionada.email}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ 
                      p: 2.5, 
                      bgcolor: '#f8f9fa', 
                      borderRadius: '8px',
                      border: 'none',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                    }}>
                      <Typography variant="overline" sx={{ color: '#666', letterSpacing: '0.1em' }}>
                        Status da Mensagem
                      </Typography>
                      <Box sx={{ mt: 2 }}>
                        <FormControl fullWidth size="small">
                          <Select
                            value={mensagemSelecionada.resolvido ? 'true' : 'false'}
                            onChange={(e) => handleStatusChange(mensagemSelecionada.id, e.target.value)}
                            disabled={atualizandoStatus}
                            sx={{
                              bgcolor: '#ffffff',
                              '& .MuiSelect-select': {
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1
                              }
                            }}
                          >
                            <MenuItem value={'false'}>
                              <Chip
                                label="Pendente"
                                size="small"
                                sx={{
                                  backgroundColor: '#ff9800',
                                  color: '#ffffff',
                                  fontSize: '0.85rem'
                                }}
                              />
                            </MenuItem>
                            <MenuItem value={'true'}>
                              <Chip
                                label="Concluído"
                                size="small"
                                sx={{
                                  backgroundColor: '#4caf50',
                                  color: '#ffffff',
                                  fontSize: '0.85rem'
                                }}
                              />
                            </MenuItem>
                          </Select>
                        </FormControl>
                        {atualizandoStatus && (
                          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                            <CircularProgress size={20} />
                          </Box>
                        )}
                      </Box>
                      <Typography variant="body2" sx={{ color: '#666', mt: 2 }}>
                        {formatarData(mensagemSelecionada.dataCadastro)}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>

                <Box sx={{ mt: 2 }}>
                  <Typography 
                    variant="overline" 
                    sx={{ 
                      color: '#666', 
                      letterSpacing: '0.1em',
                      display: 'block',
                      mb: 1
                    }}
                  >
                    Conteúdo da Mensagem
                  </Typography>
                  <Paper 
                    elevation={0} 
                    sx={{ 
                      p: 3, 
                      backgroundColor: '#f8f9fa',
                      borderRadius: '8px',
                      border: '1px solid rgba(0, 0, 0, 0.05)',
                      maxHeight: '250px',
                      overflow: 'auto',
                      '&::-webkit-scrollbar': {
                        width: '8px',
                      },
                      '&::-webkit-scrollbar-track': {
                        background: '#f1f1f1',
                        borderRadius: '4px',
                      },
                      '&::-webkit-scrollbar-thumb': {
                        background: '#c1c1c1',
                        borderRadius: '4px',
                        '&:hover': {
                          background: '#a8a8a8',
                        },
                      },
                    }}
                  >
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        whiteSpace: 'pre-wrap',
                        color: '#2c2c2c',
                        lineHeight: 1.6
                      }}
                    >
                      {mensagemSelecionada.mensagem}
                    </Typography>
                  </Paper>
                </Box>
              </Box>
            )}
          </DialogContent>
          <DialogActions 
            sx={{ 
              p: 3, 
              borderTop: '1px solid rgba(0, 0, 0, 0.08)',
              gap: 1
            }}
          >
            <Button 
              onClick={handleCloseModal}
              variant="contained"
              sx={{
                backgroundColor: '#2196f3',
                borderRadius: '8px',
                textTransform: 'none',
                fontSize: '0.95rem',
                padding: '8px 24px',
                '&:hover': {
                  backgroundColor: '#1976d2'
                }
              }}
            >
              Fechar
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default CentralDeMensagens;
