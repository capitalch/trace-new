import { useState } from 'react'
import { AppMain } from './app-main'
import './my-styles.css'
import { Button, ConfigProvider, DatePicker, Layout, Space, theme, version } from 'antd'
import { Comp1 } from './common/comp1'
import { Components } from 'antd/es/date-picker/generatePicker'
import { AppMain1 } from './app-main1'
// import 'antd/dist/reset.css';
const { Content, Footer, Header, Sider } = Layout

function App() {

  return (
    //  <AppMain />
    // <ConfigProvider
    //   theme={{
    //     // algorithm:theme.defaultAlgorithm,
    //     token: {
    //       colorPrimary: '#00b96b',
    //     },
    //     components:{
          
    //     }
    //   }}
    // >
      // <AppMain />
      <AppMain1 />
    // </ConfigProvider>
  )
}

export default App
