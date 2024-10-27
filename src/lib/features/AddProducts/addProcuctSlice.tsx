import { doc, collection, getDocs, deleteDoc, updateDoc, addDoc } from "firebase/firestore";
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { CONSTANTES } from '../../../commom/constantes';
import Product from '../../../commom/products'; 
import { db } from '../../../firebaseConfig'; 
import * as Yup from "yup";

const addProdutosShema = Yup.object().shape({
  categoria: Yup.string().required(CONSTANTES.LBL_SCHEMA_CATEGORIA), // Nova validação
  linkImage: Yup.string().required(CONSTANTES.LBL_SCHEMA_LINK_IMAGE),
  name: Yup.string().required(CONSTANTES.LBL_SCHEMA_NAME),
  linkMercadoLivre: Yup.string(),
  linkAliexpress: Yup.string(),
  linkAmazon: Yup.string(),
});

const INITIAL_STATE = {
  touched: {} as Record<string, boolean>,
  errors: {} as Record<string, string>,
  produtos: [] as Product[],
  successMessage: '',
  validForm: false,
  success: false,
  loading: false,
  values: {
    linkMercadoLivre: CONSTANTES.VAZIO,
    linkAliexpress: CONSTANTES.VAZIO,
    linkAmazon: CONSTANTES.VAZIO,
    linkImage: CONSTANTES.VAZIO,
    categoria: CONSTANTES.VAZIO, 
    name: CONSTANTES.VAZIO,
    id: CONSTANTES.VAZIO,
    ativo: false,
  },
};

export const submitFormProducts = createAsyncThunk<Product, Partial<Product>>(
  CONSTANTES.LBL_ADD_SUBMIT_PRODUCTS,
  async (produtoData, { rejectWithValue }) => {
    try {
      const produtosCollectionRef = collection(db, CONSTANTES.LBL_PRODUTOS);
      
      let docRef;
      if (produtoData.id) {
        docRef = doc(produtosCollectionRef, produtoData.id);
        await updateDoc(docRef, produtoData);
      } else {
        docRef = await addDoc(produtosCollectionRef, produtoData);
      }
      return { ...produtoData, id: docRef.id } as Product;
    } catch (error: any) {
      return rejectWithValue(error.message || CONSTANTES.LBL_ERROR_ADD_PRODUCT);
    }
  }
);

export const updateProduto = createAsyncThunk<Product, Product>(
  'addProducts/updateProduto',
  async (produtoData, { rejectWithValue }) => {
    try {
      const produtoDocRef = doc(db, "produtos", produtoData.id);
      const { id, ...updateData } = produtoData;

      await updateDoc(produtoDocRef, updateData);
      return produtoData;

    } catch (error: any) {
      return rejectWithValue(error.message || "Erro ao atualizar produto");
    }
  }
);

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
    setProductId: (state, action: PayloadAction<string>) => {
      state.values.id = action.payload;
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
    setValues: (state, action: PayloadAction<Product>) => {
      state.values = {
        id: action.payload.id || CONSTANTES.VAZIO,
        name: action.payload.name || CONSTANTES.VAZIO,
        linkImage: action.payload.linkImage || CONSTANTES.VAZIO,
        linkAliexpress: action.payload.linkAliexpress || CONSTANTES.VAZIO,
        linkAmazon: action.payload.linkAmazon || CONSTANTES.VAZIO,
        linkMercadoLivre: action.payload.linkMercadoLivre || CONSTANTES.VAZIO,
        categoria: action.payload.categoria || CONSTANTES.VAZIO,
        ativo: action.payload.ativo || false,
      };
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
        const index = state.produtos.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          // Atualiza o produto existente
          state.produtos[index] = action.payload;
        } else {
          // Adiciona o novo produto
          state.produtos.push(action.payload);
        }
        state.values = action.payload; // Atualiza os valores do formulário com o produto salvo
        state.success = true;
        state.successMessage = 'Produto salvo com sucesso';
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
  resetForm,
  clearErrors,
  setError,
  setProductId,
  setValues,
} = addProductSlice.actions;
