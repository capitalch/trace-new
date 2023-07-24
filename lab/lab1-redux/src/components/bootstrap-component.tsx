import { Container } from 'react-bootstrap'
function BootstrapComponent() {
    return (<div className='card' style={{width:'18rem'}}>
        <h1 className='my-100'>My First Bootstrap Page</h1>
        <button className='btn btn-primary btn-sm'  data-bs-toggle="button">Button</button>
    </div>)
}
export { BootstrapComponent }