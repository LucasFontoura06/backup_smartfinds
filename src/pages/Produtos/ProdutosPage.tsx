import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebaseConfig"; 
import { Box, Container, Grid, Card, CardContent, CardMedia, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

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
  categoria?: string;
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
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)", // Sombra mais pronunciada
          borderRadius: "12px", // Bordas mais arredondadas
          transition: "all 0.3s ease-in-out",
          '&:hover': {
            transform: "translateY(-8px) scale(1.02)", // Efeito de elevação e escala
            boxShadow: "0 12px 20px rgba(0, 0, 0, 0.2)",
            cursor: "pointer",
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
            borderTopLeftRadius: "12px",
            borderTopRightRadius: "12px",
            backgroundColor: '#f8f8f8', // Fundo um pouco mais claro
            padding: '8px', // Padding para a imagem não tocar as bordas
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
            pb: 1,
            backgroundColor: 'white',
            borderBottomLeftRadius: "12px",
            borderBottomRightRadius: "12px",
          }}
        >
          <Typography 
            variant="body2" 
            component="div" 
            align="center" 
            sx={{ 
              fontWeight: "600", // Texto um pouco mais bold
              color: "#1a1a1a", // Cor mais escura para melhor contraste
              mb: 1,
              height: '3em',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              fontSize: '0.95rem', // Texto um pouco maior
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
              backgroundColor: "#2196f3", // Azul mais vibrante
              textTransform: "none", 
              fontWeight: "bold",
              py: 1, // Botão um pouco mais alto
              borderRadius: '8px', // Bordas mais arredondadas
              '&:hover': {
                backgroundColor: "#1976d2",
                transform: "scale(1.02)", // Pequeno efeito de escala no hover
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

// Adicione este componente para o banner
const HeaderBanner = () => (
  <Box
    sx={{
      position: 'relative',
      width: '100%',
      backgroundColor: '#000',
      backgroundImage: 'linear-gradient(to right, #000000, #1a1a1a)',
      padding: '3rem 1rem',
      marginBottom: '2rem',
      overflow: 'hidden',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(45deg, #FFD700 0%, #FFA500 100%)',
        opacity: 0.1,
        zIndex: 1
      }
    }}
  >
    <Container maxWidth="lg">
      <Typography 
        variant="h4" 
        align="center" 
        sx={{ 
          fontWeight: 'bold', 
          color: '#fff',
          position: 'relative',
          zIndex: 2,
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          '& span': {
            color: '#FFD700',
          }
        }}
      >
        Encontre o <span>Melhor Produto</span> para Você
      </Typography>
    </Container>
  </Box>
);

// Função para buscar produtos em tempo real
const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();
  
  // Novos estados para filtros
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  // Categorias disponíveis
  const categorias = [
    "Eletrônicos",
    "Computadores e Acessórios",
    "Casa e Cozinha",
    "Roupas, Calçados e Joias",
    "Beleza e Cuidados Pessoais",
    "Saúde, Higiene e Bebê",
    "Esportes e Atividades ao Ar Livre",
    "Brinquedos e Jogos",
    "Automotivo",
    "Livros",
    "Ferramentas e Melhorias Domésticas",
    "Alimentos e Bebidas",
    "Móveis",
    "Eletrodomésticos",
    "Pet Shop",
    "Artigos de Papelaria e Escritório",
    "Relógios",
    "Instrumentos Musicais",
    "Jardinagem e Ar Livre",
    "Artes, Artesanato e Costura",
    "Filmes e TV",
    "Video Games",
    "Software",
    "Bagagem e Acessórios de Viagem",
    "Industriais e Científicos",
    "Bebidas e Suplementos Nutricionais",
    "Câmeras e Fotografia",
    "Produtos para Escritório",
    "Sapatos e Bolsas",
    "Áudio e Som para Automóveis"
  ];

  // Efeito para buscar produtos
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "produtos"), (snapshot) => {
      const productsData: Product[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];
      setProducts(productsData);
      setFilteredProducts(productsData); // Inicializa produtos filtrados
    });

    return () => unsubscribe();
  }, []);

  // Efeito para filtrar produtos
  useEffect(() => {
    const filtered = products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || product.categoria === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, products]);

  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        position: 'relative',
      }}
    >
      <IconButton
        onClick={() => navigate('/')}
        sx={{
          position: 'absolute',
          top: 16,
          left: 16,
          color: '#fff',
          zIndex: 10,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
          }
        }}
      >
        <ArrowBackIcon />
      </IconButton>

      {/* Substitua o Typography anterior pelo novo componente HeaderBanner */}
      <HeaderBanner />

      {/* Seção de Filtros */}
      <Container maxWidth="lg" sx={{ mb: 4 }}>
        <Box sx={{ 
          display: 'flex', 
          gap: 2, 
          backgroundColor: 'white', 
          padding: 2, 
          borderRadius: 2,
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Buscar produtos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon sx={{ color: 'gray', mr: 1 }} />,
            }}
            sx={{ flex: 2 }}
          />
          <FormControl sx={{ flex: 1 }}>
            <InputLabel>Categoria</InputLabel>
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              label="Categoria"
            >
              <MenuItem value="">Todas as categorias</MenuItem>
              {categorias.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Container>

      <Container 
        maxWidth="lg" 
        sx={{ 
          pb: 8, // Adiciona padding bottom de 64px (8 * 8px)
          mb: 4  // Adiciona margin bottom de 32px (4 * 8px)
        }}
      >
        {filteredProducts.length > 0 ? (
          <Grid container spacing={3} justifyContent="center">
            {filteredProducts.map((product) => (
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
        ) : (
          <Box sx={{ 
            textAlign: 'center', 
            py: 8, 
            backgroundColor: 'white', 
            borderRadius: 2,
            mt: 4 
          }}>
            <Typography variant="h6" color="text.secondary">
              Nenhum produto encontrado
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Tente ajustar seus filtros de busca
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default ProductList;
