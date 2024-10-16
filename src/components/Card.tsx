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
      <MUICard sx={{ maxWidth: 345, m: 2, boxShadow: 3 }}>
        <CardMedia
          component="img"
          image={img}
          alt={title}
          sx={{
            width: "100%",
            height: 200, // Definindo uma altura fixa
            objectFit: "contain", // Garante que a imagem inteira seja visível sem corte
            objectPosition: "center", // Centraliza a imagem dentro do container
            padding: 2
          }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
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
  const [products, setProducts] = useState<Product[]>([]); // Definindo o estado com o tipo Product[]

  useEffect(() => {
    // Usando onSnapshot para ouvir as mudanças em tempo real
    const unsubscribe = onSnapshot(collection(db, "produtos"), (snapshot) => {
      const productsData: Product[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[]; // Fazendo o casting para o tipo Product[]
      console.log("Dados de produtos:", productsData); // Adicionando log para verificar os dados
      setProducts(productsData); // Atualiza a lista de produtos
    });

    // Cleanup listener ao desmontar o componente
    return () => unsubscribe();
  }, []);

  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {products.map((product) => (
        <Card
          key={product.id}
          img={product.linkImage} // Certifique-se de que este é o nome correto do campo da imagem no Firestore
          title={product.name}
          productLinks={{
            amazon: product.linkAmazon,
            mercadoLivre: product.linkMercadoLivre,
            shopee: product.linkShopee,
            aliexpress: product.linkAliexpress,
          }}
        />
      ))}
    </div>
  );
};

export default ProductList;
