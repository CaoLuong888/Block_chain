import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Popconfirm, message } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import ThemSanPham from './ThemSanPham';
import axios from 'axios';

const SanPham = () => {
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const matk = localStorage.getItem('matk');

  useEffect(() => { 
    fetchSanPham();
  }, []);

  const fetchSanPham = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/SanPhams?matk=${matk}`);
      if (response.data.success) {
        setData(response.data.data);
      } else {
        console.error('Failed to fetch sản phẩm:', response.data.message);
      }
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
    }
  };

  const handleDelete = async (masp) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/SanPhams/${masp}`);
      if (response.data.success) {
        message.success('Xóa sản phẩm thành công');
        setData(data.filter(item => item.masp !== masp));
      } else {
        message.error('Xóa sản phẩm thất bại');
      }
    } catch (error) {
      console.error('Lỗi khi xóa sản phẩm:', error);
    }
  };

  const columns = [
    {
      title: 'STT',
      key: 'stt',
      render: (text, record, index) => index + 1
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'tensp',
      key: 'tensp',
    },
    {
      title: 'Mô tả',
      dataIndex: 'motasp',
      key: 'motasp',
      render: (text) => (text.length > 50 ? `${text.substring(0, 50)}...` : text),
    },
    {
      title: 'Quy trình',
      dataIndex: 'maqt',
      key: 'maqt',
    },
    {
      title: 'Cở sở sản xuất',
      dataIndex: 'macoso',
      key: 'macoso',
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (text, record) => (
        <Popconfirm
          title="Bạn có chắc muốn xóa sản phẩm này?"
          onConfirm={() => handleDelete(record.masp)}
          okText="Có"
          cancelText="Không"
        >
          <Button type="primary" danger icon={<DeleteOutlined />}>
            Xóa
          </Button>
        </Popconfirm>
      ),
    },
  ];

  const handleThemMoi = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleThemSanPhamSuccess = (newSanPham) => {  
    setData([...data, newSanPham]);
    setIsModalVisible(false);
    window.location.reload();
  };

  return (
    <div style={{ padding: '0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h1>Sản phẩm</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleThemMoi}
        >
          Thêm mới sản phẩm
        </Button>
      </div>
      <Table  columns={columns} dataSource={data} rowKey="masp" pagination={{ pageSize: 7 }} />

      <Modal
        title="Thêm mới sản phẩm"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
        width={450}
      >
        <ThemSanPham onSuccess={handleThemSanPhamSuccess} matk={matk} />
      </Modal>

    </div>
  );
};

export default SanPham;
