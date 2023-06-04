import React from 'react'

function PhoneNumber(props: any) {
    return (
        <input type='tel' {...props} onChange={handleOnChange} />
    )

    function handleOnChange(event:any){
        const formatted = formatPhoneNumber(event.target.value);
        props.setFieldValue(props.name, formatted)
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
}
export { PhoneNumber }