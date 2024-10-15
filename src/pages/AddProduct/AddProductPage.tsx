import { CONSTANTES } from "../../commom/constantes";
import InputForm from "../../components/inputForm";
import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import { Box, Card, CardHeader, CardContent, Grid, Button, CardActions, Typography } from "@mui/material";
import React, { useState } from "react";
import './AddProductPage.css'; // Importando o CSS

function AddProductsForm() {
  const dispatch = useAppDispatch();
  const { values, errors, touched } = useAppSelector((state: any) => state.addProducts);

  const [loading, setLoading] = useState(false);

  // Função de submit
  const handleSubmit = async () => {
    setLoading(true);

    try {
      // Aqui você pode disparar a ação de cadastro de produto, por exemplo:
      // dispatch(cadastrarProdutoAction(values));
      console.log('Formulário enviado com sucesso');
    } catch (error) {
      console.error('Erro ao enviar o formulário', error);
    } finally {
      setLoading(false); // Redefine o estado de loading após o envio
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
                  className="input-field label-field"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <InputForm
                  label={`* ${CONSTANTES.LBL_LINK_IMAGEM}`}
                  className="input-field label-field"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <InputForm
                  label={`* ${CONSTANTES.LBL_AFILIADO_ALIEXPRESS}`}
                  className="input-field label-field"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <InputForm
                  label={`* ${CONSTANTES.LBL_AFILIADO_AMAZON}`}
                  className="input-field label-field"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <InputForm
                  label={`* ${CONSTANTES.LBL_AFILIADO_MERCADO_LIVRE}`}
                  className="input-field label-field"
                />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
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
