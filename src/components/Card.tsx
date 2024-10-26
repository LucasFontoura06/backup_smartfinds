import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig"; 
import { Box, Container, Grid, Card, CardContent, CardMedia, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { CONSTANTES } from "../commom/constantes";

// Define a interface para os links do produto
interface ProductLinks {
  amazon?: string;
  mercadoLivre?: string;
  shopee?: string;
  aliexpress?: string;
}

// Define a interface para o produto
interface Product {
  id: string;
  linkImage: string;
  name: string;
  linkAmazon?: string;
  linkMercadoLivre?: string;
  linkShopee?: string;
  linkAliexpress?: string;
}

// Componente do Card com o layout dos afiliados
const ProductCard = ({ img, title, productLinks }: { img: string; title: string; productLinks: ProductLinks }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Card
        sx={{
          backgroundColor: "#fff",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Leve sombra no card
          borderRadius: "8px", // Bordas arredondadas
        }}
      >
        <CardMedia
          component="img"
          image={img}
          alt={title}
          sx={{ height: 150, objectFit: 'contain' }} 
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" align="center">
            {title}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleClickOpen}
            sx={{ mb: 1 }}
          >
            {CONSTANTES.LBL_VER_OPCOES_COMPRA}
          </Button>
        </CardContent>
      </Card>

      {/* Pop-up para exibir opções de compra */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{CONSTANTES.LBL_ESCOLHA_PLATAFORMA}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {CONSTANTES.LBL_SELECIONE_PLATAFORMA}
          </DialogContentText>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {productLinks.amazon && (
              <Grid item xs={6}>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => window.open(productLinks.amazon, "_blank")}
                >
                  {CONSTANTES.LBL_AMAZON}
                </Button>
              </Grid>
            )}
            {productLinks.mercadoLivre && (
              <Grid item xs={6}>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => window.open(productLinks.mercadoLivre, "_blank")}
                >
                  {CONSTANTES.LBL_MERCADO_LIVRE}
                </Button>
              </Grid>
            )}
            {productLinks.shopee && (
              <Grid item xs={6}>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => window.open(productLinks.shopee, "_blank")}
                >
                  {CONSTANTES.LBL_SHOPEE}
                </Button>
              </Grid>
            )}
            {productLinks.aliexpress && (
              <Grid item xs={6}>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => window.open(productLinks.aliexpress, "_blank")}
                >
                  {CONSTANTES.LBL_ALIEXPRESS}
                </Button>
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            {CONSTANTES.LBL_BUTTON_FECHAR}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

// Função para buscar produtos em tempo real
const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "produtos"), (snapshot) => {
      const productsData: Product[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];
      setProducts(productsData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Container
      sx={{
        backgroundColor: "#001529", // Cor de fundo da página
        minHeight: "100vh", // Altura mínima da página para cobrir toda a tela
        padding: "2rem",
      }}
    >
      <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', color: '#fff', marginBottom: 6, marginTop: 4 }}>
        {CONSTANTES.LBL_LISTA_PRODUTOS}
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>
            <ProductCard
              img={product.linkImage}
              title={product.name}
              productLinks={{
                amazon: product.linkAmazon,
                mercadoLivre: product.linkMercadoLivre,
                shopee: product.linkShopee,
                aliexpress: product.linkAliexpress,
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductList;
