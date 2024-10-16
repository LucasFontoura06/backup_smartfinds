import React, { useEffect } from "react";
import { Box, Card, CardContent, CardHeader, Slide } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../lib/hooks"; // Custom hook para usar Redux
import { fetchProdutos } from "../lib/features/AddProducts/addProcuctSlice"; // Ação para buscar produtos
import { DataGrid } from "@mui/x-data-grid"; // Grid para exibir os dados
import { CONSTANTES } from "../commom/constantes"; // Certifique-se de que o caminho está correto

const ListProducts: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, produtos, error } = useAppSelector((state: any) => state.addProducts);

  useEffect(() => {
    dispatch(fetchProdutos()); // Busca produtos ao montar o componente
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  }, [error]);

  // Verificar se os produtos estão sendo retornados corretamente
  useEffect(() => {
    if (produtos) {
      console.log("Produtos carregados:", produtos);
    }
  }, [produtos]);

  const columns = [
    {
      field: CONSTANTES.LBL_NAME, // Usando constante para o nome do campo
      headerName: CONSTANTES.LBL_NOME_PRODUTO, // Usando constante para o título da coluna
      flex: 1,
      cellClassName: 'produto-nome-cell', // Adicionando uma classe para estilização
    },
    {
      field: CONSTANTES.LBL_LINK_IMAGE, // Usando constante para o campo da imagem
      headerName: "Imagem do Produto", // Título da coluna
      flex: 1,
      renderCell: (params: any) => (
        <img src={params.row.linkImage} alt={params.row.name} style={{ width: 50, height: 50 }} />
      ),
    },
    {
      field: CONSTANTES.LBL_LINK_ALIEXPRESS,
      headerName: "Link AliExpress",
      flex: 1,
      renderCell: (params: any) => (
        <a href={params.row.linkAliexpress} target="_blank" rel="noopener noreferrer">
          AliExpress
        </a>
      ),
    },
    {
      field: "linkAmazon",
      headerName: "Link Amazon",
      flex: 1,
      renderCell: (params: any) => (
        <a href={params.row.linkAmazon} target="_blank" rel="noopener noreferrer">
          Amazon
        </a>
      ),
    },
    {
      field: "linkMercadoLivre",
      headerName: "Link Mercado Livre",
      flex: 1,
      renderCell: (params: any) => (
        <a href={params.row.linkMercadoLivre} target="_blank" rel="noopener noreferrer">
          Mercado Livre
        </a>
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
              <DataGrid
                rows={produtos.map((produto: any) => ({
                  id: produto.id, // Usando id corretamente
                  name: produto.name, // Certificando de que o campo 'name' está presente
                  linkImage: produto.linkImage,
                  linkAliexpress: produto.linkAliexpress,
                  linkAmazon: produto.linkAmazon,
                  linkMercadoLivre: produto.linkMercadoLivre,
                })) || []}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 10,
                    },
                  },
                }}
                pageSizeOptions={[10]}
                checkboxSelection
                disableRowSelectionOnClick
                autoHeight
                sx={{
                  "& .MuiDataGrid-cell": {
                    color: "#fff",
                  },
                  "& .produto-nome-cell": {
                    color: "#000", // Estiliza o nome do produto com cor preta
                  },
                  "& .MuiDataGrid-row:hover": {
                    backgroundColor: "#f0f0f0", // Cor de hover ao passar o mouse
                  },
                  "& .MuiDataGrid-checkboxInput": {
                    color: "#000", // Cor preta para o checkbox no canto esquerdo
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
            ) : null}
          </CardContent>
        </Card>
      </Box>
    </Slide>
  );
};

export default ListProducts;
