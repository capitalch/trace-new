import { Button, ConfigProvider, DatePicker, Image, Layout, Space, Typography, theme, version } from 'antd'
import { LaptopOutlined, LeftOutlined, MenuOutlined,MenuUnfoldOutlined, NotificationOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { blue, generate, presetPalettes, presetDarkPalettes } from '@ant-design/colors'
import type { MenuProps } from 'antd';
import { Breadcrumb, Menu, } from 'antd';
import React, { useState } from 'react';
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    // UserOutlined,
} from '@ant-design/icons';
type MenuItem = Required<MenuProps>['items'][number];
const { Content, Footer, Header, Sider } = Layout
const { Text, Title } = Typography
function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('Option 1', '1', <PieChartOutlined />),
    getItem('Option 2', '2', <DesktopOutlined />),
    getItem('User', 'sub1', <UserOutlined />, [
        getItem('Tom', '3'),
        getItem('Bill', '4'),
        getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9', <FileOutlined />),
];



function AppMain() {
    const [wid, setWid]: any = useState('0px')
    const [collapsed, setCollapsed] = useState(false)
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    console.log(blue)
    // const wid = '200px'
    const x = generate('red')

    return (
        <Layout>
            <Sider
                style={{ height: '100vh' }}
                theme='light'
                breakpoint={'xxl'}
                collapsible={true}
                collapsedWidth="0"

                defaultCollapsed={true}

                onBreakpoint={(broken) => {
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    if (collapsed) {
                        setWid('0px')
                    } else {
                        setWid('200px')
                    }
                    console.log(collapsed, type);
                }}
                trigger={null}
                collapsed={collapsed}>
                <div className="logo">
                    <Space size='large'>
                        <Image
                            style={{ marginLeft: '15px', marginTop: '5px' }}
                            width={140}
                            height={50}
                            src="src/images/logo6.png"
                        />
                        <Button size='small' type='text' shape='circle' icon={<LeftOutlined />} style={{ marginTop: '1rem' }} onClick={() => {
                            setCollapsed(!collapsed)
                        }} />
                        {/* <LeftOutlined onClick={()=>{}} /> */}
                    </Space>
                </div>
                <Menu
                    // theme="light"

                    mode="inline"
                    defaultSelectedKeys={['4']}
                    items={[UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map(
                        (icon, index) => ({
                            key: String(index + 1),
                            icon: React.createElement(icon),
                            label: `nav ${index + 1}`,
                        }),
                    )}
                />
            </Sider>

            <Layout style={{ width: `calc(100vw - ${wid})` }}>
                <Header>
                    <Space size='large' style={{ marginLeft: -30, paddingLeft: 0 }}>
                        {/* <Button size='small' style={{ visibility: collapsed ? 'visible' : 'hidden' }} shape='default' icon={<MenuOutlined />} onClick={() => setCollapsed(!collapsed)}></Button> */}
                        <MenuUnfoldOutlined style={{color:'white', fontSize:'22px', visibility: collapsed ? 'visible' : 'hidden'}} onClick={() => setCollapsed(!collapsed)}/>
                        <Title style={{ color: 'white' }} level={5}>Accounts</Title>
                    </Space>


                </Header>
                <Content style={{ margin: '24px 16px 0' }}>
                    <div style={{ background: colorBgContainer }}>content</div>
                </Content>
                <Footer >Ant Design ©2018 Created by Ant UED This is for</Footer>
            </Layout>
        </Layout>)
}

export { AppMain }