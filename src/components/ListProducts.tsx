import React, { useEffect, useState } from "react";
import { Layout, Table, Button, Modal, Spin, Card, Popconfirm } from "antd";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { fetchProdutos, updateProduto, deleteProduto } from "../lib/features/AddProducts/addProcuctSlice";
import AddProductsForm from "../pages/AddProduct/AddProductPage"; // Import do formulário para editar
import { CONSTANTES } from "../commom/constantes";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const { Content } = Layout;

const ListProducts: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, produtos, error } = useAppSelector((state: any) => state.addProducts);
  const [selectedProduct, setSelectedProduct] = useState<any>(null); 
  const [open, setOpen] = useState(false); 
  const [showLoading, setShowLoading] = useState(true); 

  useEffect(() => {
    dispatch(fetchProdutos());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      console.error(CONSTANTES.ERROR_FIND_PRODUCTS, error);
    }
  }, [error]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 1000); 
    return () => clearTimeout(timer); 
  }, [loading]);

  const handleEditClick = (produto: any) => {
    setSelectedProduct(produto); 
    setOpen(true); 
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleProductUpdated = () => {
    setOpen(false);
    dispatch(fetchProdutos()); 
  };

  const handleDeleteClick = (produtoId: string) => {
    dispatch(deleteProduto(produtoId));
  };

  const columns = [
    {
      title: CONSTANTES.LBL_NOME_PRODUTO,
      dataIndex: CONSTANTES.LBL_DATA_INDEX_NAME,
      key: CONSTANTES.KEY_NAME,
      render: (text: string) => (
        <span style={{ color: "#000" }}>{text || "Nome indisponível"}</span>
      ),
    },
    {
      title: CONSTANTES.LBL_IMAGE_PRODUCT,
      dataIndex: CONSTANTES.LBL_DATA_INDEX_LINK_IMAGE,
      key: CONSTANTES.KEY_LINK_IMAGE,
      render: (text: string, record: any) =>
        record.linkImage ? <img src={record.linkImage} alt={record.name} style={{ width: 50, height: 50 }} /> : null,
    },
    {
      title: CONSTANTES.LBL_NAME_ALIEXPRESS,
      dataIndex: CONSTANTES.LBL_DATA_INDEX_LINK_ALIEXPRESS,
      key: CONSTANTES.KEY_LINK_ALIEXPRESS,
      render: (text: string, record: any) =>
        record.linkAliexpress ? (
          <a href={record.linkAliexpress} target="_blank" rel="noopener noreferrer" style={{ color: "#1890ff" }}>
            AliExpress
          </a>
        ) : null,
    },
    {
      title: CONSTANTES.LBL_NAME_AMAZON,
      dataIndex: CONSTANTES.LBL_DATA_INDEX_LINK_AMAZON,
      key: CONSTANTES.KEY_LINK_AMAZON,
      render: (text: string, record: any) =>
        record.linkAmazon ? (
          <a href={record.linkAmazon} target="_blank" rel="noopener noreferrer" style={{ color: "#1890ff" }}>
            Amazon
          </a>
        ) : null,
    },
    {
      title: CONSTANTES.LBL_NAME_MERCADO_LIVRE,
      dataIndex: CONSTANTES.LBL_DATA_INDEX_LINK_MERCADO_LIVRE,
      key: CONSTANTES.KEY_LINK_MERCADO_LIVRE,
      render: (text: string, record: any) =>
        record.linkMercadoLivre ? (
          <a href={record.linkMercadoLivre} target="_blank" rel="noopener noreferrer" style={{ color: "#1890ff" }}>
            Mercado Livre
          </a>
        ) : null,
    },
    {
      title: CONSTANTES.LBL_ACTIONS,
      key: CONSTANTES.KEY_ACTIONS,
      render: (text: string, record: any) => (
        <>
          <Button
            onClick={() => handleEditClick(record)}
            type="primary"
            icon={<EditOutlined />}
            style={{ marginRight: 8 }}
          >
            {CONSTANTES.LBL_EDITAR}
          </Button>
          <Popconfirm
            title={CONSTANTES.LBL_CONFIRMACAO_DELETAR}
            onConfirm={() => handleDeleteClick(record.key)}
            okText={CONSTANTES.LBL_SIM}
            cancelText={CONSTANTES.LBL_NAO}
          >
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
            >
              {CONSTANTES.LBL_DELETAR}
            </Button>
          </Popconfirm>
        </>
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
                name: produto.name || CONSTANTES.LBL_NOME_PRODUTO_INDISPONIVEL,
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
              <Spin tip={CONSTANTES.LBL_CARREGANDO_PRODUTOS} />
            </div>
          )}

          {/* Modal para edição do produto */}
          <Modal
            title={CONSTANTES.LBL_EDITAR_PRODUTO}
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
