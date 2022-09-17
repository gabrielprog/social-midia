import React from 'react';

import {
    Button
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

import { useContextModal } from '../../providers/ModalContext/';

function ButtonPublishPost() {

  const [modal, setModal ] = useContextModal();
  return (
    <Button 
    colorScheme='gray'
    display="flex"
    textAlign="center"
    minWidth="30%"
    onClick={() => setModal(!modal)}
    >
        <HamburgerIcon
        mr="5%"
        />Criar Post</Button>
  );
}

export default ButtonPublishPost;