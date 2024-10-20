import { doc, setDoc, updateDoc, collection, getDocs } from "firebase/firestore"; 
import { ACTIONS_TYPE } from '../../../commom/actionsType';
import { CONSTANTES } from '../../../commom/constantes';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../../firebaseConfig'; 

// Ação para cadastrar ou atualizar produto
export const submitFormProducts = createAsyncThunk<any, any>(
    'addProducts/submitFormProducts',
    async (produtoData, { rejectWithValue }) => {
      try {
        console.log("Produto recebido para cadastro/edição:", produtoData);

        // Produto a ser salvo ou atualizado (excluindo o campo 'id')
        const { id, ...produtoParaSalvar } = produtoData;

        // Verifica se o produto tem um ID (edição)
        if (id) {
          const produtoDocRef = doc(db, CONSTANTES.PRODUCTS, id);
          // Atualiza o produto existente no Firestore
          await updateDoc(produtoDocRef, produtoParaSalvar);
          return {
            id, // Retorna o ID
            ...produtoParaSalvar
          };
        } else {
          // Se não há ID, cria um novo produto (cadastro)
          const produtoDocRef = doc(collection(db, CONSTANTES.PRODUCTS));
          await setDoc(produtoDocRef, produtoParaSalvar);
          return {
            id: produtoDocRef.id, // Retorna o ID gerado
            ...produtoParaSalvar
          };
        }
      } catch (error: any) {
        console.error("Erro ao cadastrar ou atualizar produto:", error);
        return rejectWithValue(error.message || CONSTANTES.ERROR_ADD_PRODUCT);
      }
    }
);

// Ação para buscar produtos
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

            console.log("Produtos recuperados:", produtos);

            return produtos;
        } catch (error: any) {
            return rejectWithValue(error.message || CONSTANTES.ERROR_FIND_PRODUCTS);
        }
    }
);
