import React, { useEffect, useRef } from 'react';

import { useContextPost } from '../../providers/PostContext';
import { useContextModal } from '../../providers/ModalContext';
import { useContextFeed } from '../../providers/FeedContext';
import { useContextId } from '../../providers/IdContext';

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Select,
    useToast,
    useDisclosure
  } from '@chakra-ui/react';

import axios from '../../services/feedInstance';

function ModalPost(props) {

  const [ author, setAuthor] = useContextPost().authorState;
  const [ categories, setCategories] = useContextPost().categoriesState;
  const [ publishedText, setPublishedText] = useContextPost().publishedTextState;
  const [ photo, setPhoto] = useContextPost().photoState;
  const [ modal, setModal ] = useContextModal();
  const [ post, setPost ] = useContextFeed();
  const [ id, setId ] = useContextId();

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const updateFeed = async () => {
    const request = await axios.get("/api/feed/");
    setPost(request.data.return);
  }

  const handlePost = async () => {
    
    let route = "/api/feed/";

    if(id > 0) {
      route = `/api/feed/update/${id}`;
    }

    if(author.length <= 0 || categories.length <= 0 || publishedText.length <= 0 ) {
      
      toast({
        title: 'Campo invalido',
        description: "Por favor preencha todos os campos obrigatório",
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    let formData = new FormData(); 
    formData.set('author', author);
    formData.set('categorie', categories); 
    formData.set('text_at_published', publishedText); 
    formData.set('photo', photo);
    
    const request = await axios.post(route, formData, {
      headers: {
          'content-type': 'multipart/form-data'
      }
    });

    if(request.status == 200) {
      setAuthor("");
      setCategories("");
      setPublishedText("");
      setPhoto("");
      
    }else {
      toast({
        title: 'Sistema temporariamente indisponível.',
        description: "Por favor tente novamente mais tarde",
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    onClose();
    updateFeed();
    setModal(!modal);
  }

  useEffect(() => {
    
    modal ? onOpen() : onClose()
  },[modal]);

  return (
    <>

      <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Publica Post</ModalHeader>
          <ModalCloseButton onClick={() => setModal(!modal)} />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Autor:</FormLabel>
              <Input 
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder='Author' 
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Categoria:</FormLabel>
              <Select
              placeholder='Selecione uma categoria'
              value={categories}
              onChange={(e) => setCategories(e.target.value)}
              >
                <option value='Post'>Post</option>
                <option value='Artigo'>Artigo</option>
                <option value='Grupo'>Grupo</option>
              </Select>
            </FormControl>

            <FormControl mt={4}>
            <FormLabel>Texto da publicação:</FormLabel>
            <Textarea
            placeholder='Texto da publicação'
            size='sm'
            value={publishedText}
            onChange={(e) => setPublishedText(e.target.value)}
            />
            </FormControl>

            <FormControl mt={4}>
            <FormLabel>Imagem da publicação:</FormLabel>
            <Input
            type="file"
            p="2%"
            onChange={(e) => setPhoto(e.target.files[0])}
            />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
            onClick={() => handlePost()} 
            colorScheme='blue' 
            mr={3}>
              Publicar
            </Button>
            <Button onClick={() => setModal(!modal)}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalPost;