import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  email: string;
  name: string;
  profile: string;
  ativo: boolean;
  createdAt?: string;
  lastLoginAt?: string;
}

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
  userProfile: string;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
  userProfile: 'Usuario'
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    removeUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
    updateUserStatus: (state, action: PayloadAction<{ id: string; ativo: boolean }>) => {
      const user = state.users.find(u => u.id === action.payload.id);
      if (user) {
        user.ativo = action.payload.ativo;
      }
    },
    setUserProfile: (state, action: PayloadAction<string>) => {
      state.userProfile = action.payload;
    }
  }
});

export const {
  setLoading,
  setUsers,
  setError,
  addUser,
  removeUser,
  updateUserStatus,
  setUserProfile
} = userSlice.actions;

export default userSlice.reducer;
