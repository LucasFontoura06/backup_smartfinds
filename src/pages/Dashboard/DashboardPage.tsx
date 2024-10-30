// src/pages/DashboardPage.tsx

import React, { useEffect, useState } from "react";
import { Box, Grid, Paper, Typography, Container, useTheme, Card, CardContent, Divider } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import CategoryIcon from '@mui/icons-material/Category';
import InventoryIcon from '@mui/icons-material/Inventory';
import { BarChart } from '@mui/x-charts/BarChart';

interface CategoryCount {
  name: string;
  count: number;
}

const DashboardPage: React.FC = () => {
  const [categoryStats, setCategoryStats] = useState<CategoryCount[]>([]);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const theme = useTheme();

  // Definindo cores personalizadas
  const customColors = {
    primary: '#6366F1', // Indigo moderno
    secondary: '#f0f2f5', // Fundo claro
    text: '#64748B', // Texto suave
    highlight: '#818CF8' // Destaque suave
  };

  useEffect(() => {
    const fetchProductStats = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "produtos"));
        const products = querySnapshot.docs.map(doc => doc.data());
        
        setTotalProducts(products.length);

        const categoryCount: { [key: string]: number } = {};
        products.forEach(product => {
          const category = product.categoria || "Sem Categoria";
          categoryCount[category] = (categoryCount[category] || 0) + 1;
        });

        const sortedCategories = Object.entries(categoryCount)
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count);

        setCategoryStats(sortedCategories);
      } catch (error) {
        console.error("Erro ao buscar estatísticas:", error);
      }
    };

    fetchProductStats();
  }, []);

  return (
    <Container maxWidth="xl" sx={{ px: '0px !important' }}>
      <Box sx={{ 
        py: 4,
        backgroundColor: customColors.secondary,
        minHeight: '100vh'
      }}>
        <Grid container spacing={3}>
          {/* Primeira linha: Total de Produtos e Gráfico */}
          <Grid item xs={12} md={4}>
            {/* Card do Total de Produtos */}
            <Card sx={{ 
              borderRadius: '16px',
              border: 'none',
              boxShadow: 'rgba(0, 0, 0, 0.04) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px',
              backgroundColor: 'white',
              height: '100%',
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-4px)',
              }
            }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <InventoryIcon 
                    sx={{ 
                      color: customColors.primary,
                      mr: 2,
                      fontSize: 24
                    }} 
                  />
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: customColors.text,
                      fontWeight: 600,
                      fontSize: '1.1rem'
                    }}
                  >
                    Total de Produtos
                  </Typography>
                </Box>
                <Typography 
                  variant="h3" 
                  sx={{ 
                    mt: 2,
                    fontWeight: 600,
                    color: customColors.primary,
                    fontSize: '2.5rem'
                  }}
                >
                  {totalProducts}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: customColors.text,
                    mt: 1
                  }}
                >
                  {totalProducts === 1 ? 'produto cadastrado' : 'produtos cadastrados'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            {/* Card do Gráfico */}
            <Card sx={{ 
              borderRadius: '16px',
              border: 'none',
              boxShadow: 'rgba(0, 0, 0, 0.04) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px',
              backgroundColor: 'white',
              height: '100%'
            }}>
              <CardContent sx={{ p: 3 }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 3, 
                    color: customColors.text,
                    fontWeight: 600,
                    fontSize: '1.1rem'
                  }}
                >
                  Distribuição de Produtos por Categoria
                </Typography>
                <Box sx={{ width: '100%', height: 300 }}>
                  <BarChart
                    series={[
                      {
                        data: categoryStats.map(cat => cat.count),
                        color: customColors.primary,
                      },
                    ]}
                    xAxis={[{
                      data: categoryStats.map(cat => cat.name),
                      scaleType: 'band',
                    }]}
                    margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Segunda linha: Cards de Categorias */}
          <Grid item xs={12}>
            <Card sx={{ 
              borderRadius: '16px',
              border: 'none',
              boxShadow: 'rgba(0, 0, 0, 0.04) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px',
              backgroundColor: 'white'
            }}>
              <CardContent sx={{ p: 3 }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 3, 
                    color: customColors.text,
                    fontWeight: 600,
                    fontSize: '1.1rem'
                  }}
                >
                  Produtos por Categoria
                </Typography>
                <Grid container spacing={3}>
                  {categoryStats.map((category) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={category.name}>
                      <Card 
                        sx={{ 
                          height: '100%',
                          borderRadius: '12px',
                          border: 'none',
                          boxShadow: 'rgba(0, 0, 0, 0.04) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px',
                          transition: 'transform 0.2s ease-in-out',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            backgroundColor: customColors.secondary,
                          }
                        }}
                      >
                        <CardContent sx={{ p: 2.5 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <CategoryIcon 
                              sx={{ 
                                color: customColors.primary,
                                mr: 1.5,
                                fontSize: 20
                              }} 
                            />
                            <Typography 
                              variant="subtitle2" 
                              sx={{ 
                                color: customColors.text,
                                fontWeight: 600
                              }}
                            >
                              {category.name}
                            </Typography>
                          </Box>
                          <Typography 
                            variant="h4" 
                            sx={{ 
                              mt: 2,
                              fontWeight: 600,
                              color: customColors.primary,
                              fontSize: '2rem'
                            }}
                          >
                            {category.count}
                          </Typography>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              color: customColors.text,
                              mt: 0.5
                            }}
                          >
                            {category.count === 1 ? 'produto' : 'produtos'}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>

                {totalProducts === 0 && (
                  <Card 
                    sx={{ 
                      mt: 4,
                      p: 4,
                      textAlign: 'center',
                      backgroundColor: customColors.secondary,
                      borderRadius: '12px',
                      border: 'none'
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ color: customColors.text }}>
                      Nenhum produto cadastrado ainda
                    </Typography>
                    <Typography variant="body2" sx={{ color: customColors.text, mt: 1 }}>
                      Comece adicionando produtos ao seu catálogo
                    </Typography>
                  </Card>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default DashboardPage;
