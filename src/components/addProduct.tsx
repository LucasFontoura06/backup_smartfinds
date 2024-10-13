import React, { useState } from 'react';
import { Box, Card, CardHeader, CardContent, CardActions, Grid, TextField, Button } from '@mui/material';
import { v4 as uuidv4 } from 'uuid'; // Para gerar o produtoid
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Firebase configurado

// Definindo o tipo para o estado de alerta
interface AlertState {
  severity: 'success' | 'error'; // Definindo os possíveis valores para "severity"
  message: string; // Mensagem do alerta
}

const AddProductForm: React.FC = () => {
  const [produtoid] = useState(uuidv4); // Gerando um ID único para o produto
  const [nomeProduto, setNomeProduto] = useState('');
  const [imagemLink, setImagemLink] = useState('');
  const [produtoDescricao, setProdutoDescricao] = useState('');
  const [links, setLinks] = useState({
    linkAmazon: '',
    linkShoppe: '',
    linkMercadoLivre: '',
    linkAliexpress: ''
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<AlertState | null>(null); // Usando o tipo AlertState

  const handleLinkChange = (platform: string, value: string) => {
    setLinks({
      ...links,
      [platform]: value,
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setAlert(null); // Limpando alertas anteriores

    const newProduct = {
      produtoid, // ID gerado automaticamente
      nomeProduto, // Nome do produto
      imagemLink, // Link da imagem do produto
      produtoDescricao,
      ...links, // Links de afiliados
    };

    try {
      // Tentando adicionar o produto ao Firestore
      const docRef = await addDoc(collection(db, 'produtos'), newProduct);
      console.log("Produto cadastrado com sucesso! ID: ", docRef.id);
      setAlert({ severity: 'success', message: 'Produto cadastrado com sucesso!' });
    } catch (error) {
      console.error("Erro ao cadastrar o produto: ", error);
      setAlert({ severity: 'error', message: 'Erro ao cadastrar o produto.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      m={4}
    >
      {/* Exemplo de loading e alerta */}
      {loading ? <p>Carregando...</p> : null}
      {alert && <p>{alert.message}</p>}
      
      <Card className="form" elevation={5}
        sx={{ 
          flexGrow: 1, 
          backgroundColor: '#2e2e2e', 
          padding: 4,
          borderRadius: 2 
        }}
      >
        <CardHeader title="Cadastro de Produto" className="text-white font-bold" sx={{ color: '#fff' }} />
        <CardContent>
          <Grid container spacing={2}>
            {/* Campo para o nome do produto */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nome do Produto"
                variant="outlined"
                value={nomeProduto}
                onChange={(e) => setNomeProduto(e.target.value)}
                sx={{ backgroundColor: '#fff', borderRadius: 1, color: '#000' }}
              />
            </Grid>

            {/* Campo para o link da imagem do produto */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Link da Imagem do Produto"
                variant="outlined"
                value={imagemLink}
                onChange={(e) => setImagemLink(e.target.value)}
                sx={{ backgroundColor: '#fff', borderRadius: 1, color: '#000' }}
              />
            </Grid>

            {/* Campo para a descrição do produto */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Descrição do Produto"
                variant="outlined"
                value={produtoDescricao}
                onChange={(e) => setProdutoDescricao(e.target.value)}
                sx={{ backgroundColor: '#fff', borderRadius: 1, color: '#000' }}
              />
            </Grid>

            {/* Campos para os links de afiliados */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Link de Afiliado Amazon"
                variant="outlined"
                value={links.linkAmazon}
                onChange={(e) => handleLinkChange('linkAmazon', e.target.value)}
                sx={{ backgroundColor: '#fff', borderRadius: 1, color: '#000' }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Link de Afiliado Shopee"
                variant="outlined"
                value={links.linkShoppe}
                onChange={(e) => handleLinkChange('linkShoppe', e.target.value)}
                sx={{ backgroundColor: '#fff', borderRadius: 1, color: '#000' }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Link de Afiliado Mercado Livre"
                variant="outlined"
                value={links.linkMercadoLivre}
                onChange={(e) => handleLinkChange('linkMercadoLivre', e.target.value)}
                sx={{ backgroundColor: '#fff', borderRadius: 1, color: '#000' }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Link de Afiliado AliExpress"
                variant="outlined"
                value={links.linkAliexpress}
                onChange={(e) => handleLinkChange('linkAliexpress', e.target.value)}
                sx={{ backgroundColor: '#fff', borderRadius: 1, color: '#000' }}
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
            CADASTRAR
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default AddProductForm;
