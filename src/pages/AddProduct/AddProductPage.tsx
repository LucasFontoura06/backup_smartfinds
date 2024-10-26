import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import { 
  resetForm, 
  setNomeProduto, 
  setLinkImage, 
  setLinkAliexpress, 
  setLinkAmazon, 
  setLinkMercadoLivre, 
  setCategoria, 
  submitFormProducts, 
  setProductId
} from "../../lib/features/AddProducts/addProcuctSlice";
import { Box, Card, CardContent, Grid, Button, CardActions, Typography, Alert, CircularProgress, FormControl, InputLabel, Select, MenuItem, FormHelperText, Snackbar } from "@mui/material";
import { unwrapResult } from "@reduxjs/toolkit";
import InputForm from "../../components/inputForm";

interface AddProductsFormProps {
  produtoParaEditar?: any;
  onProductUpdated?: () => void;
}

// Lista de categorias (você pode expandir ou carregar dinamicamente do backend)
const categorias = [
  "Eletrônicos",
  "Roupas",
  "Acessórios",
  "Casa e Decoração",
  "Livros",
  "Outros"
];

function AddProductsForm({ produtoParaEditar, onProductUpdated }: AddProductsFormProps) {
  const dispatch = useAppDispatch();
  const { values, touched, errors, loading } = useAppSelector((state: any) => state.addProducts);
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
      dispatch(setNomeProduto(produtoParaEditar.name || ""));
      dispatch(setLinkImage(produtoParaEditar.linkImage || ""));
      dispatch(setLinkAliexpress(produtoParaEditar.linkAliexpress || ""));
      dispatch(setLinkAmazon(produtoParaEditar.linkAmazon || ""));
      dispatch(setLinkMercadoLivre(produtoParaEditar.linkMercadoLivre || ""));
      dispatch(setCategoria(produtoParaEditar.categoria || ""));
    } else {
      dispatch(resetForm());
    }
  }, [produtoParaEditar, dispatch]);

  const handleSubmit = async () => {
    try {
      const validValues = {
        ...values,
        name: values.name?.trim() || "",
        linkImage: values.linkImage?.trim() || "",
        linkAliexpress: values.linkAliexpress?.trim() || "",
        linkAmazon: values.linkAmazon?.trim() || "",
        linkMercadoLivre: values.linkMercadoLivre?.trim() || "",
        categoria: values.categoria?.trim() || ""
      };

      // Verificação dos campos obrigatórios
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

      // Validação básica de URL para o link da imagem
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
    }
  };

  // Função auxiliar para validar URLs
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
      m={4}
      sx={{
        flexGrow: 1,
        maxWidth: '800px',
        mx: 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography
        variant="h4"
        align="center"
        sx={{ fontWeight: 'bold', marginBottom: 6, marginTop: 2 }}
      >
        {produtoParaEditar ? 'Editar Produto' : 'Adicionar Produto'}
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
          <CircularProgress />
        </Box>
      ) : (
        <Card className="form" elevation={5}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <InputForm
                  label={`* Nome do Produto`}
                  value={values.name || ""}
                  onChange={(e: any) => {
                    dispatch(setNomeProduto(e.target.value));
                    setCamposObrigatorios(prev => ({ ...prev, name: false }));
                  }}
                  isInvalid={camposObrigatorios.name}
                  msgError={camposObrigatorios.name ? "Campo obrigatório" : ""}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <InputForm
                  label={`* Link da Imagem`}
                  value={values.linkImage || ""}
                  onChange={(e: any) => {
                    dispatch(setLinkImage(e.target.value));
                    setCamposObrigatorios(prev => ({ ...prev, linkImage: false }));
                  }}
                  isInvalid={camposObrigatorios.linkImage}
                  msgError={camposObrigatorios.linkImage ? "Campo obrigatório" : ""}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <InputForm
                  label={`Link AliExpress`}
                  value={values.linkAliexpress || ""}
                  onChange={(e: any) => dispatch(setLinkAliexpress(e.target.value))}
                  isInvalid={touched.linkAliexpress && Boolean(errors.linkAliexpress)}
                  msgError={touched.linkAliexpress ? errors.linkAliexpress : false}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <InputForm
                  label={`Link Amazon`}
                  value={values.linkAmazon || ""}
                  onChange={(e: any) => dispatch(setLinkAmazon(e.target.value))}
                  isInvalid={touched.linkAmazon && Boolean(errors.linkAmazon)}
                  msgError={touched.linkAmazon ? errors.linkAmazon : false}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <InputForm
                  label={`Link Mercado Livre`}
                  value={values.linkMercadoLivre || ""}
                  onChange={(e: any) => dispatch(setLinkMercadoLivre(e.target.value))}
                  isInvalid={touched.linkMercadoLivre && Boolean(errors.linkMercadoLivre)}
                  msgError={touched.linkMercadoLivre ? errors.linkMercadoLivre : false}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth error={camposObrigatorios.categoria}>
                  <InputLabel id="categoria-label">* Categoria</InputLabel>
                  <Select
                    labelId="categoria-label"
                    value={values.categoria || ""}
                    onChange={(e) => {
                      dispatch(setCategoria(e.target.value));
                      setCamposObrigatorios(prev => ({ ...prev, categoria: false }));
                    }}
                    label="Categoria"
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
            </Grid>
          </CardContent>
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? 'Carregando...' : 'Salvar'}
            </Button>
          </CardActions>
        </Card>
      )}
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default AddProductsForm;
