import React, { useState } from 'react';
import { Menu } from 'antd';
import { HomeOutlined, FileSearchOutlined, SettingOutlined, ProductOutlined, AuditOutlined, AlignLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const MenuList = ({ darkTheme, isLoggedIn, user }) => {
    const [selectedKey, setSelectedKey] = useState('trang_chu');
    const navigate = useNavigate();

    const handleMenuClick = (e) => {
        setSelectedKey(e.key);
        if (e.key === 'trang_chu') {
            navigate('/');
        }
        if (e.key === 'quy_trinh') {
            navigate('/quytrinh');
        }
        if (e.key === 'CoSoSanXuat') {
            navigate('/CoSoSanXuat');
        }
        if (e.key === 'sanpham') {
            navigate('/SanPham');
        }
    };

    return (
        <div className="menu-container">
            <Menu
                theme={darkTheme ? 'dark' : 'light'}
                mode="inline"
                className='menu-bar'
                selectedKeys={[selectedKey]}
                onClick={handleMenuClick}
            >
                <Menu.Item key="trang_chu" icon={<HomeOutlined />}>
                    Trang chủ
                </Menu.Item>

                <Menu.Item key="truy_xuat" icon={<FileSearchOutlined />}>
                    Truy xuất sản phẩm
                </Menu.Item>

                {isLoggedIn && (
                    <>
                        {user && user.vaitro === 'Doanh nghiệp' && (
                            <Menu.SubMenu key="san_pham" icon={<ProductOutlined />} title="Sản phẩm">
                                <Menu.Item key="sanpham">Danh sách sản phẩm</Menu.Item>
                                <Menu.Item key="quy_trinh">Quy trình</Menu.Item>
                                <Menu.Item key="CoSoSanXuat">Cơ sở sản xuất</Menu.Item>
                            </Menu.SubMenu>
                        )}

                        {user && user.vaitro === 'Kiểm Định' && (
                            <Menu.SubMenu key="kiem_dinh" icon={<AuditOutlined />} title="Kiểm định">
                                <Menu.Item key="kiem_dinh_san_pham">Kiểm định sản phẩm</Menu.Item>
                                <Menu.Item key="kiem_dinh_quy_trinh">Kiểm định quy trình</Menu.Item>
                            </Menu.SubMenu>
                        )}
                        <Menu.Item key="thong_tin" icon={<AlignLeftOutlined />}>
                            Thông tin tài khoản
                        </Menu.Item>
                    </>
                )}
            </Menu>

            <Menu
                theme={darkTheme ? 'dark' : 'light'}
                mode="inline"
                className='menu-bar bottom-menu'
                selectedKeys={[selectedKey]}
                onClick={handleMenuClick}
            >
                <Menu.Item key="cai_dat" icon={<SettingOutlined />}>
                    Cài đặt
                </Menu.Item>
            </Menu>
        </div>
    );
};

export default MenuList;
