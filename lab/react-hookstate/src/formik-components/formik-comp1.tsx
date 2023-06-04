import { useFormik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Select1 } from './select1'
import { MyText1 } from './my-text1'
import { useEffect } from 'react'
import { useGranularEffect } from 'granular-hooks'
import { MyText2UseField } from './my-text2-use-field'
import { PhoneNumber } from './PhoneNumber'
import { ZipCode } from './ZipCode'

function FormikComp1() {

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            item: '',
            city: '',
            zip: '',
            zipCode:'',
            address1: '',
            phone: '',
            phoneNumber:''
        }
        , onSubmit: //handleOnSubmit 
            (values: any) => {
                handleOnSubmit(values)
            }
        , validationSchema: Yup.object({
            name: Yup.string().required('name is required'),
            email: Yup.string().required('email is required').email('Must be an email address'),
            item: Yup.string().required('item is required'),
            city: Yup.string().required('city is required'),
            zip: Yup.string().required('zip is required'),
            zipCode: Yup.string().required('zip is required').matches(/\b\d{5}\b/, 'Zip must be 5 digit number'),
            address1: Yup.string().required('address1 is required'),
            phone: Yup.string().required('phone is required').matches(/\d{3}-\d{3}-\d{4}$/, 'Phone should be in format ###-###-####'),
            phoneNumber: Yup.string().required('phone is required').matches(/\d{3}-\d{3}-\d{4}$/, 'Phone should be in format ###-###-####'),
        })
    })

    const { dirty, errors, handleBlur, handleChange, handleSubmit, touched, values, getFieldProps, setFieldValue } = formik

    useGranularEffect(() => {
        setFieldValue('city', 3)
    }, [], [setFieldValue])

    return (
        <div className="container-fluid">
            <form onSubmit={handleSubmit}>
                <div className='row'>
                    <input className='col-2' type="text"  {...getFieldProps('name')} />
                    {errors.name && touched.name ? <div className='text-danger'>{errors.name}</div> : null}
                </div>
                <div className='row'>
                    <input type="text" name='email' onChange={handleChange} value={values.email} onBlur={handleBlur} />
                    {errors.email && touched.email ? <div>{errors.email}</div> : null}
                </div>
                <div className='row'>
                    <select name='item' onChange={handleChange} onBlur={handleBlur} value={values.item} >
                        <option value=''>Select value</option>
                        <option value='1'>value 1</option>
                        <option value='2'>value 2</option>
                        <option value='3'>value 3</option>
                    </select>
                    {errors.item && touched.item ? <div>{errors.item}</div> : null}
                </div>
                <div className='row'>
                    <Select1  {...getFieldProps('city')} />
                    {errors.city && touched.city ? <div>{errors.city}</div> : null}
                </div>
                {/* <div className='row'>
                    <MyText1  {...getFieldProps('zip')} />
                    {errors.zip && touched.zip ? <div>{errors.zip}</div> : null}
                </div> */}

                {/* <div className='row'>
                    <MyText2UseField onChange={handleChange} onBlur='handleBlur' label='address1' id='address1' name='address1' />
                </div> */}
                <div className='row'>
                    <ZipCode {...getFieldProps('zipCode')} setFieldValue={setFieldValue} />
                    {errors.zipCode && touched.zipCode ? <div>{errors.zipCode}</div> : null}
                </div>
                <div className='row'>
                    <input type='tel' id='phone' onChange={handlePhoneChange} onBlur={handleBlur} value={values.phone} />
                    {errors.phone && touched.phone ? <div>{errors.phone}</div> : null}
                </div>
                <div className='row'>
                    <PhoneNumber {...getFieldProps('phoneNumber')} setFieldValue={setFieldValue} />
                    {errors.phoneNumber && touched.phoneNumber ? <div>{errors.phoneNumber}</div> : null}
                </div>
                <button className='btn btn-sm btn-success' type="submit" >Submit</button>
            </form>
            <button onClick={handleChangeValue}>Change value</button>
        </div >
    )

    function handleChangeValue() {
        // formik.setFieldValue('name', 'Samara')
        // formik.setFieldValue('email', 'ddd@jj.com')
        setFieldValue('city', '3')
    }

    function formatPhoneNumber(number: string) {
        let cleaned = ('' + number).replace(/\D/g, '');
        if (cleaned.length > 10) {
            cleaned = cleaned.substring(0, 10)
        }
        const ret = doFormat(cleaned)
        return (ret)

        function doFormat(value: string) {
            const chunks = value.match(/^(\d{1,3})(\d{1,3})?(\d{1,4})?$/);
            if (chunks) {
                const formattedChunks = chunks.slice(1).filter(Boolean);
                return formattedChunks.join('-');
            }
            return (value)
        }
    }

    function handlePhoneChange(event: any) {
        const formatted = formatPhoneNumber(event.target.value);
        setFieldValue('phone', formatted)
    }

    function handleOnSubmit(values: any): void {
        console.log(values)
    }
}
export { FormikComp1 }

// style={{ margin: '10px', display: 'flex', flexDirection: 'column', width: '200px', rowGap: '5px' }}