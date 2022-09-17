import React, { useContext, createContext, useState } from 'react';

const ModalContext = createContext();


function ModalProvider({ children }) {

    const [modal, setModal] = useState(false);

    return (
        <ModalContext.Provider value={[modal, setModal]}>
            {children}
        </ModalContext.Provider>
    );
}

function useContextModal() {
    const stateModal = useContext(ModalContext);
    return stateModal;
}
export {
    ModalProvider,
    useContextModal
}