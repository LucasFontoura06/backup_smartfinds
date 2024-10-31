import { configureStore } from "@reduxjs/toolkit";
import addProductsReducer from './features/AddProducts/addProcuctSlice'; // Corrija o nome se necessário
import contatoReducer from './features/Contato/ContatoSlice';

// Criar a store
export const store = configureStore({
    reducer: {
        addProducts: addProductsReducer,
        contato: contatoReducer,
        // Adicione outros reducers aqui se necessário
    },
});

// Tipos para o estado e dispatch
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
