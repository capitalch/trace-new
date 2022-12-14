import { Button, ConfigProvider, DatePicker, Image, Layout, Space, Typography, theme, version, Divider } from 'antd'
import { LaptopOutlined, LeftOutlined, MenuOutlined, MenuUnfoldOutlined, NotificationOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { generate, presetPalettes, presetDarkPalettes, geekblue } from '@ant-design/colors'
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
const { Content, Footer, Header, Sider } = Layout
import { Button as MuiButton, Box } from '@mui/material'
import { Container, display, SxProps } from '@mui/system';
import { Calculate } from '@mui/icons-material';
// import './app-main1.scss'

function AppMain1() {
    const [collapsed, setCollapsed] = useState(false);
    return (<Layout>
        <Sider
            breakpoint='xxl'
            // collapsed={false}
            collapsible={true}
            collapsedWidth={0}
            onCollapse={(value) => setCollapsed(value)}
            style={{ height: '100vh' }}
            trigger={null}
            theme='light'
        // width={200}
        >
            {/* <Space size='large' direction='vertical' > */}
            {/* <Space size='large'>
                    <Image
                        style={{ marginLeft: '10px', marginTop: '5px' }}
                        width={140}
                        height={50}
                        src="src/images/logo6.png"

                    />
                    <Button size='small' type='text' shape='circle' icon={<LeftOutlined />}
                        style={{ marginTop: '1rem', marginRight: '.5rem' }}
                    />
                </Space> */}
            {/* <Divider /> */}
            <Menu mode='vertical' defaultSelectedKeys={['4']} theme='light' style={{ height: '100vh', width: '200px' }}
                items={[UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map(
                    (icon, index) => ({
                        key: String(index + 1),
                        icon: React.createElement(icon),
                        label: `nav ${index + 1}`,
                    }),
                )} />
            {/* </Space> */}
        </Sider>
        <Layout>
            {/* <Header  style={{ width: '100vw'}}>Header</Header> */}
            <div style={{ width: 'calc(100vw - 200px)', backgroundColor: geekblue.primary, height: '38px', color: 'white', display: 'flex', alignItems:'center' }}>

                <Button size='small' type='ghost' style={{ color: 'white', }}>Test</Button>

            </div>
            <Content style={{ backgroundColor: 'red', height: '200px' }}>Content</Content>
        </Layout>
        {/* <Content style={{ width: 'calc(100vw - 200px)' , padding: '10px' }}> */}
        {/* <Container  sx={{ backgroundColor: 'red', height: '56px' }}>
                <Button size='small'>Test</Button>
            </Container> */}
        {/* <Space direction='vertical'>
                <Space direction='vertical' size='large'>
                    <Box sx={{ display: 'flex', width: 'auto', backgroundColor: 'red' }}>
                        <Button size='small'>Test</Button>
                        <MuiButton size='small' variant='outlined'> test</MuiButton>
                    </Box>
                </Space>
            </Space> */}
        {/* </Content> */}
    </Layout>)
}

export { AppMain1 }

const appMain1Styles = {
    'background-color': 'red',
    'width': '100vw',
    height: '500px'
}

const mySx: SxProps = {
    m: 10
}