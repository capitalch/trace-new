// , {...errors}, {...touched}
function MyText1(props:any) {

    return (<>
        <input type="text" {...props} />
        {/* {props.errors.zip && props.touched.zip ? <div>{props.errors.zip}</div> : null} */}
    </>)
}
export { MyText1 }