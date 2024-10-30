import { Box, Container, Grid, Card, Typography, Button } from '@mui/material';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
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
    {
        name: 'Shopee',
        logo: ShopeeLogo,
        affiliateLink: 'https://shopee.com.br/affiliate',
        officialLink: 'https://shopee.com.br',
    },

];

const CategoriesPage = () => {
    return (
        <Box sx={{ 
            backgroundColor: '#f0f2f5',
            minHeight: '100vh',
            py: 4
        }}>
            <Container sx={{ px: '0px !important' }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 4
                }}>
                    <StorefrontOutlinedIcon sx={{ color: '#6366f2', mr: 1 }} />
                    <Typography
                        variant="h6"
                        sx={{
                            color: '#37352f',
                            fontWeight: 600,
                            fontSize: '1.1rem'
                        }}
                    >
                        Lojas Parceiras
                    </Typography>
                </Box>

                <Grid container spacing={3}>
                    {categories.map((category, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Card sx={{ 
                                backgroundColor: '#FFFFFF',
                                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
                                p: 2,
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                transition: 'all 0.3s ease-in-out',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                                    cursor: 'pointer'
                                }
                            }}>
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    mb: 3
                                }}>
                                    <img 
                                        src={category.logo} 
                                        alt={`${category.name} logo`} 
                                        style={{ 
                                            width: 40, 
                                            height: 40, 
                                            marginRight: 12,
                                            objectFit: 'contain'
                                        }} 
                                    />
                                    <Typography sx={{ 
                                        color: '#37352f', 
                                        fontWeight: 500,
                                        fontSize: '1rem'
                                    }}>
                                        {category.name}
                                    </Typography>
                                </Box>
                                
                                <Box sx={{ mt: 'auto' }}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        sx={{
                                            backgroundColor: '#6366f2',
                                            mb: 1,
                                            '&:hover': {
                                                backgroundColor: '#5457e5'
                                            }
                                        }}
                                        href={category.affiliateLink}
                                        target="_blank"
                                    >
                                        Programa de Afiliados
                                    </Button>
                                    <Button
                                        fullWidth
                                        variant="text"
                                        sx={{
                                            color: '#6366f2',
                                            '&:hover': {
                                                backgroundColor: 'rgba(99, 102, 242, 0.04)'
                                            }
                                        }}
                                        href={category.officialLink}
                                        target="_blank"
                                    >
                                        Site Oficial
                                    </Button>
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default CategoriesPage;
