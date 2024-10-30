import React, { useEffect, useState } from "react";
import { Layout, Table, Button, Modal, Spin, Card, Popconfirm } from "antd";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { fetchProdutos, updateProduto, deleteProduto, setValues, resetForm } from "../lib/features/AddProducts/addProcuctSlice";
import AddProductsForm from "../pages/AddProduct/AddProductPage"; // Import do formulário para editar
import { CONSTANTES } from "../commom/constantes";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import "../styles/ProductsList.css";

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
    // Limpa o formulário antes de carregar os novos valores
    dispatch(resetForm());
    
    // Prepara os valores do produto garantindo que todos os campos existam
    const valoresCompletos = {
      id: produto.key, // Usando key como id conforme seu código original
      name: produto.name || '',
      linkImage: produto.linkImage || '',
      linkAliexpress: produto.linkAliexpress || '',
      linkAmazon: produto.linkAmazon || '',
      linkMercadoLivre: produto.linkMercadoLivre || '',
      categoria: produto.categoria || '',
      ativo: produto.ativo || false,
    };

    // Carrega os valores no formulário
    dispatch(setValues(valoresCompletos));
    
    // Guarda o produto selecionado
    setSelectedProduct(valoresCompletos);
    
    // Abre o modal
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
    dispatch(resetForm());
  };

  const handleProductUpdated = () => {
    handleClose();
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
    <Layout style={{ backgroundColor: "#ffffff", padding: "0" }}>
      <Content style={{ padding: "20px", margin: "0", backgroundColor: "transparent" }}>
        <Card
          title={<span style={{ color: '#37352f', fontSize: '18px', fontWeight: 600 }}>{CONSTANTES.LBL_TITLE_LISTA_PRODUTOS}</span>}
          style={{ 
            backgroundColor: "#ffffff", 
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
            margin: '0 24px', // Adicionado margem horizontal
            borderRadius: '8px'
          }}
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
                categoria: produto.categoria, // Adicionar esta linha
              }))}
              pagination={{ 
                pageSize: 10,
                showSizeChanger: false,
                showQuickJumper: true,
                showTotal: (total, range) => `${range[0]}-${range[1]} de ${total} itens`,
              }}
              style={{ 
                backgroundColor: "#ffffff",
                color: '#37352f',
              }}
              bordered
            />
          ) : (
            <div className="loading-container">
              <Spin tip={CONSTANTES.LBL_CARREGANDO_PRODUTOS} />
            </div>
          )}

          {/* Modal para edição do produto */}
          <Modal  
            open={open}
            onCancel={handleClose}
            footer={null}
            width={800} // Adicionando largura personalizada
            styles={{ 
              body: { backgroundColor: "#ffffff", color: '#37352f' },
              mask: { backgroundColor: 'rgba(0, 0, 0, 0.6)' }, // Opcional: escurece mais o fundo
            }}
          >
            {selectedProduct && (
              <AddProductsForm produtoParaEditar={selectedProduct} onProductUpdated={handleProductUpdated} />
            )}
          </Modal>
        </Card>
      </Content>

      <style>{`
        .ant-table {
          border-radius: 8px;
          overflow: hidden;
        }
        .ant-table-thead > tr > th {
          background-color: #f8f9fa !important;
          color: #37352f !important;
          font-weight: 600 !important;
          border-bottom: 1px solid #e8e8e8 !important;
          padding: 16px !important;
          font-size: 14px;
        }
        .ant-table-thead > tr > th:hover {
          background-color: #f8f9fa !important;
        }
        .ant-table-tbody > tr > td {
          border-bottom: 1px solid #f0f0f0;
          padding: 16px !important;
          font-size: 14px;
          color: #424242;
        }
        .ant-table-tbody > tr:hover > td {
          background-color: #ffffff !important;
        }
        .ant-table-cell {
          border-right: 1px solid #f0f0f0 !important;
        }
        .ant-table-cell:last-child {
          border-right: none !important;
        }
        .ant-table-bordered {
          border: 1px solid #f0f0f0 !important;
        }
        .ant-pagination {
          margin-top: 16px !important;
          margin-bottom: 16px !important;
        }
        .ant-pagination-item-active {
          border-color: #6366f2 !important;
          color: #6366f2 !important;
        }
        .ant-pagination-item-active a {
          color: #6366f2 !important;
        }
        .ant-btn {
          border-radius: 6px;
          font-weight: 500;
        }
        .ant-btn-primary {
          background-color: #6366f2;
          border-color: #6366f2;
        }
        .ant-btn-primary:hover {
          background-color: #5457e5;
          border-color: #5457e5;
        }
        .ant-btn-dangerous {
          background-color: #ff4d4f;
          border-color: #ff4d4f;
        }
        .ant-btn-dangerous:hover {
          background-color: #ff7875;
          border-color: #ff7875;
        }
      `}</style>
    </Layout>
  );
};

export default ListProducts;
