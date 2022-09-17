import React, { useContext, createContext, useState } from 'react';

const FeedContext = createContext();


function FeedProvider({ children }) {

    const [feed, setFeed] = useState([]);

    return (
        <FeedContext.Provider value={[feed, setFeed]}>
            {children}
        </FeedContext.Provider>
    );
}

function useContextFeed() {
    
    const stateFeed = useContext(FeedContext);
    return stateFeed;
}
export {
    FeedProvider,
    useContextFeed
}