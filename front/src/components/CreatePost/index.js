import React from 'react';

import {
    Box
} from '@chakra-ui/react';

import ButtonPublishPost from '../ButtonPublishPost';
import ModalPost from '../ModalPost';

function CreatePost() {
  
  return (
    <Box
    bg="white"
    w="50%"
    display="flex"
    justifyContent="center"
    p="1%"
    borderRadius={5}
    >
        <ButtonPublishPost />
        <ModalPost />

    </Box>
  );
}

export default CreatePost;