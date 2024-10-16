import { resetForm, setLinkAliexpress, setLinkAmazon, setLinkImage, setLinkMercadoLivre, setNomeProduto, submitFormProducts } from "../../lib/features/AddProducts/addProcuctSlice";
import { Box, Card, CardHeader, CardContent, Grid, Button, CardActions, Typography, Alert } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import { CONSTANTES } from "../../commom/constantes";
import InputForm from "../../components/inputForm";
import { unwrapResult } from "@reduxjs/toolkit";
import React, { useState } from "react";
import './AddProductPage.css';

function AddProductsForm() {
  const dispatch = useAppDispatch();
  const { values, touched, errors, loading } = useAppSelector((state: any) => state.addProducts);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      const actionResult = await dispatch(submitFormProducts(values));
      const result = unwrapResult(actionResult);

      setSuccessMessage('Formulário enviado com sucesso!');
      setErrorMessage(null); 
      dispatch(resetForm());
    } catch (err) {
      setErrorMessage('Erro ao enviar o produto. Tente novamente.');
      setSuccessMessage(null); 
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
          {CONSTANTES.LBL_TITLE_PAGE_PRODUCTS}
        </Typography>

        {successMessage && <Alert severity="success">{successMessage}</Alert>}
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

        <Card className="form" elevation={5}>
          <CardHeader
            title={CONSTANTES.LBL_TITLE_FORM}
            className="text-white font-bold"
            sx={{ textAlign: 'center', fontSize: '1.5rem' }} 
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
              onClick={handleSubmit} 
              disabled={loading} 
            >
              {loading ? 'Carregando...' : CONSTANTES.LBL_BUTTON_SUBMIT}
            </Button>
          </CardActions>
        </Card>
      </Box>
    </div>
  );
}

export default AddProductsForm;
