import { useFormik, } from 'formik'
import * as Yup from 'yup'
import { Select1 } from './select1'
// import { MyText1 } from './my-text1'
// import { useEffect } from 'react'
import { useGranularEffect } from 'granular-hooks'
// import { MyText2UseField } from './my-text2-use-field'
import { PhoneNumber } from './PhoneNumber'
import { ZipCode } from './ZipCode'
import { useEffect, useRef, useState } from 'react'
import {emit, filterOn } from '@src/features/ibuki'
import { IbukiMessages } from '@src/features/IbukiEnumns'

function FormikComp1() {

    const [, setRefresh] = useState({})

    const meta: any = useRef({
        item: ''
    })
    const formik = useFormik({
        initialValues: {
            officeName: '',
            // name: '',
            // email: '',
            // item: '',
            // city: '',
            // zip: '',
            // zipCode:'',
            // address1: '',
            // phone: '',
            // phoneNumber:''
        }
        , validateOnMount: true
        , onSubmit: //handleOnSubmit 
            (values: any, actions: any) => {
                handleOnSubmit(values, actions)
            }
        , validationSchema: Yup.object({
            officeName: Yup.string().required('Required')
            // name: Yup.string().required('name is required'),
            // email: Yup.string().required('email is required'),
            // item: Yup.string().required('item is required'),
            // city: Yup.string().required('city is required'),
            // zip: Yup.string().required('zip is required'),
            // zipCode: Yup.string().required('zip is required').matches(/\b\d{5}\b/, 'Zip must be 5 digit number'),
            // address1: Yup.string().required('address1 is required'),
            // phone: Yup.string().required('phone is required').matches(/\d{3}-\d{3}-\d{4}$/, 'Phone should be in format ###-###-####'),
            // phoneNumber: Yup.string().required('phone is required').matches(/\d{3}-\d{3}-\d{4}$/, 'Phone should be in format ###-###-####'),
        })
    })

    const { dirty, errors, handleBlur, handleChange, handleSubmit, isSubmitting, isValid, touched, values, getFieldProps, setFieldValue }: any = formik

    // useGranularEffect(() => {
    //     setFieldValue('city', 3)
    // }, [], [setFieldValue])

    useEffect(() => {
        const subs1 = filterOn(IbukiMessages['REFRESH:SelectableGridHeader:SelectableGrid']).subscribe((d: any) => {
            console.log(d.data)
            console.log(IbukiMessages['REFRESH:SelectableGridHeader:SelectableGrid'])
        })
        return(()=>{
            subs1.unsubscribe()
        })
    }, [])

    return (
        <div className="container-fluid">
            <form onSubmit={handleSubmit}>
                <input type="text" className="form-control" placeholder="Enter name" {...getFieldProps('officeName')} />
                {touched.officeName && errors.officeName ? <div>Error</div> : null}
                {/* <div className='row'>
                    <input className='col-2' type="text"  {...getFieldProps('name')} autoComplete='off' />
                    {errors.name && touched.name ? <div className='text-danger'>{errors.name}</div> : null}
                </div> */}
                {/* <div className='row'>
                    <input type="text" name='email' id='email' onChange={handleChange}  onBlur={handleBlur} />
                    {errors.email && touched.email ? <div>{errors.email}</div> : null}
                </div> */}
                <div className='row'>
                    <select name='item' {...getFieldProps('item')}>
                        <option value=''>Select value</option>
                        <option value='1'>value 1</option>
                        <option value='2'>value 2</option>
                        <option value='3'>value 3</option>
                    </select>
                    {errors.item && touched.item ? <div>{errors.item}</div> : null}
                </div>
                <div className='row'>
                    <Select1  {...getFieldProps('city')} value={meta.current.item} />
                    {errors.city && touched.city ? <div>{errors.city}</div> : null}
                </div>
                {/* <div className='row'>
                    <MyText1  {...getFieldProps('zip')} />
                    {errors.zip && touched.zip ? <div>{errors.zip}</div> : null}
                </div> */}

                {/* <div className='row'>
                    <MyText2UseField onChange={handleChange} onBlur='handleBlur' label='address1' id='address1' name='address1' />
                </div> */}
                {/* <div className='row'>
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
                </div> */}
                {/* <button disabled={isSubmitting} className='btn btn-sm btn-success' type="submit" >Submit</button> */}
                <button type='button' disabled={isSubmitting}
                    className='btn btn-sm btn-success' onClick={handleSubmit}>Change value</button>
                <button type='button' onClick={() => {
                    emit(IbukiMessages['REFRESH:SelectableGridHeader:SelectableGrid'],'My test ibuki')
                 }}>Ibuki Message</button>
            </form>

            <button type='button' onClick={() => {
                // setFieldValue('item', '3')
                meta.current.item = '3'
                setRefresh({})
            }}>Change value</button>

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

    async function handleOnSubmit(values: any, actions: any) {
        setTimeout(() => {
            console.log(values)
            actions.setSubmitting(false)
        }, 5000);

    }
}
export { FormikComp1 }

// style={{ margin: '10px', display: 'flex', flexDirection: 'column', width: '200px', rowGap: '5px' }}
// onChange={handleChange} onBlur={handleBlur} value={values.item} 