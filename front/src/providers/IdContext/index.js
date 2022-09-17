import React, { useContext, createContext, useState } from 'react';

const IdContext = createContext();


function IdProvider({ children }) {

    const [id, setId] = useState(0);

    return (
        <IdContext.Provider value={[id, setId]}>
            {children}
        </IdContext.Provider>
    );
}

function useContextId() {
    
    const stateId = useContext(IdContext);
    return stateId;
}
export {
    IdProvider,
    useContextId
}