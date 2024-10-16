import React from 'react'
import ProductList from '../../components/Card'
import { Typography } from '@mui/material'

export default function HomePage() {
  return (
    <div>
        <Typography
          variant="h4" 
          align="center" 
          sx={{ fontWeight: 'bold', marginBottom: 6, marginTop: 4 }} 
        >
          Seja Bem Vindo a Nossa Loja!
        </Typography>
        <ProductList />
      
    </div>
  )
}
