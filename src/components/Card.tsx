import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Certifique-se de que este arquivo é o seu arquivo de configuração do Firebase
import {
  Card as MUICard,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from "@mui/material";
import '../styles/Card.module.css'; // Importe o arquivo de CSS para aplicar os estilos

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

// Componente do Card
const Card = ({ img, title, productLinks }: { img: string; title: string; productLinks: ProductLinks }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <MUICard className="category-card"> {/* Altere a classe para igualar o estilo */}
        <CardMedia
          component="img"
          image={img}
          alt={title}
          className="category-card-media" // Mesmo estilo usado para as categorias
          sx={{ height: 150, objectFit: 'contain' }} // Definindo altura máxima para a imagem
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" align="center">
            {title}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            className="category-card-button" // Mesmo estilo para os botões
            onClick={handleClickOpen}
          >
            Ver Opções de Compra
          </Button>
        </CardContent>
      </MUICard>

      {/* Pop-up de seleção de plataformas */}
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
      console.log("Dados de produtos:", productsData);
      setProducts(productsData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="product-list-container">
      <Grid container spacing={3} justifyContent="center">
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>
            <Card
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
    </div>
  );
};

export default ProductList;
