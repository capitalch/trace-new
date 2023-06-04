import { useField } from "formik"

function MyText2UseField({label, ...props}: any) {

    // const [field,meta] = useField(props.name)

    return (<>
        <input type="text"  {...props} />
        {/* {meta.touched && meta.error ? (<div>{meta.error}</div>) : null} */}
    </>)
}
export { MyText2UseField }