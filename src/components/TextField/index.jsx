/* eslint-disable react/prop-types */
export default function TextField({ title, name, value, onChangeField, onKeyDownField, placeholder }){
    return(
        <>
            <label htmlFor={name}>{title}</label>
            <input
            type="text"
            name= {name}
            value={value}
            onChange={onChangeField}
            onKeyDown={onKeyDownField}
            placeholder= {placeholder} // IP do NAO
            />
        </>
    )
}