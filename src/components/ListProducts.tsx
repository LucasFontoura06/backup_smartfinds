import { fetchProdutos } from "../lib/features/AddProducts/addProcuctSlice";
import { Box, Card, CardContent, CardHeader, Slide, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { CONSTANTES } from "../commom/constantes";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import AddProductsForm from "../pages/AddProduct/AddProductPage"; // Import do formulário para editar

const ListProducts: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, produtos, error } = useAppSelector((state: any) => state.addProducts);
  const [selectedProduct, setSelectedProduct] = useState<any>(null); // Produto selecionado para edição
  const [open, setOpen] = useState(false); // Estado para controlar a abertura do modal

  useEffect(() => {
    dispatch(fetchProdutos());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      console.error(CONSTANTES.ERROR_FIND_PRODUCTS, error);
    }
  }, [error]);

  const handleEditClick = (produto: any) => {
    setSelectedProduct(produto); // Armazena o produto selecionado
    setOpen(true); // Abre o modal
  };

  const handleClose = () => {
    setOpen(false); // Fecha o modal
  };

  const handleProductUpdated = () => {
    setOpen(false); // Fecha o modal após a edição ser concluída
  };

  // Função para renderizar as colunas somente se os links estiverem presentes
  const columns = [
    {
      field: CONSTANTES.LBL_NAME,
      headerName: CONSTANTES.LBL_NOME_PRODUTO,
      flex: 1,
      cellClassName: CONSTANTES.LBL_CLASSE_NAME,
    },
    {
      field: CONSTANTES.LBL_LINK_IMAGE,
      headerName: CONSTANTES.LBL_IMAGE_PRODUCT,
      flex: 1,
      renderCell: (params: any) => (
        params.row.linkImage ? (
          <img src={params.row.linkImage} alt={params.row.name} style={{ width: 50, height: 50 }} />
        ) : null
      ),
    },
    {
      field: CONSTANTES.LBL_LINK_ALIEXPRESS,
      headerName: CONSTANTES.LBL_NAME_ALIEXPRESS,
      flex: 1,
      renderCell: (params: any) => (
        params.row.linkAliexpress ? (
          <a href={params.row.linkAliexpress} target="_blank" rel="noopener noreferrer">
            AliExpress
          </a>
        ) : null
      ),
    },
    {
      field: CONSTANTES.LBL_LINK_AMAZON,
      headerName: CONSTANTES.LBL_NAME_AMAZON,
      flex: 1,
      renderCell: (params: any) => (
        params.row.linkAmazon ? (
          <a href={params.row.linkAmazon} target="_blank" rel="noopener noreferrer">
            Amazon
          </a>
        ) : null
      ),
    },
    {
      field: CONSTANTES.LBL_LINK_MERCADO_LIVRE,
      headerName: CONSTANTES.LBL_NAME_MERCADO_LIVRE,
      flex: 1,
      renderCell: (params: any) => (
        params.row.linkMercadoLivre ? (
          <a href={params.row.linkMercadoLivre} target="_blank" rel="noopener noreferrer">
            Mercado Livre
          </a>
        ) : null
      ),
    },
    {
      field: "edit",
      headerName: "Editar",
      flex: 1,
      renderCell: (params: any) => (
        <Button onClick={() => handleEditClick(params.row)}>Editar</Button>
      ),
    },
  ];

  return (
    <Slide direction="right" in={true} mountOnEnter unmountOnExit>
      <Box component="div" m={4} sx={{ flexGrow: 1 }}>
        <Card className="form" elevation={5}>
          <CardHeader title={CONSTANTES.LBL_TITLE_LISTA_PRODUTOS} className="text-white font-bold" />
          <CardContent>
            {!loading ? (
              <>
                <DataGrid
                  rows={produtos.map((produto: any) => ({
                    id: produto.id,
                    name: produto.name,
                    linkImage: produto.linkImage,
                    linkAliexpress: produto.linkAliexpress,
                    linkAmazon: produto.linkAmazon,
                    linkMercadoLivre: produto.linkMercadoLivre,
                  })) || []}
                  columns={columns}
                  pageSizeOptions={[10]}
                  checkboxSelection
                  disableRowSelectionOnClick
                  autoHeight
                  sx={{
                    "& .MuiDataGrid-cell": {
                      color: "#fff",
                    },
                    "& .produto-nome-cell": {
                      color: "#000",
                    },
                    "& .MuiDataGrid-row:hover": {
                      backgroundColor: "#f0f0f0",
                    },
                    "& .MuiDataGrid-checkboxInput": {
                      color: "#000",
                    },
                    "& .MuiDataGrid-selectedRowCount": {
                      color: "#fff",
                    },
                    "& .MuiTablePagination-actions": {
                      color: "#fff",
                    },
                    "& .MuiTablePagination-displayedRows": {
                      color: "#fff",
                    },
                  }}
                />
                {/* Modal para editar o produto */}
                <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                  {/* <DialogTitle>Editar Produto</DialogTitle> */}
                  <DialogContent>
                    {selectedProduct && (
                      <AddProductsForm produtoParaEditar={selectedProduct} onProductUpdated={handleProductUpdated} />
                    )}
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                      Cancelar
                    </Button>
                  </DialogActions>
                </Dialog>
              </>
            ) : null}
          </CardContent>
        </Card>
      </Box>
    </Slide>
  );
};

export default ListProducts;
