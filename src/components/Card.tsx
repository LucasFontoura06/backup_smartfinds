// import React, { useEffect, useState } from "react";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../firebaseConfig"; // Certifique-se de que o caminho está correto
// import {
//   Card as MUICard,
//   CardContent,
//   CardMedia,
//   Typography,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   Grid,
// } from "@mui/material";

// const Card = ({ img, title, newPrice, productLinks }) => {
//   const [open, setOpen] = useState(false);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <>
//       <MUICard sx={{ maxWidth: 345, m: 2, boxShadow: 3 }}>
//         <CardMedia
//           component="img"
//           image={img}
//           alt={title}
//           sx={{ width: "100%", height: "auto", objectFit: "contain", padding: 2 }}
//         />
//         <CardContent>
//           <Typography gutterBottom variant="h5" component="div">
//             {title}
//           </Typography>
//           <Typography variant="h6" color="textPrimary" sx={{ mt: 1 }}>
//             {newPrice}
//           </Typography>
//           <Button
//             variant="contained"
//             color="primary"
//             fullWidth
//             sx={{ mt: 2 }}
//             onClick={handleClickOpen}
//           >
//             Ver Opções de Compra
//           </Button>
//         </CardContent>
//       </MUICard>

//       {/* Pop-up de seleção de plataformas */}
//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>Escolha uma plataforma</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Selecione a plataforma para comprar este produto:
//           </DialogContentText>
//           <Grid container spacing={2} sx={{ mt: 2 }}>
//             {productLinks.amazon && (
//               <Grid item xs={6}>
//                 <Button
//                   variant="outlined"
//                   fullWidth
//                   onClick={() => window.open(productLinks.amazon, "_blank")}
//                 >
//                   Amazon
//                 </Button>
//               </Grid>
//             )}
//             {productLinks.mercadoLivre && (
//               <Grid item xs={6}>
//                 <Button
//                   variant="outlined"
//                   fullWidth
//                   onClick={() => window.open(productLinks.mercadoLivre, "_blank")}
//                 >
//                   Mercado Livre
//                 </Button>
//               </Grid>
//             )}
//             {productLinks.shopee && (
//               <Grid item xs={6}>
//                 <Button
//                   variant="outlined"
//                   fullWidth
//                   onClick={() => window.open(productLinks.shopee, "_blank")}
//                 >
//                   Shopee
//                 </Button>
//               </Grid>
//             )}
//             {productLinks.aliexpress && (
//               <Grid item xs={6}>
//                 <Button
//                   variant="outlined"
//                   fullWidth
//                   onClick={() => window.open(productLinks.aliexpress, "_blank")}
//                 >
//                   AliExpress
//                 </Button>
//               </Grid>
//             )}
//           </Grid>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="secondary">
//             Fechar
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// const ProductList = () => {
//   const [products, setProducts] = useState([]);

//   // Função para buscar produtos do Firestore
//   const fetchProducts = async () => {
//     const productsCollection = collection(db, "products"); // Certifique-se de que a coleção no Firestore se chama 'products'
//     const productsSnapshot = await getDocs(productsCollection);
//     const productList = productsSnapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));
//     setProducts(productList);
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   return (
//     <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
//       {products.map((product) => (
//         <Card
//           key={product.id}
//           img={product.imageUrl}
//           title={product.productName}
//           newPrice={product.newPrice}
//           productLinks={{
//             amazon: product.amazonLink,
//             mercadoLivre: product.mercadoLivreLink,
//             shopee: product.shopeeLink,
//             aliexpress: product.aliexpressLink,
//           }}
//         />
//       ))}
//     </div>
//   );
// };

// export default ProductList;

import React from 'react'

export default function Card() {
  return (
    <div>
      
    </div>
  )
}
