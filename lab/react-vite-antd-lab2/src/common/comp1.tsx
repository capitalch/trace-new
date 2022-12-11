import { Button, Space, theme } from 'antd'
const { useToken } = theme
function Comp1() {
    const { token } = useToken()
    return (
        <>
            <Space>
                <span>Test</span>
                <Button type='default' size='small' style={{backgroundColor:token.colorPrimary}}>My button</Button>
            </Space>
        </>
    )
}
export { Comp1 }