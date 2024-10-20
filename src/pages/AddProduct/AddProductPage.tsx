import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import { resetForm, setNomeProduto, setLinkImage, setLinkAliexpress, setLinkAmazon, setLinkMercadoLivre, submitFormProducts } from "../../lib/features/AddProducts/addProcuctSlice";
import { Box, Card, CardContent, Grid, Button, CardActions, Typography, Alert, CircularProgress } from "@mui/material";
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
      dispatch(setNomeProduto(produtoParaEditar.name || ""));
      dispatch(setLinkImage(produtoParaEditar.linkImage || ""));
      dispatch(setLinkAliexpress(produtoParaEditar.linkAliexpress || ""));
      dispatch(setLinkAmazon(produtoParaEditar.linkAmazon || ""));
      dispatch(setLinkMercadoLivre(produtoParaEditar.linkMercadoLivre || ""));
    } else {
      // Limpa o formulário quando não há produto para editar
      dispatch(resetForm());
    }
  }, [produtoParaEditar, dispatch]);

  const handleSubmit = async () => {
    try {
      // Certifique-se de que todos os valores estão definidos antes de usar
      const validValues = {
        ...values,
        name: values.name || "", // Fallback para strings vazias
        linkImage: values.linkImage || "",
        linkAliexpress: values.linkAliexpress || "",
        linkAmazon: values.linkAmazon || "",
        linkMercadoLivre: values.linkMercadoLivre || ""
      };

      // Se for um produto em edição, adicione o campo `id`, caso contrário, não adicione
      if (produtoParaEditar && produtoParaEditar.id) {
        validValues.id = produtoParaEditar.id;
      }

      const actionResult = await dispatch(submitFormProducts(validValues));
      unwrapResult(actionResult);

      setSuccessMessage(produtoParaEditar ? 'Produto atualizado com sucesso!' : 'Produto criado com sucesso!');

      // Remove a mensagem de sucesso após 5 segundos
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);

      if (onProductUpdated) {
        onProductUpdated(); // Chama o callback para fechar o modal
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
                  value={values.name || ""} // Certifique-se de que nunca será undefined
                  onChange={(e: any) => dispatch(setNomeProduto(e.target.value))}
                  isInvalid={touched.name && Boolean(errors.name)}
                  msgError={touched.name ? errors.name : false}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <InputForm
                  label={`* Link da Imagem`}
                  value={values.linkImage || ""} // Certifique-se de que nunca será undefined
                  onChange={(e: any) => dispatch(setLinkImage(e.target.value))}
                  isInvalid={touched.linkImage && Boolean(errors.linkImage)}
                  msgError={touched.linkImage ? errors.linkImage : false}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <InputForm
                  label={`Link AliExpress`}
                  value={values.linkAliexpress || ""} // Certifique-se de que nunca será undefined
                  onChange={(e: any) => dispatch(setLinkAliexpress(e.target.value))}
                  isInvalid={touched.linkAliexpress && Boolean(errors.linkAliexpress)}
                  msgError={touched.linkAliexpress ? errors.linkAliexpress : false}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <InputForm
                  label={`Link Amazon`}
                  value={values.linkAmazon || ""} // Certifique-se de que nunca será undefined
                  onChange={(e: any) => dispatch(setLinkAmazon(e.target.value))}
                  isInvalid={touched.linkAmazon && Boolean(errors.linkAmazon)}
                  msgError={touched.linkAmazon ? errors.linkAmazon : false}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <InputForm
                  label={`Link Mercado Livre`}
                  value={values.linkMercadoLivre || ""} // Certifique-se de que nunca será undefined
                  onChange={(e: any) => dispatch(setLinkMercadoLivre(e.target.value))}
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
      )}
    </Box>
  );
}

export default AddProductsForm;
