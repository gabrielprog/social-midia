import React, { useContext, createContext, useState } from 'react';

const PostContext = createContext();


function PostProvider({ children }) {

    const [author, setAuthor] = useState("");
    const [categories, setCategories] = useState("");
    const [publishedText, setPublishedText] = useState("");
    const [photo, setPhoto] = useState("");

    return (
        <PostContext.Provider value={
            {
                authorState: [author, setAuthor],
                categoriesState: [categories, setCategories],
                publishedTextState: [publishedText, setPublishedText],
                photoState: [photo, setPhoto]
            }
        }>
            {children}
        </PostContext.Provider>
    );
}

function useContextPost() {
    const {
        authorState,
        categoriesState,
        publishedTextState,
        photoState
    } = useContext(PostContext);

    return {
        authorState,
        categoriesState,
        publishedTextState,
        photoState
    };
}

export {
    PostProvider,
    useContextPost
}