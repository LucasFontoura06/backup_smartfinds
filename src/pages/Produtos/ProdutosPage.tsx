import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebaseConfig"; 
import { Box, Container, Grid, Card, CardContent, CardMedia, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

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

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Card
        sx={{
          width: '100%',
          height: 300,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: "#ffffff",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
          '&:hover': {
            transform: "translateY(-5px)",
            boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
          }
        }}
      >
        <Box
          sx={{
            height: 150,
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
            backgroundColor: '#f0f0f0',
          }}
        >
          <CardMedia
            component="img"
            image={img}
            alt={title}
            sx={{ 
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }} 
          />
        </Box>
        <CardContent 
          sx={{ 
            flexGrow: 1, 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'space-between', 
            p: 2,
            pb: 1 // Reduzir o padding inferior
          }}
        >
          <Typography 
            variant="body2" 
            component="div" 
            align="center" 
            sx={{ 
              fontWeight: "bold", 
              color: "#333",
              mb: 1,
              height: '3em', // Aumentar a altura para 3 linhas
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 3, // Permitir até 3 linhas
              WebkitBoxOrient: 'vertical',
            }}
          >
            {title}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleClickOpen}
            sx={{ 
              mt: 'auto',
              backgroundColor: "#1976d2", 
              textTransform: "none", 
              fontWeight: "bold",
              py: 0.5, // Reduzir a altura do botão
              '&:hover': {
                backgroundColor: "#1565c0",
              }
            }}
          >
            Ver Opções
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
  const navigate = useNavigate();

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
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        padding: "2rem",
        position: 'relative',
      }}
    >
      <IconButton
        onClick={() => navigate('/')}
        sx={{
          position: 'absolute',
          top: 16,
          left: 16,
          color: '#333',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 1)',
          }
        }}
      >
        <ArrowBackIcon />
      </IconButton>

      <Typography 
        variant="h4" 
        align="center" 
        sx={{ 
          fontWeight: 'bold', 
          color: '#333', 
          marginBottom: 4, 
          marginTop: 4,
          textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
        }}
      >
        Encontre o Melhor Produto para Você
      </Typography>
      <Container maxWidth="lg">
        <Grid container spacing={3} justifyContent="center">
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
    </Box>
  );
};

export default ProductList;
