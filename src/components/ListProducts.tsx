import React, { useEffect, useState } from "react";
import { Layout, Table, Button, Modal, Spin, Card } from "antd";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { fetchProdutos, updateProduto } from "../lib/features/AddProducts/addProcuctSlice";
import AddProductsForm from "../pages/AddProduct/AddProductPage"; // Import do formulário para editar
import { CONSTANTES } from "../commom/constantes";

const { Content } = Layout;

const ListProducts: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, produtos, error } = useAppSelector((state: any) => state.addProducts);
  const [selectedProduct, setSelectedProduct] = useState<any>(null); // Produto selecionado para edição
  const [open, setOpen] = useState(false); // Estado para controlar a abertura do modal
  const [showLoading, setShowLoading] = useState(true); // Controla a exibição do loading

  useEffect(() => {
    dispatch(fetchProdutos());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      console.error(CONSTANTES.ERROR_FIND_PRODUCTS, error);
    }
  }, [error]);

  // Simula o loading por mais tempo (ex. 2 segundos)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 1000); // 2 segundos de delay
    return () => clearTimeout(timer); // Limpa o timeout quando o componente desmontar
  }, [loading]);

  const handleEditClick = (produto: any) => {
    setSelectedProduct(produto); // Armazena o produto selecionado
    setOpen(true); // Abre o modal
  };

  const handleClose = () => {
    setOpen(false); // Fecha o modal
  };

  const handleProductUpdated = () => {
    setOpen(false); // Fecha o modal após a edição ser concluída
    dispatch(fetchProdutos()); // Atualiza a lista após a edição
  };

  // Definindo as colunas para a tabela
  const columns = [
    {
      title: CONSTANTES.LBL_NOME_PRODUTO,
      dataIndex: "name",
      key: "name",
      render: (text: string) => (
        <span style={{ color: "#000" }}>{text || "Nome indisponível"}</span>
      ),
    },
    {
      title: CONSTANTES.LBL_IMAGE_PRODUCT,
      dataIndex: "linkImage",
      key: "linkImage",
      render: (text: string, record: any) =>
        record.linkImage ? <img src={record.linkImage} alt={record.name} style={{ width: 50, height: 50 }} /> : null,
    },
    {
      title: CONSTANTES.LBL_NAME_ALIEXPRESS,
      dataIndex: "linkAliexpress",
      key: "linkAliexpress",
      render: (text: string, record: any) =>
        record.linkAliexpress ? (
          <a href={record.linkAliexpress} target="_blank" rel="noopener noreferrer" style={{ color: "#1890ff" }}>
            AliExpress
          </a>
        ) : null,
    },
    {
      title: CONSTANTES.LBL_NAME_AMAZON,
      dataIndex: "linkAmazon",
      key: "linkAmazon",
      render: (text: string, record: any) =>
        record.linkAmazon ? (
          <a href={record.linkAmazon} target="_blank" rel="noopener noreferrer" style={{ color: "#1890ff" }}>
            Amazon
          </a>
        ) : null,
    },
    {
      title: CONSTANTES.LBL_NAME_MERCADO_LIVRE,
      dataIndex: "linkMercadoLivre",
      key: "linkMercadoLivre",
      render: (text: string, record: any) =>
        record.linkMercadoLivre ? (
          <a href={record.linkMercadoLivre} target="_blank" rel="noopener noreferrer" style={{ color: "#1890ff" }}>
            Mercado Livre
          </a>
        ) : null,
    },
    {
      title: "Editar",
      key: "edit",
      render: (text: string, record: any) => (
        <Button onClick={() => handleEditClick(record)} type="primary">
          Editar
        </Button>
      ),
    },
  ];

  return (
    <Layout style={{ backgroundColor: "#001529", padding: "0" }}>
      <Content style={{ padding: "0", margin: "0", backgroundColor: "transparent" }}>
        <Card
          title={<span className="custom-card-title">{CONSTANTES.LBL_TITLE_LISTA_PRODUTOS}</span>}
          style={{ backgroundColor: "#001529", color: "#f0f0f0", border: "none", padding: "0" }}
          styles={{ header: { backgroundColor: "#001529", color: "#f0f0f0" }, body: { padding: "0" } }}
        >
          {!showLoading ? (
            <Table
              columns={columns}
              dataSource={produtos.map((produto: any) => ({
                key: produto.id,
                name: produto.name || "Nome não disponível",
                linkImage: produto.linkImage,
                linkAliexpress: produto.linkAliexpress,
                linkAmazon: produto.linkAmazon,
                linkMercadoLivre: produto.linkMercadoLivre,
              }))}
              pagination={{ pageSize: 10 }}
              rowClassName={() => 'custom-row'}
              style={{ backgroundColor: "#001529", color: "#000", padding: "0" }}
            />
          ) : (
            <div className="loading-container">
              <Spin tip="Carregando produtos..." />
            </div>
          )}

          {/* Modal para edição do produto */}
          <Modal
            title="Editar Produto"
            open={open}
            onCancel={handleClose}
            footer={null}
            styles={{ body: { backgroundColor: "#001529", color: "#f0f0f0" } }}
          >
            {selectedProduct && (
              <AddProductsForm produtoParaEditar={selectedProduct} onProductUpdated={handleProductUpdated} />
            )}
          </Modal>
        </Card>
      </Content>

      <style>{`
        .custom-row {
          border-bottom: 1px solid #ddd;
        }
        .custom-card-title {
          background-color: #001529 !important;
          color: #f0f0f0 !important;
        }
        .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
      `}</style>
    </Layout>
  );
};

export default ListProducts;
