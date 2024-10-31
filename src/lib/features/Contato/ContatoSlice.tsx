import { createSlice } from '@reduxjs/toolkit';

interface ContatoState {
  loading: boolean;
  error: string | null;
  success: boolean;
  values: {
    nome: string;
    email: string;
    tipo: string;
    mensagem: string;
  };
}

const initialState: ContatoState = {
  loading: false,
  error: null,
  success: false,
  values: {
    nome: '',
    email: '',
    tipo: '',
    mensagem: '',
  }
};

const contatoSlice = createSlice({
  name: 'contato',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSuccess: (state, action) => {
      state.success = action.payload;
    },
    resetStatus: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
    setNome: (state, action) => {
      state.values.nome = action.payload;
    },
    setEmail: (state, action) => {
      state.values.email = action.payload;
    },
    setTipo: (state, action) => {
      state.values.tipo = action.payload;
    },
    setMensagem: (state, action) => {
      state.values.mensagem = action.payload;
    },
    resetForm: (state) => {
      state.values = initialState.values;
    },
  },
});

export const { 
  setLoading,
  setError,
  setSuccess,
  resetStatus, 
  setNome, 
  setEmail, 
  setTipo, 
  setMensagem, 
  resetForm 
} = contatoSlice.actions;

export default contatoSlice.reducer;
