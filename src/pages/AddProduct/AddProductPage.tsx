import { resetForm, setLinkAliexpress, setLinkAmazon, setLinkImage, setLinkMercadoLivre, setNomeProduto, submitFormProducts } from "../../lib/features/AddProducts/addProcuctSlice";
import { Box, Card, CardHeader, CardContent, Grid, Button, CardActions, Typography, Alert } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import { CONSTANTES } from "../../commom/constantes";
import InputForm from "../../components/inputForm";
import './AddProductPage.css';
import React, { useState } from "react";
import { unwrapResult } from "@reduxjs/toolkit";

function AddProductsForm() {
  const dispatch = useAppDispatch();
  const { values, touched, errors, loading } = useAppSelector((state: any) => state.addProducts);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Função para lidar com o envio do formulário
  const handleSubmit = async () => {
    try {
      // Despachando a ação e usando unwrapResult para lidar com o sucesso ou erro
      const actionResult = await dispatch(submitFormProducts(values));
      const result = unwrapResult(actionResult);

      // Se chegou aqui, foi bem-sucedido
      setSuccessMessage('Formulário enviado com sucesso!');
      setErrorMessage(null); // Limpa qualquer mensagem de erro

      // Reseta o formulário após o envio bem-sucedido
      dispatch(resetForm());
    } catch (err) {
      // Lida com erros ao despachar a ação
      setErrorMessage('Erro ao enviar o produto. Tente novamente.');
      setSuccessMessage(null); // Limpa a mensagem de sucesso, se houver
      console.error(CONSTANTES.ERROR_ADD_PRODUCT, err);
    }
  };

  return (
    <div>
      <Box
        component="form"
        m={4}
        sx={{
          flexGrow: 1,
          maxWidth: '800px', // Largura máxima do formulário
          mx: 'auto', // Centraliza horizontalmente
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography
          variant="h4" // Define o tamanho do título
          align="center" // Centraliza o título
          sx={{ fontWeight: 'bold', marginBottom: 6, marginTop: 2 }} // Estilo adicional para aumentar o tamanho e margem
        >
          Cadastro de Produto
        </Typography>

        {/* Exibe mensagem de sucesso ou erro */}
        {successMessage && <Alert severity="success">{successMessage}</Alert>}
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

        <Card className="form" elevation={5}>
          <CardHeader
            title="Formulário" // Novo título "Formulário"
            className="text-white font-bold"
            sx={{ textAlign: 'center', fontSize: '1.5rem' }} // Estilo para centralizar e aumentar o tamanho da fonte
          />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <InputForm
                  label={`* ${CONSTANTES.LBL_NOME_PRODUTO}`}
                  value={values.name}
                  onChange={(e: any) => dispatch(setNomeProduto(e.target.value))}
                  className="input-field label-field"
                  isInvalid={touched.name && Boolean(errors.name)}
                  msgError={touched.name ? errors.name : false}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <InputForm
                  label={`* ${CONSTANTES.LBL_LINK_IMAGEM}`}
                  value={values.linkImage}
                  onChange={(e: any) => dispatch(setLinkImage(e.target.value))}
                  className="input-field label-field"
                  isInvalid={touched.linkImage && Boolean(errors.linkImage)}
                  msgError={touched.linkImage ? errors.linkImage : false}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <InputForm
                  label={`* ${CONSTANTES.LBL_AFILIADO_ALIEXPRESS}`}
                  value={values.linkAliexpress}
                  onChange={(e: any) => dispatch(setLinkAliexpress(e.target.value))}
                  className="input-field label-field"
                  isInvalid={touched.linkAliexpress && Boolean(errors.linkAliexpress)}
                  msgError={touched.linkAliexpress ? errors.linkAliexpress : false}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <InputForm
                  label={`* ${CONSTANTES.LBL_AFILIADO_AMAZON}`}
                  value={values.linkAmazon}
                  onChange={(e: any) => dispatch(setLinkAmazon(e.target.value))}
                  className="input-field label-field"
                  isInvalid={touched.linkAmazon && Boolean(errors.linkAmazon)}
                  msgError={touched.linkAmazon ? errors.linkAmazon : false}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <InputForm
                  label={`* ${CONSTANTES.LBL_AFILIADO_MERCADO_LIVRE}`}
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
              onClick={handleSubmit} // Chama a função handleSubmit no clique do botão
              disabled={loading} // Desativa o botão enquanto estiver carregando
            >
              {loading ? 'Carregando...' : 'CADASTRAR'}
            </Button>
          </CardActions>
        </Card>
      </Box>
    </div>
  );
}

export default AddProductsForm;
