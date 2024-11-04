/* eslint-disable react/prop-types */
export default function Response({ loading, response, error }){
    return(
        <>
            {loading && <p>Carregando...</p>}
            <p>{response}</p>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </>
    )
}