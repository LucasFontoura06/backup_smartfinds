import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as Yup from "yup";
import { CONSTANTES } from '../../../commom/constantes';
import { db } from '../../../firebaseConfig'; // Importa o Firestore configurado
import { doc, setDoc, collection, getDocs, deleteDoc, updateDoc } from "firebase/firestore";
import Product from '../../../commom/products'; // Importa a classe Product

// Esquema de validação do formulário de produtos
const addProdutosShema = Yup.object().shape({
  name: Yup.string().required('Nome do produto é obrigatório'),
  linkImage: Yup.string().required('Link da imagem é obrigatório'),
  linkAliexpress: Yup.string(),
  linkAmazon: Yup.string(),
  linkMercadoLivre: Yup.string(),
  categoria: Yup.string().required('Categoria é obrigatória'), // Nova validação
});

const INITIAL_STATE = {
  errors: {} as Record<string, string>,
  touched: {} as Record<string, boolean>,
  produtos: [] as Product[], // Lista de produtos como objetos simples
  successMessage: '',
  success: false,
  loading: false,
  validForm: false,
  values: {
    id: CONSTANTES.VAZIO,
    name: CONSTANTES.VAZIO,
    linkImage: CONSTANTES.VAZIO,
    linkAliexpress: CONSTANTES.VAZIO,
    linkAmazon: CONSTANTES.VAZIO,
    linkMercadoLivre: CONSTANTES.VAZIO,
    categoria: CONSTANTES.VAZIO, // Novo campo
    ativo: false,
  },
};

// Função para salvar produtos no Firestore
export const submitFormProducts = createAsyncThunk<any, any>(
  'addProducts/submitFormProducts',
  async (produtoData, { rejectWithValue }) => {
    try {
      // Referência à coleção 'produtos'
      const produtosCollectionRef = collection(db, "produtos");
      
      // Salva o produto no Firestore
      await setDoc(doc(produtosCollectionRef), produtoData);
      
      // Retorna os dados enviados
      return produtoData;
    } catch (error: any) {
      return rejectWithValue(error.message || "Erro ao adicionar produto");
    }
  }
);

export const updateProduto = createAsyncThunk<Product, Product>(
  'addProducts/updateProduto',
  async (produtoData, { rejectWithValue }) => {
    try {
      const produtoDocRef = doc(db, "produtos", produtoData.id);
      
      // Remova o campo 'id' antes de atualizar
      const { id, ...updateData } = produtoData;
      
      // Atualiza o produto no Firestore
      await updateDoc(produtoDocRef, updateData);
      
      // Retorna os dados atualizados
      return produtoData;
    } catch (error: any) {
      return rejectWithValue(error.message || "Erro ao atualizar produto");
    }
  }
);

// Função para buscar produtos no Firestore
export const fetchProdutos = createAsyncThunk(
  'addProducts/fetchProdutos', 
  async (_, { rejectWithValue }) => {
    try {
      // Referência à coleção 'produtos'
      const produtosCollectionRef = collection(db, "produtos");
      
      // Busca todos os documentos da coleção
      const querySnapshot = await getDocs(produtosCollectionRef);
      
      // Mapeia os documentos para objetos simples (sem métodos)
      const produtos = querySnapshot.docs.map(doc => {
        const data = doc.data();

        // Retorna objetos simples com as propriedades do produto
        return {
          id: doc.id,
          name: data.name || CONSTANTES.VAZIO,
          linkImage: data.linkImage || CONSTANTES.VAZIO,
          linkAliexpress: data.linkAliexpress || CONSTANTES.VAZIO,
          linkAmazon: data.linkAmazon || CONSTANTES.VAZIO,
          linkMercadoLivre: data.linkMercadoLivre || CONSTANTES.VAZIO,
          categoria: data.categoria || CONSTANTES.VAZIO, // Novo campo
          ativo: data.ativo ?? false,
        };
      });

      return produtos;
    } catch (error: any) {
      return rejectWithValue(error.message || "Erro ao buscar produtos");
    }
  }
);

// Nova thunk para deletar um produto
export const deleteProduto = createAsyncThunk<string, string>(
  'addProducts/deleteProduto',
  async (produtoId, { rejectWithValue }) => {
    try {
      const produtoDocRef = doc(db, "produtos", produtoId);
      await deleteDoc(produtoDocRef);
      return produtoId;
    } catch (error: any) {
      return rejectWithValue(error.message || "Erro ao deletar produto");
    }
  }
);

const addProductSlice = createSlice({
  name: "addProducts",
  initialState: INITIAL_STATE,
  reducers: {
    setNomeProduto: (state, action) => {
      state.values.name = action.payload;
      try {
        addProdutosShema.validateSyncAt('name', state.values);
        state.errors[CONSTANTES.PRODUTO_NAME] = CONSTANTES.VAZIO;
      } catch (error: any) {
        state.errors[CONSTANTES.PRODUTO_NAME] = error.message;
      } finally {
        state.touched[CONSTANTES.PRODUTO_NAME] = true;
      }
    },
    setLinkImage: (state, action) => {
      state.values.linkImage = action.payload;
      try {
        addProdutosShema.validateSyncAt('linkImage', state.values);
        state.errors[CONSTANTES.LINK_IMAGE_NAME] = CONSTANTES.VAZIO;
      } catch (error: any) {
        state.errors[CONSTANTES.LINK_IMAGE_NAME] = error.message;
      } finally {
        state.touched[CONSTANTES.LINK_IMAGE_NAME] = true;
      }
    },
    setLinkAliexpress: (state, action) => {
      state.values.linkAliexpress = action.payload;
      try {
        addProdutosShema.validateSyncAt('linkAliexpress', state.values);
        state.errors[CONSTANTES.LINK_ALIEXPRESS_NAME] = CONSTANTES.VAZIO;
      } catch (error: any) {
        state.errors[CONSTANTES.LINK_ALIEXPRESS_NAME] = error.message;
      } finally {
        state.touched[CONSTANTES.LINK_ALIEXPRESS_NAME] = true;
      }
    },
    setLinkAmazon: (state, action) => {
      state.values.linkAmazon = action.payload;
      try {
        addProdutosShema.validateSyncAt('linkAmazon', state.values);
        state.errors[CONSTANTES.LINK_AMAZON_NAME] = CONSTANTES.VAZIO;
      } catch (error: any) {
        state.errors[CONSTANTES.LINK_AMAZON_NAME] = error.message;
      } finally {
        state.touched[CONSTANTES.LINK_AMAZON_NAME] = true;
      }
    },
    setLinkMercadoLivre: (state, action) => {
      state.values.linkMercadoLivre = action.payload;
      try {
        addProdutosShema.validateSyncAt('linkMercadoLivre', state.values);
        state.errors[CONSTANTES.LINK_MERCADO_LIVRE_NAME] = CONSTANTES.VAZIO;
      } catch (error: any) {
        state.errors[CONSTANTES.LINK_MERCADO_LIVRE_NAME] = error.message;
      } finally {
        state.touched[CONSTANTES.LINK_MERCADO_LIVRE_NAME] = true;
      }
    },
    setCategoria: (state, action) => {
      state.values.categoria = action.payload;
      try {
        addProdutosShema.validateSyncAt('categoria', state.values);
        state.errors[CONSTANTES.CATEGORIA_NAME] = CONSTANTES.VAZIO;
      } catch (error: any) {
        state.errors[CONSTANTES.CATEGORIA_NAME] = error.message;
      } finally {
        state.touched[CONSTANTES.CATEGORIA_NAME] = true;
      }
    },
    resetForm: (state) => {
      // Reseta os valores para um objeto simples com os valores iniciais
      state.values = {
        id: CONSTANTES.VAZIO,
        name: CONSTANTES.VAZIO,
        linkImage: CONSTANTES.VAZIO,
        linkAliexpress: CONSTANTES.VAZIO,
        linkAmazon: CONSTANTES.VAZIO,
        linkMercadoLivre: CONSTANTES.VAZIO,
        categoria: CONSTANTES.VAZIO, // Novo campo
        ativo: false,
      };
      state.errors = {}; // Limpa todos os erros
      state.touched = {}; // Limpa os campos marcados como "touched"
      state.success = false; // Reseta o estado de sucesso
      state.validForm = false; // Reseta a validação do formulário
    },
    clearErrors: (state) => {
      state.errors = {};
      state.touched = {};
    },
    setError: (state, action) => {
      state.errors.general = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitFormProducts.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(submitFormProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.produtos.push(action.payload); // Adiciona o produto ao estado
        state.success = true;
      })
      .addCase(submitFormProducts.rejected, (state, action) => {
        state.loading = false;
        state.errors.general = action.error?.message || CONSTANTES.VAZIO;
      })
      .addCase(fetchProdutos.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(fetchProdutos.fulfilled, (state, action) => {
        state.loading = false;
        state.produtos = action.payload;
        state.success = true;
      })
      .addCase(fetchProdutos.rejected, (state, action) => {
        state.loading = false;
        state.errors.general = action.error?.message || CONSTANTES.VAZIO;
      })
      .addCase(updateProduto.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(updateProduto.fulfilled, (state, action) => {
        state.loading = false;
        // Encontra o índice do produto atualizado
        const index = state.produtos.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          // Substitui o produto antigo pelo atualizado
          state.produtos[index] = action.payload;
        }
        state.success = true;
        state.successMessage = 'Produto atualizado com sucesso';
      })
      .addCase(updateProduto.rejected, (state, action) => {
        state.loading = false;
        state.errors.general = action.error?.message || CONSTANTES.VAZIO;
      })
      .addCase(deleteProduto.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(deleteProduto.fulfilled, (state, action) => {
        state.loading = false;
        state.produtos = state.produtos.filter(produto => produto.id !== action.payload);
        state.success = true;
        state.successMessage = 'Produto deletado com sucesso';
      })
      .addCase(deleteProduto.rejected, (state, action) => {
        state.loading = false;
        state.errors.general = action.error?.message || CONSTANTES.VAZIO;
      });
  },
});

export default addProductSlice.reducer;

export const {
  setNomeProduto,
  setLinkImage,
  setLinkAliexpress,
  setLinkAmazon,
  setLinkMercadoLivre,
  setCategoria,
  resetForm, // Exportando o resetForm
  clearErrors,
  setError,
} = addProductSlice.actions;
