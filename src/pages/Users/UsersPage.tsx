import { Container, Typography, Paper, TextField, DialogActions, Button, Dialog, DialogTitle, DialogContent, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Switch, Box, Card } from '@mui/material';
import { addDoc, collection, getDocs, getFirestore, deleteDoc, doc, updateDoc, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { DataGrid, GridValueFormatter } from '@mui/x-data-grid';
import { createUserWithEmailAndPassword, getAuth, deleteUser } from 'firebase/auth';
import AddIcon from '@mui/icons-material/Add';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import BlockIcon from '@mui/icons-material/Block';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useAppDispatch } from '../../lib/hooks';
import { deleteUserAction } from '../../lib/features/Users/UserAction';
import useMediaQuery from '@mui/material/useMediaQuery';

interface User {
  id: string;
  email: string;
  name: string;
  profile: string;
  ativo: boolean;
  createdAt?: string;
  lastLoginAt?: string;
}

const UsersPage = () => {
  const [userProfile, setUserProfile] = useState<string>('Usuario');
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [newUser, setNewUser] = useState({
    email: '',
    password: '',
    name: '',
    profile: 'Administrador',
    ativo: true
  });
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<{id: string, email: string} | null>(null);

  const dispatch = useAppDispatch();

  const isMobile = useMediaQuery('(max-width:768px)');

  useEffect(() => {
    const fetchUserProfile = async () => {
      const auth = getAuth();
      const db = getFirestore();
      if (auth.currentUser) {
        const userDoc = await getDocs(
          query(collection(db, 'usuarios'), where('email', '==', auth.currentUser.email))
        );
        if (!userDoc.empty) {
          setUserProfile(userDoc.docs[0].data().profile);
        }
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const auth = getAuth();
        const db = getFirestore();
        const usersCollection = collection(db, 'usuarios'); // Alterado para 'usuarios'
        const usersSnapshot = await getDocs(usersCollection);
        
        const usersData = usersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as User[];  // Adiciona type assertion aqui
        
        setUsers(usersData);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleCreateUser = async () => {
    try {
      setLoading(true);
      const auth = getAuth();
      const db = getFirestore();

      // Criar usuário no Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        newUser.email,
        newUser.password
      );

      // Adicionar informações na coleção 'usuarios' do Firestore
      await addDoc(collection(db, 'usuarios'), {
        id: userCredential.user.uid,
        email: newUser.email,
        name: newUser.name,
        profile: newUser.profile,
        ativo: newUser.ativo,
        createdAt: new Date().toISOString(),
      });

      // Recarregar a lista de usuários
      const usersCollection = collection(db, 'usuarios');
      const usersSnapshot = await getDocs(usersCollection);
      const usersData = usersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))as User[];
      setUsers(usersData);

      setOpenModal(false);
      setNewUser({ 
        email: '', 
        password: '', 
        name: '', 
        profile: 'Administrador', 
        ativo: true 
      });
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      alert('Erro ao criar usuário. Verifique o console para mais detalhes.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string, userEmail: string) => {
    setUserToDelete({ id: userId, email: userEmail });
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!userToDelete) return;
    
    try {
      await dispatch(deleteUserAction({
        id: userToDelete.id,
        email: userToDelete.email
      }));
      
      setDeleteConfirmOpen(false);
      setUserToDelete(null);
      
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      alert('Erro ao deletar usuário: ' + errorMessage);
    }
  };

  const handleToggleUserStatus = async (userId: string, currentStatus: boolean) => {
    try {
      const db = getFirestore();
      await updateDoc(doc(db, 'usuarios', userId), {
        ativo: !currentStatus
      });
      setUsers(users.map(user => 
        user.id === userId ? { ...user, ativo: !currentStatus } : user
      ));
    } catch (error) {
      console.error('Erro ao atualizar status do usuário:', error);
      alert('Erro ao atualizar status do usuário');
    }
  };

  const columns = [
    { 
      field: 'email', 
      headerName: 'Email', 
      flex: 1, 
      minWidth: 200,
      hide: isMobile 
    },
    { 
      field: 'name', 
      headerName: 'Nome', 
      flex: 1, 
      minWidth: 150 
    },
    { 
      field: 'profile', 
      headerName: 'Perfil', 
      flex: 0.8, 
      minWidth: 120,
      hide: isMobile 
    },
    { 
      field: 'ativo', 
      headerName: 'Ativo', 
      width: 100, 
      type: 'boolean' as const,
      hide: isMobile 
    },
    { 
      field: 'createdAt', 
      headerName: 'Data de Criação', 
      flex: 0.8,
      minWidth: 150,
      renderCell: (params: any) => {
        return params.row.createdAt 
          ? new Date(params.row.createdAt).toLocaleDateString('pt-BR')
          : '';
      }
    },
    { 
      field: 'lastLoginAt', 
      headerName: 'Último Login', 
      flex: 0.8,
      minWidth: 150,
      renderCell: (params: any) => {
        return params.row.lastLoginAt 
          ? new Date(params.row.lastLoginAt).toLocaleDateString('pt-BR')
          : '';
      }
    },
    {
      field: 'actions',
      headerName: 'Ações',
      width: 120,
      renderCell: (params: any) => (
        <Box>
          <Tooltip title={params.row.ativo ? "Desativar" : "Ativar"}>
            <IconButton
              onClick={() => handleToggleUserStatus(params.row.id, params.row.ativo)}
              size="small"
              sx={{ 
                color: params.row.ativo ? 'warning.main' : 'success.main',
                '&:hover': { backgroundColor: 'rgba(99, 102, 242, 0.1)' }
              }}
            >
              <BlockIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Excluir">
            <IconButton
              onClick={() => handleDeleteUser(params.row.id, params.row.email)}
              size="small"
              sx={{ 
                color: 'error.main',
                '&:hover': { backgroundColor: 'rgba(211, 47, 47, 0.1)' }
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      )
    }
  ];

  return (
    <Box sx={{ 
      backgroundColor: '#f0f2f5',
      minHeight: '100vh',
      py: 4,
      px: isMobile ? 2 : 4
    }}>
      <Container maxWidth="xl" sx={{ 
        px: isMobile ? '8px !important' : '24px !important'
      }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 4
        }}>
          <PeopleOutlineIcon sx={{ color: '#6366f2', mr: 1 }} />
          <Typography
            variant="h6"
            sx={{
              color: '#37352f',
              fontWeight: 600,
              fontSize: '1.1rem'
            }}
          >
            Usuários do Sistema
          </Typography>
        </Box>

        <Card sx={{ 
          overflowX: 'auto',
          '& .MuiDataGrid-root': {
            width: isMobile ? 'max-content' : '100%'
          }
        }}>
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
            {userProfile === 'Administrador' && (
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setOpenModal(true)}
                sx={{
                  backgroundColor: '#6366f2',
                  '&:hover': {
                    backgroundColor: '#5457e5'
                  }
                }}
              >
                Novo Usuário
              </Button>
            )}
          </Box>
          
          <DataGrid
            rows={users}
            columns={columns}
            initialState={{
              pagination: { paginationModel: { pageSize: 5 } },
            }}
            pageSizeOptions={[5]}
            loading={loading}
            disableRowSelectionOnClick
            autoHeight
            sx={{
              border: 'none',
              p: 2,
              width: '100%',
              '& .MuiDataGrid-cell': {
                borderBottom: '1px solid #f0f0f0',
                fontSize: '0.9rem',
                color: '#424242'
              },
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#f8f9fa',
                borderBottom: 'none',
                fontSize: '0.95rem',
                fontWeight: 600,
                color: '#37352f'
              },
              '& .MuiDataGrid-footerContainer': {
                borderTop: 'none',
                backgroundColor: '#f8f9fa'
              }
            }}
          />
        </Card>

        <Dialog 
          open={openModal} 
          onClose={() => setOpenModal(false)}
          PaperProps={{
            sx: {
              borderRadius: '8px'
            }
          }}
        >
          <DialogTitle sx={{ 
            borderBottom: '1px solid #f0f0f0',
            color: '#37352f'
          }}>
            Cadastrar Novo Usuário
          </DialogTitle>
          <DialogContent sx={{ mt: 2 }}>
            <TextField
              autoFocus
              margin="dense"
              label="Nome"
              type="text"
              fullWidth
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Email"
              type="email"
              fullWidth
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Senha"
              type="password"
              fullWidth
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            />
            <FormControl fullWidth margin="dense">
              <InputLabel>Perfil</InputLabel>
              <Select
                value={newUser.profile}
                onChange={(e) => setNewUser({ ...newUser, profile: e.target.value })}
              >
                <MenuItem value="Administrador">Administrador</MenuItem>
                <MenuItem value="Usuario">Usuário</MenuItem>
              </Select>
            </FormControl>
            <FormControlLabel
              control={
                <Switch
                  checked={newUser.ativo}
                  onChange={(e) => setNewUser({ ...newUser, ativo: e.target.checked })}
                />
              }
              label="Usuário Ativo"
            />
          </DialogContent>
          <DialogActions sx={{ p: 2, pt: 0 }}>
            <Button 
              onClick={() => setOpenModal(false)}
              sx={{ color: '#666' }}
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleCreateUser} 
              variant="contained"
              sx={{
                backgroundColor: '#6366f2',
                '&:hover': {
                  backgroundColor: '#5457e5'
                }
              }}
            >
              Cadastrar
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={deleteConfirmOpen}
          onClose={() => setDeleteConfirmOpen(false)}
          PaperProps={{
            sx: {
              borderRadius: '8px'
            }
          }}
        >
          <DialogTitle sx={{ color: '#37352f' }}>
            Confirmar Exclusão
          </DialogTitle>
          <DialogContent>
            <Typography>
              Tem certeza que deseja excluir este usuário?
            </Typography>
          </DialogContent>
          <DialogActions sx={{ p: 2, pt: 0 }}>
            <Button 
              onClick={() => setDeleteConfirmOpen(false)}
              sx={{ color: '#666' }}
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleConfirmDelete}
              variant="contained"
              sx={{
                backgroundColor: '#dc3545',
                '&:hover': {
                  backgroundColor: '#bb2d3b'
                }
              }}
            >
              Excluir
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default UsersPage;
