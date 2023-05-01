import {FormControl} from '@src/libs'
function AppCheckbox({name, label, func}:{name: string, label: string, func: any}) {
    return (<>
        <FormControl display='flex' flexDir='row' alignItems='center' columnGap={2} >
            <input id= {name} {...func(name)} type='checkbox'
                style={{ width: '20px', height: '20px', cursor: 'pointer', }} />
            <label htmlFor={name} style={{ cursor: 'pointer' }}>{label}</label>

        </FormControl>
    </>)
}
export { AppCheckbox }