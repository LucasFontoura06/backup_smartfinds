import { resetForm, setNomeProduto, setLinkImage, setLinkAliexpress, setLinkAmazon, setLinkMercadoLivre, setCategoria, submitFormProducts, setProductId } from "../../lib/features/AddProducts/addProcuctSlice";import { Box, Card, CardContent, Grid, Button, CardActions, Typography, Alert, CircularProgress, FormControl, InputLabel, Select, MenuItem, FormHelperText, Snackbar, Container } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import React, { useEffect, useState } from "react";
import InputForm from "../../components/inputForm";
import { unwrapResult } from "@reduxjs/toolkit";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import useMediaQuery from '@mui/material/useMediaQuery';

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
  const isMobile = useMediaQuery('(max-width:768px)');

  // Definindo cores personalizadas (mesmas do dashboard)
  const customColors = {
    primary: '#6366F1',
    secondary: '#F8FAFC',
    text: '#64748B',
    highlight: '#818CF8'
  };

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
    <Container maxWidth="xl" sx={{ 
      px: isMobile ? '8px !important' : '24px !important'
    }}>
      <Box sx={{ 
        py: 4,
        px: isMobile ? 2 : 4,
        backgroundColor: '#f0f2f5',
        minHeight: '100vh'
      }}>
        <Card sx={{ 
          borderRadius: '16px',
          p: isMobile ? 2 : 4
        }}>
          <CardContent sx={{ 
            p: isMobile ? 1 : 4
          }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              mb: 4 
            }}>
              <AddCircleIcon 
                sx={{ 
                  color: customColors.primary,
                  mr: 2,
                  fontSize: 24
                }} 
              />
              <Typography
                variant="h6"
                sx={{ 
                  color: customColors.text,
                  fontWeight: 600,
                  fontSize: '1.1rem'
                }}
              >
                {produtoParaEditar ? 'Editar Produto' : 'Novo Produto'}
              </Typography>
            </Box>

            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                <CircularProgress size={30} sx={{ color: customColors.primary }} />
              </Box>
            ) : (
              <Grid container spacing={isMobile ? 2 : 3}>
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
                        backgroundColor: 'white',
                        '&:hover fieldset': {
                          borderColor: customColors.primary,
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: customColors.primary,
                        }
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
                        backgroundColor: 'white',
                        '&:hover fieldset': {
                          borderColor: customColors.primary,
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: customColors.primary,
                        }
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
                        backgroundColor: 'white',
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: customColors.primary,
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: customColors.primary,
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
                        backgroundColor: 'white',
                        '&:hover fieldset': {
                          borderColor: customColors.primary,
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: customColors.primary,
                        }
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
                        backgroundColor: 'white',
                        '&:hover fieldset': {
                          borderColor: customColors.primary,
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: customColors.primary,
                        }
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
                        backgroundColor: 'white',
                        '&:hover fieldset': {
                          borderColor: customColors.primary,
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: customColors.primary,
                        }
                      }
                    }}
                  />
                </Grid>
              </Grid>
            )}

            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'flex-end',
              mt: 4,
              pt: 3,
              borderTop: `1px solid ${customColors.secondary}`
            }}>
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={loading}
                sx={{
                  minWidth: '120px',
                  backgroundColor: customColors.primary,
                  '&:hover': {
                    backgroundColor: customColors.highlight,
                  },
                  textTransform: 'none',
                  boxShadow: 'none',
                  borderRadius: '8px'
                }}
              >
                {loading ? 'Salvando...' : 'Salvar'}
              </Button>
            </Box>
          </CardContent>
        </Card>

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
              backgroundColor: snackbarSeverity === 'success' ? '#4CAF50' : '#f44336',
              color: '#ffffff',
              '& .MuiAlert-icon': {
                color: '#ffffff'
              },
              '& .MuiSvgIcon-root': {
                color: '#ffffff'
              },
              boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
              borderRadius: '8px',
              '& .MuiAlert-message': {
                fontSize: '0.95rem',
                fontWeight: 500
              }
            }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
}

export default AddProductsForm;
