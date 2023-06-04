function Select1(props: any) {
    return (
        <>
            <select {...props}>
                <option key={0} value=''>Select city</option>
                <option key={1} value='1'>Kolkata</option>
                <option key={2} value='2'>New Delhi</option>
                <option key={3} value='3'>Mumbai</option>
                <option key={4} value='4'>Chenni</option>
                <option key={5} value='5'>Bhubaneshwar</option>
            </select>
        </>
    )

    // function handleOnChange(event: any){
    //     props.setFieldValue(event.target.value)
    //     props.onChange(event)
    // }
}
export { Select1 }