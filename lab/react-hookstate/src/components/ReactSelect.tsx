import { useRef } from 'react'
import Select from 'react-select'
function ReactSelect() {
    const selectRef: any = useRef({})
    const options = [
        { value: "blues", label: "Blues" },
        { value: "rock", label: "Rock" },
        { value: "jazz", label: "Jazz" },
        { value: "orchestra", label: "Orchestra" },
    ];

    const customStyles = {
        option: (defaultStyles: any, state: any) => ({
            ...defaultStyles,
            paddingTop: '2px',
            paddingBottom: '2px',
            fontSize: '14px',
        }),
        input: (defaultStyles: any, state: any) => ({
            ...defaultStyles,
            // fontSize: '8px',
        }),
        valueContainer: (defaultStyles: any, state: any) => ({
            ...defaultStyles,
            fontSize: '14px',
        }),

        container: (defaultStyles: any, state: any) => ({
            ...defaultStyles,
        }),

        control: (defaultStyles: any) => ({
            ...defaultStyles,
        }),
    };

    const customStyles1 = {
        option: (defaultStyles: any, state: any) => ({
            ...defaultStyles,
            color: state.isSelected ? "#212529" : "#fff",
            backgroundColor: state.isSelected ? "#a0a0a0" : "#212529",
        }),

        control: (defaultStyles: any) => ({
            ...defaultStyles,
            backgroundColor: "#212529",
            padding: "10px",
            border: "none",
            boxShadow: "none",
        }),
        singleValue: (defaultStyles: any) => ({ ...defaultStyles, color: "#fff" }),
    };

    return (
        <div>
            <button onClick={handleClick}>Reset</button>
            <Select ref={selectRef} options={options}
                className='m-10 w-1/4'
                styles={customStyles}
            />
        </div>
    )

    function handleClick() {
        selectRef.current.setValue({ label: 'abcd', value: '' })
    }
}
export { ReactSelect }