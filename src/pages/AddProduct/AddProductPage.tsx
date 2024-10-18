import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import { resetForm, setNomeProduto, setLinkImage, setLinkAliexpress, setLinkAmazon, setLinkMercadoLivre, submitFormProducts, updateProduto } from "../../lib/features/AddProducts/addProcuctSlice";
import { Box, Card, CardHeader, CardContent, Grid, Button, CardActions, Typography, Alert } from "@mui/material";
import { unwrapResult } from "@reduxjs/toolkit";
import InputForm from "../../components/inputForm";

interface AddProductsFormProps {
  produtoParaEditar?: any;
  onProductUpdated?: () => void; // Callback para ser chamado após a atualização
}

function AddProductsForm({ produtoParaEditar, onProductUpdated }: AddProductsFormProps) {
  const dispatch = useAppDispatch();
  const { values, touched, errors, loading } = useAppSelector((state: any) => state.addProducts);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (produtoParaEditar) {
      // Preenche o formulário com os valores do produto para edição
      dispatch(setNomeProduto(produtoParaEditar.name));
      dispatch(setLinkImage(produtoParaEditar.linkImage));
      dispatch(setLinkAliexpress(produtoParaEditar.linkAliexpress));
      dispatch(setLinkAmazon(produtoParaEditar.linkAmazon));
      dispatch(setLinkMercadoLivre(produtoParaEditar.linkMercadoLivre));
    }
  }, [produtoParaEditar, dispatch]);

  const handleSubmit = async () => {
    try {
      if (produtoParaEditar) {
        // Atualiza o produto existente no Firestore
        const actionResult = await dispatch(updateProduto({ ...values, id: produtoParaEditar.id }));
        unwrapResult(actionResult);
        setSuccessMessage('Produto atualizado com sucesso!');
        if (onProductUpdated) {
          onProductUpdated(); // Chama o callback para fechar o modal
        }
      } else {
        const actionResult = await dispatch(submitFormProducts(values));
        unwrapResult(actionResult);
        setSuccessMessage('Produto criado com sucesso!');
        if (onProductUpdated) {
          onProductUpdated(); // Chama o callback para fechar o modal após criação
        }
      }

      setErrorMessage(null);
      dispatch(resetForm());
    } catch (err) {
      setErrorMessage('Erro ao salvar o produto. Tente novamente.');
      setSuccessMessage(null);
      console.error("Erro ao adicionar ou atualizar produto:", err);
    }
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

      {successMessage && <Alert severity="success">{successMessage}</Alert>}
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

      <Card className="form" elevation={5}>
        <CardHeader
          // title={produtoParaEditar ? "Editar Produto" : "Adicionar Produto"}
          className="text-white font-bold"
          sx={{ textAlign: 'center', fontSize: '1.5rem' }}
        />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <InputForm
                label={`* Nome do Produto`}
                value={values.name}
                onChange={(e: any) => dispatch(setNomeProduto(e.target.value))}
                className="input-field label-field"
                isInvalid={touched.name && Boolean(errors.name)}
                msgError={touched.name ? errors.name : false}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputForm
                label={`* Link da Imagem`}
                value={values.linkImage}
                onChange={(e: any) => dispatch(setLinkImage(e.target.value))}
                className="input-field label-field"
                isInvalid={touched.linkImage && Boolean(errors.linkImage)}
                msgError={touched.linkImage ? errors.linkImage : false}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputForm
                label={`Link AliExpress`}
                value={values.linkAliexpress}
                onChange={(e: any) => dispatch(setLinkAliexpress(e.target.value))}
                className="input-field label-field"
                isInvalid={touched.linkAliexpress && Boolean(errors.linkAliexpress)}
                msgError={touched.linkAliexpress ? errors.linkAliexpress : false}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputForm
                label={`Link Amazon`}
                value={values.linkAmazon}
                onChange={(e: any) => dispatch(setLinkAmazon(e.target.value))}
                className="input-field label-field"
                isInvalid={touched.linkAmazon && Boolean(errors.linkAmazon)}
                msgError={touched.linkAmazon ? errors.linkAmazon : false}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputForm
                label={`Link Mercado Livre`}
                value={values.linkMercadoLivre}
                onChange={(e: any) => dispatch(setLinkMercadoLivre(e.target.value))}
                className="input-field label-field"
                isInvalid={touched.linkMercadoLivre && Boolean(errors.linkMercadoLivre)}
                msgError={touched.linkMercadoLivre ? errors.linkMercadoLivre : false}
              />
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
    </Box>
  );
}

export default AddProductsForm;
