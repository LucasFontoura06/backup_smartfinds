import { Box, Container, Grid, Card, CardContent, Typography, Button } from '@mui/material';
import AmazonLogo from '../../assets/amazon_logo.png'; // Exemplo de importação do logo
import AliexpressLogo from '../../assets/amazon_logo.png'; // Exemplo de importação do logo
import MercadoLivreLogo from '../../assets/amazon_logo.png'; // Exemplo de importação do logo
import ShopeeLogo from '../../assets/amazon_logo.png'; // Exemplo de importação do logo

const categories = [
  {
    name: 'Amazon',
    logo: AmazonLogo,
    affiliateLink: 'https://www.amazon.com.br/affiliate',
    officialLink: 'https://www.amazon.com.br',
  },
  {
    name: 'Aliexpress',
    logo: AliexpressLogo,
    affiliateLink: 'https://www.aliexpress.com/affiliate',
    officialLink: 'https://www.aliexpress.com',
  },
  {
    name: 'Mercado Livre',
    logo: MercadoLivreLogo,
    affiliateLink: 'https://www.mercadolivre.com.br/affiliate',
    officialLink: 'https://www.mercadolivre.com.br',
  },
  {
    name: 'Shopee',
    logo: ShopeeLogo,
    affiliateLink: 'https://shopee.com.br/affiliate',
    officialLink: 'https://shopee.com.br',
  },
  
];

const CategoriesPage = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom align="center">
        Categorias de Lojas
      </Typography>
      <Grid container spacing={3}>
        {categories.map((category, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <img src={category.logo} alt={`${category.name} logo`} width={40} height={40} style={{ marginRight: 10 }} />
                  <Typography variant="h6">{category.name}</Typography>
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  href={category.affiliateLink}
                  target="_blank"
                  fullWidth
                  sx={{ mb: 1 }}
                >
                  Página de Afiliado
                </Button>
                <Button
                  variant="contained" // Mesma variante para uniformizar o estilo dos botões
                  color="primary"
                  href={category.officialLink}
                  target="_blank"
                  fullWidth
                >
                  Página Oficial
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CategoriesPage;
