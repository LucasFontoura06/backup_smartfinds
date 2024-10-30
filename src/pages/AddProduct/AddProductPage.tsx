import { resetForm, setNomeProduto, setLinkImage, setLinkAliexpress, setLinkAmazon, setLinkMercadoLivre, setCategoria, submitFormProducts, setProductId } from "../../lib/features/AddProducts/addProcuctSlice";import { Box, Card, CardContent, Grid, Button, CardActions, Typography, Alert, CircularProgress, FormControl, InputLabel, Select, MenuItem, FormHelperText, Snackbar } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import React, { useEffect, useState } from "react";
import InputForm from "../../components/inputForm";
import { unwrapResult } from "@reduxjs/toolkit";

interface AddProductsFormProps {
  produtoParaEditar?: any;
  onProductUpdated?: () => void;
}

// Lista de categorias
const categorias = [
  "Eletrônicos",
  "Computadores e Acessórios",
  "Casa e Cozinha",
  "Roupas, Calçados e Joias",
  "Beleza e Cuidados Pessoais",
  "Saúde, Higiene e Bebê",
  "Esportes e Atividades ao Ar Livre",
  "Brinquedos e Jogos",
  "Automotivo",
  "Livros",
  "Ferramentas e Melhorias Domésticas",
  "Alimentos e Bebidas",
  "Móveis",
  "Eletrodomésticos",
  "Pet Shop",
  "Artigos de Papelaria e Escritório",
  "Relógios",
  "Instrumentos Musicais",
  "Jardinagem e Ar Livre",
  "Artes, Artesanato e Costura",
  "Filmes e TV",
  "Video Games",
  "Software",
  "Bagagem e Acessórios de Viagem",
  "Industriais e Científicos",
  "Bebidas e Suplementos Nutricionais",
  "Câmeras e Fotografia",
  "Produtos para Escritório",
  "Sapatos e Bolsas",
  "Áudio e Som para Automóveis"
];

function AddProductsForm({ produtoParaEditar, onProductUpdated }: AddProductsFormProps) {
  const dispatch = useAppDispatch();
  const { values } = useAppSelector((state: any) => state.addProducts);
  const [loading, setLoading] = useState(false); // Adicionar este estado
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");
  const [camposObrigatorios, setCamposObrigatorios] = useState({
    name: false,
    linkImage: false,
    categoria: false
  });

  useEffect(() => {
    if (produtoParaEditar) {
      // Os valores já estarão carregados pelo setValues no handleOpenEditDialog
      // Não precisamos fazer nada aqui
    } else {
      dispatch(resetForm());
    }
  }, [produtoParaEditar, dispatch]);

  const handleSubmit = async () => {
    try {
      setLoading(true); // Ativar loading
      const validValues = {
        ...values,
        name: values.name?.trim() || "",
        linkImage: values.linkImage?.trim() || "",
        linkAliexpress: values.linkAliexpress?.trim() || "",
        linkAmazon: values.linkAmazon?.trim() || "",
        linkMercadoLivre: values.linkMercadoLivre?.trim() || "",
        categoria: values.categoria?.trim() || ""
      };

      const camposInvalidos = {
        name: !validValues.name,
        linkImage: !validValues.linkImage,
        categoria: !validValues.categoria
      };

      if (Object.values(camposInvalidos).some(Boolean)) {
        setCamposObrigatorios(camposInvalidos);
        showSnackbar('Por favor preencha todos os dados obrigatórios.', 'error');
        return;
      }

      if (!isValidUrl(validValues.linkImage)) {
        showSnackbar('O link da imagem não é uma URL válida.', 'error');
        return;
      }

      if (produtoParaEditar && produtoParaEditar.id) {
        validValues.id = produtoParaEditar.id;
      }

      const actionResult = await dispatch(submitFormProducts(validValues));
      const resultData = unwrapResult(actionResult);

      if (resultData && resultData.id) {
        dispatch(setProductId(resultData.id));
        validValues.id = resultData.id;
        await dispatch(submitFormProducts(validValues));
      }

      showSnackbar(produtoParaEditar ? 'Produto atualizado com sucesso!' : 'Produto criado com sucesso!', 'success');

      if (onProductUpdated) {
        onProductUpdated();
      }

      dispatch(resetForm());
    } catch (err) {
      showSnackbar('Erro ao salvar o produto. Tente novamente.', 'error');
      console.error("Erro ao adicionar ou atualizar produto:", err);
    } finally {
      setLoading(false); // Desativar loading
    }
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const showSnackbar = (message: string, severity: "success" | "error") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Box
      component="form"
      sx={{
        flexGrow: 1,
        width: '100%',
        maxWidth: '900px',
        mx: 'auto',
        p: 3,
      }}
    >
      <Typography
        variant="h5"
        sx={{ 
          fontWeight: 500, 
          marginBottom: 4, 
          color: '#37352f',
          borderBottom: '2px solid #f0f0f0',
          paddingBottom: 2
        }}
      >
        {produtoParaEditar ? 'Editar Produto' : 'Novo Produto'}
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress size={30} />
        </Box>
      ) : (
        <Card elevation={0} sx={{ backgroundColor: 'transparent' }}>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <InputForm
                  label="Nome do Produto *"
                  value={values.name || ""}
                  onChange={(e: any) => {
                    dispatch(setNomeProduto(e.target.value));
                    setCamposObrigatorios(prev => ({ ...prev, name: false }));
                  }}
                  isInvalid={camposObrigatorios.name}
                  msgError={camposObrigatorios.name ? "Campo obrigatório" : ""}
                  fullWidth
                  sx={{ 
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#fff',
                      '&:hover fieldset': {
                        borderColor: '#d0d0d0',
                      },
                    }
                  }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <InputForm
                  label="Link da Imagem *"
                  value={values.linkImage || ""}
                  onChange={(e: any) => {
                    dispatch(setLinkImage(e.target.value));
                    setCamposObrigatorios(prev => ({ ...prev, linkImage: false }));
                  }}
                  isInvalid={camposObrigatorios.linkImage}
                  msgError={camposObrigatorios.linkImage ? "Campo obrigatório" : ""}
                  fullWidth
                  sx={{ 
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#fff',
                    }
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth error={camposObrigatorios.categoria}>
                  <InputLabel id="categoria-label">Categoria *</InputLabel>
                  <Select
                    labelId="categoria-label"
                    value={values.categoria || ""}
                    onChange={(e) => {
                      dispatch(setCategoria(e.target.value));
                      setCamposObrigatorios(prev => ({ ...prev, categoria: false }));
                    }}
                    label="Categoria"
                    sx={{ 
                      backgroundColor: '#fff',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: camposObrigatorios.categoria ? 'error.main' : '#d0d0d0',
                      }
                    }}
                  >
                    {categorias.map((categoria) => (
                      <MenuItem key={categoria} value={categoria}>
                        {categoria}
                      </MenuItem>
                    ))}
                  </Select>
                  {camposObrigatorios.categoria && (
                    <FormHelperText>Campo obrigatório</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} md={4}>
                <InputForm
                  label="Link AliExpress"
                  value={values.linkAliexpress || ""}
                  onChange={(e: any) => dispatch(setLinkAliexpress(e.target.value))}
                  fullWidth
                  sx={{ 
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#fff',
                    }
                  }}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <InputForm
                  label="Link Amazon"
                  value={values.linkAmazon || ""}
                  onChange={(e: any) => dispatch(setLinkAmazon(e.target.value))}
                  fullWidth
                  sx={{ 
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#fff',
                    }
                  }}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <InputForm
                  label="Link Mercado Livre"
                  value={values.linkMercadoLivre || ""}
                  onChange={(e: any) => dispatch(setLinkMercadoLivre(e.target.value))}
                  fullWidth
                  sx={{ 
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#fff',
                    }
                  }}
                />
              </Grid>
            </Grid>
          </CardContent>
          
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'flex-end',
            mt: 3,
            borderTop: '1px solid #f0f0f0',
            pt: 3
          }}>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={loading}
              sx={{
                minWidth: '120px',
                backgroundColor: '#1976d2',
                '&:hover': {
                  backgroundColor: '#1565c0',
                },
                textTransform: 'none',
                boxShadow: 'none'
              }}
            >
              {loading ? 'Salvando...' : 'Salvar'}
            </Button>
          </Box>
        </Card>
      )}

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbarSeverity} 
          sx={{ 
            width: '100%',
            backgroundColor: snackbarSeverity === 'success' ? '#4CAF50' : '#f44336', // Cores mais vibrantes
            color: '#ffffff', // Texto branco para melhor contraste
            '& .MuiAlert-icon': {
              color: '#ffffff' // Ícone branco
            },
            '& .MuiSvgIcon-root': { // Estilo para o ícone de fechar
              color: '#ffffff'
            },
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)', // Sombra sutil
            '& .MuiAlert-message': {
              fontSize: '0.95rem', // Tamanho do texto um pouco maior
              fontWeight: 500 // Texto um pouco mais bold
            }
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default AddProductsForm;
