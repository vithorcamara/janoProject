/* eslint-disable react/prop-types */
export default function ButtonSystem({ classname, value, fetchQuestion }){
    return(
        <input className={classname} type="button" value={value} onClick={fetchQuestion}/>
    )
}