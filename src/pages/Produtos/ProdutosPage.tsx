import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebaseConfig"; 
import { Box, Container, Grid, Card, CardContent, CardMedia, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

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
          backgroundColor: "#f9f9f9",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Sombra leve para destacar o card
          borderRadius: "10px", // Bordas suavemente arredondadas
          transition: "transform 0.3s ease-in-out", // Suave efeito de hover
          '&:hover': {
            transform: "scale(1.05)", // Aumenta levemente o tamanho no hover
          }
        }}
      >
        <CardMedia
          component="img"
          image={img}
          alt={title}
          sx={{ height: 200, objectFit: 'cover' }} 
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" align="center" sx={{ fontWeight: "bold", color: "#333" }}>
            {title}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleClickOpen}
            sx={{ mb: 1, backgroundColor: "#1976d2", textTransform: "none", fontWeight: "bold" }}
          >
            Ver Opções de Compra
          </Button>
        </CardContent>
      </Card>

      {/* Pop-up para exibir opções de compra */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Escolha uma plataforma</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Selecione a plataforma para comprar este produto:
          </DialogContentText>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {productLinks.amazon && (
              <Grid item xs={6}>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => window.open(productLinks.amazon, "_blank")}
                >
                  Amazon
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
                  Mercado Livre
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
                  Shopee
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
                  AliExpress
                </Button>
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Fechar
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
        backgroundColor: "#f4f4f9", // Cor de fundo clara
        minHeight: "100vh", // Altura mínima da página para cobrir toda a tela
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', color: '#333', marginBottom: 4 }}>
        Encontre o Melhor Produto para Você
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
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
