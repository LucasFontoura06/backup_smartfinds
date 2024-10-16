import { doc, setDoc, collection, getDocs } from "firebase/firestore"; 
import { ACTIONS_TYPE } from '../../../commom/actionsType';
import { CONSTANTES } from '../../../commom/constantes';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../../firebaseConfig'; 


export const submitFormProducts = createAsyncThunk<any, any>(
    'addProducts/submitFormProducts',
    async (produtoData, { rejectWithValue }) => {
      try {
        
        const produtoParaSalvar = {
          name: produtoData.name,
          linkImage: produtoData.linkImage,
          linkAliexpress: produtoData.linkAliexpress,
          linkAmazon: produtoData.linkAmazon,
          linkMercadoLivre: produtoData.linkMercadoLivre,
          ativo: produtoData.ativo ?? false, 
        };

        const produtoDocRef = doc(collection(db, CONSTANTES.PRODUCTS));

        await setDoc(produtoDocRef, produtoParaSalvar);

        return {
          id: produtoDocRef.id, 
          ...produtoParaSalvar
        };
      } catch (error: any) {
        return rejectWithValue(error.message || CONSTANTES.ERROR_ADD_PRODUCT);
      }
    }
);

export const fetchProdutos = createAsyncThunk(
    ACTIONS_TYPE.LIST_PRODUCTS,
    async (_, { rejectWithValue }) => {
        try {
            const produtosCollectionRef = collection(db, CONSTANTES.PRODUCTS);
            const querySnapshot = await getDocs(produtosCollectionRef);
            const produtos = querySnapshot.docs.map(doc => ({
                id: doc.id, 
                ...doc.data() 
            }));

            return produtos;
        } catch (error: any) {
            return rejectWithValue(error.message || CONSTANTES.ERROR_FIND_PRODUCTS);
        }
    }
);
