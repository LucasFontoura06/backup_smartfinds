import { createAsyncThunk } from '@reduxjs/toolkit';
import { 
  collection, 
  getDocs, 
  getFirestore, 
  addDoc, 
  deleteDoc, 
  doc, 
  updateDoc, 
  query, 
  where 
} from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { 
  setLoading, 
  setUsers, 
  setError, 
  addUser, 
  removeUser, 
  updateUserStatus,
  setUserProfile 
} from './UserSlice';
import { User } from './types';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const db = getFirestore();
      const usersSnapshot = await getDocs(collection(db, 'usuarios'));
      const usersData = usersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as User[];
      dispatch(setUsers(usersData));
    } catch (error) {
      dispatch(setError(error instanceof Error ? error.message : 'Erro desconhecido'));
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const createUser = createAsyncThunk(
  'users/createUser',
  async (userData: { email: string; password: string; name: string; profile: string; ativo: boolean }, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const auth = getAuth();
      const db = getFirestore();

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );

      const newUserData = {
        id: userCredential.user.uid,
        email: userData.email,
        name: userData.name,
        profile: userData.profile,
        ativo: userData.ativo,
        createdAt: new Date().toISOString(),
      };

      await addDoc(collection(db, 'usuarios'), newUserData);
      dispatch(addUser(newUserData));
      
      return newUserData;
    } catch (error) {
      dispatch(setError(error instanceof Error ? error.message : 'Erro ao criar usuário'));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const deleteUserAction = createAsyncThunk(
  'users/deleteUser',
  async ({ id, email }: { id: string; email: string }, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const db = getFirestore();
      const auth = getAuth();
      
      // Buscar usuário no Firestore
      const userDoc = await getDocs(
        query(collection(db, 'usuarios'), where('email', '==', email))
      );
      
      if (!userDoc.empty) {
        // Deletar do Firestore
        const docId = userDoc.docs[0].id;
        await deleteDoc(doc(db, 'usuarios', docId));
        
        // Chamar API do backend para deletar o usuário do Authentication
        await fetch('/api/deleteUser', {
          method: 'POST',
          body: JSON.stringify({ email })
        });
      }
      
      dispatch(removeUser(id));
    } catch (error) {
      dispatch(setError(error instanceof Error ? error.message : 'Erro ao deletar usuário'));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const toggleUserStatus = createAsyncThunk(
  'users/toggleStatus',
  async ({ id, currentStatus }: { id: string; currentStatus: boolean }, { dispatch }) => {
    try {
      const db = getFirestore();
      await updateDoc(doc(db, 'usuarios', id), {
        ativo: !currentStatus
      });
      dispatch(updateUserStatus({ id, ativo: !currentStatus }));
    } catch (error) {
      dispatch(setError(error instanceof Error ? error.message : 'Erro ao atualizar status'));
      throw error;
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  'users/fetchUserProfile',
  async (_, { dispatch }) => {
    try {
      const auth = getAuth();
      const db = getFirestore();
      
      if (auth.currentUser) {
        const userDoc = await getDocs(
          query(collection(db, 'usuarios'), where('email', '==', auth.currentUser.email))
        );
        
        if (!userDoc.empty) {
          dispatch(setUserProfile(userDoc.docs[0].data().profile));
        }
      }
    } catch (error) {
      dispatch(setError(error instanceof Error ? error.message : 'Erro ao buscar perfil'));
    }
  }
);
