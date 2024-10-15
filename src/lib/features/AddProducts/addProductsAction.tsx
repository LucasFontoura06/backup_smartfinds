import { CONSTANTES } from '../../../commom/constantes';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { doc, setDoc, collection, getDocs } from "firebase/firestore"; // Firestore imports
import { db } from '../../../firebaseConfig'; // Importa o Firestore configurado
import { ACTIONS_TYPE } from '../../../commom/actionsType';

// Função para enviar apenas os campos necessários ao Firestore
export const submitFormProducts = createAsyncThunk<any, any>(
    'addProducts/submitFormProducts',
    async (produtoData, { rejectWithValue }) => {
      try {
        // Criando um novo objeto com apenas os campos que queremos salvar
        const produtoParaSalvar = {
          name: produtoData.name,
          linkImage: produtoData.linkImage,
          linkAliexpress: produtoData.linkAliexpress,
          linkAmazon: produtoData.linkAmazon,
          linkMercadoLivre: produtoData.linkMercadoLivre,
          ativo: produtoData.ativo ?? false, // Certifique-se de que 'ativo' tem um valor
        };

        // Gera um novo documento automaticamente com um ID na coleção 'produtos'
        const produtoDocRef = doc(collection(db, "produtos"));

        // Salva o produto no Firestore (sem `dataCadastro`)
        await setDoc(produtoDocRef, produtoParaSalvar);

        // Retorna os dados enviados
        return {
          id: produtoDocRef.id, // Retorna o ID gerado pelo Firestore
          ...produtoParaSalvar
        };
      } catch (error: any) {
        return rejectWithValue(error.message || "Erro ao adicionar produto");
      }
    }
);

// Função para buscar produtos no Firestore
export const fetchProdutos = createAsyncThunk(
    ACTIONS_TYPE.LIST_PRODUCTS,
    async (_, { rejectWithValue }) => {
        try {
            // Referência à coleção 'produtos' no Firestore
            const produtosCollectionRef = collection(db, "produtos");

            // Busca todos os documentos da coleção
            const querySnapshot = await getDocs(produtosCollectionRef);

            // Mapeia os documentos e retorna os dados
            const produtos = querySnapshot.docs.map(doc => ({
                id: doc.id, // Inclui o ID do documento
                ...doc.data() // Espalha os dados do documento
            }));

            return produtos;
        } catch (error: any) {
            // Lida com erro caso algo dê errado
            return rejectWithValue(error.message || "Erro ao buscar produtos");
        }
    }
);
