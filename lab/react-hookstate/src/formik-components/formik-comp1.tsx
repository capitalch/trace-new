import { useFormik, Form, Field } from 'formik'
import * as Yup from 'yup'

function FormikComp1() {
    const tab1: any = {}
    const formik = useFormik({
        initialValues: {
            tab1: {
                name: '',
                email: ''
            }
        }
        , onSubmit: (values: any) => { handleOnSubmit(values) }
        , validationSchema: Yup.object({
            name: Yup.string().required('name is required'),
            email: Yup.string().required('email is required').email('Must be an email address')
        })
    })
    return (
        <div style={{ margin: '10px', display: 'flex', flexDirection: 'column', width: '200px', rowGap: '5px' }}>
            <form onSubmit={formik.handleSubmit}>

                <input type="text" id='name' name='tab1.name' onChange={formik.handleChange} value={formik.values.tab1.name} />
                <input type="text" id='email' name='tab1.email' onChange={formik.handleChange} value={formik.values.tab1.email} />
                <button type="submit" >Submit</button>
            </form>
            <button onClick={handleChangeValue}>Change value</button>
        </div>
    )

    function handleChangeValue() {
        formik.setFieldValue('tab1.name', 'Samara')
        formik.setFieldValue('tab1.email', 'ddd@jj.com')
    }

    function handleOnSubmit(values: any): void {
        console.log(values)
    }
}
export { FormikComp1 }