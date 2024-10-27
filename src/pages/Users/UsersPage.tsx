import { Container, Typography, Paper, TextField, DialogActions, Button, Dialog, DialogTitle, DialogContent, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Switch } from '@mui/material';
import { addDoc, collection, getDocs, getFirestore } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { DataGrid, GridValueFormatter } from '@mui/x-data-grid';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import AddIcon from '@mui/icons-material/Add';

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

  const columns = [
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'name', headerName: 'Nome', width: 200 },
    { field: 'profile', headerName: 'Perfil', width: 150 },
    { field: 'ativo', headerName: 'Ativo', width: 100, type: 'boolean' as const },
    { 
      field: 'createdAt', 
      headerName: 'Data de Criação', 
      width: 200,
      renderCell: (params: any) => {
        return params.row.createdAt 
          ? new Date(params.row.createdAt).toLocaleDateString('pt-BR')
          : '';
      }
    },
    { 
      field: 'lastLoginAt', 
      headerName: 'Último Login', 
      width: 200,
      renderCell: (params: any) => {
        return params.row.lastLoginAt 
          ? new Date(params.row.lastLoginAt).toLocaleDateString('pt-BR')
          : '';
      }
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <Typography variant="h4">
            Usuários Cadastrados
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenModal(true)}
          >
            Novo Usuário
          </Button>
        </div>
        
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={users}
            columns={columns}
            initialState={{
              pagination: { paginationModel: { pageSize: 5 } },
            }}
            pageSizeOptions={[5]}
            loading={loading}
            disableRowSelectionOnClick
          />
        </div>

        <Dialog open={openModal} onClose={() => setOpenModal(false)}>
          <DialogTitle>Cadastrar Novo Usuário</DialogTitle>
          <DialogContent>
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
          <DialogActions>
            <Button onClick={() => setOpenModal(false)}>Cancelar</Button>
            <Button onClick={handleCreateUser} variant="contained">
              Cadastrar
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Container>
  );
};

export default UsersPage;
