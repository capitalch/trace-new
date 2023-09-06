import { useState } from "react";

function PictureUpload() {
    const [file, setFile]: any = useState();

    return (<div>
        <h2>Add Image</h2>
        {/* <form> */}
            <input type='file' onChange={handleChange} />
        {/* </form> */}

        <img src={file} alt='pic' />
    </div>)

    function handleChange(e: any) {
        console.log(e.target.files)
        const oUrl = URL.createObjectURL(e.target.files[0])
        const formData = new FormData()
        formData.append('file', e.target.files[0])
        console.log(formData)
        setFile(oUrl)
    }
}
export { PictureUpload }