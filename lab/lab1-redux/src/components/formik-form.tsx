import { useFormik } from 'formik'
import { useContext } from 'react'
import * as Yup from 'yup'
import { MyContext } from '../App'

function FormikForm() {
    const value: any = useContext(MyContext)
    const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
    }
    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: handleSubmit,
        validationSchema: Yup.object({
            firstName: Yup.string().min(4, '4 chars').required('Required')
        })
    })
    return (
        <div>
            <h2>{value?.project}</h2>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="firstName">First Name</label>
                <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.firstName}
                />
                {formik.touched.firstName && formik.errors.firstName ? (
                    <div>{formik.errors.firstName}</div>
                ) : null}
                <label htmlFor="lastName">Last Name</label>
                <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.lastName}
                />

                <label htmlFor="email">Email Address</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
                <button className='btn btn-danger m-2' type="submit">Submit</button>
            </form>
        </div>
    )

    function handleSubmit(values: any) {
        console.log(values)
    }
}
export { FormikForm }