import React from 'react';
import PropTypes from 'prop-types';

import axios from '../../services/feedInstance/';

import { useContextPost } from '../../providers/PostContext';
import { useContextModal } from '../../providers/ModalContext';
import { useContextFeed } from '../../providers/FeedContext';
import { useContextId } from '../../providers/IdContext';

import ReadMoreReact from 'read-more-react';
import {
    Box,
    Image,
    Avatar,
    Text,
    Menu,
    MenuButton,
    MenuList,
    MenuItem
} from '@chakra-ui/react';
import { AttachmentIcon } from '@chakra-ui/icons';

function Post(props) {

    const [author, setAuthor] = useContextPost().authorState;
    const [categories, setCategories] = useContextPost().categoriesState;
    const [publishedText, setPublishedText] = useContextPost().publishedTextState;
    const [photo, setPhoto] = useContextPost().photoState;
    const [modal, setModal ] = useContextModal();
    const [post, setPost] = useContextFeed();
    const [id, setId] = useContextId();

    const convertMonthNumberToMonthString = (monthNumber) => {

        switch (Number(monthNumber)) {

            case 1:
                return "Janeiro"
                break;
        
            case 2:
                return "Feveiro"
                break;
    
            case 3:
                return "Março"
                break;
        
            case 4:
                return "Abril"
                break;
        
            case 5:
                return "Maio"
                break;
        
            case 6:
                return "Junho"
                break;

            case 7:
                return "Julho"
                break;
        
            case 8:
                return "Agosto"
                break;

            case 9:
                return "Setembro"
                break;
                           
            case 10:
                return "Outubro"
                break;
                
            case 11:
                return "Novembro"
                break;
                
            case 12:
                return "Dezembro"
                break;

            default:
                return;
                break;
        }
    }

    const padWithZero = (num) => {
        return String(num).padStart(2, '0');
    }

    const convertNumberSingleToNumberZero = (number) => {

        let initialNumber = number;
        const arrayOfZeroAtNine = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

        arrayOfZeroAtNine.map(item => {
            if(item == number) {
                initialNumber = padWithZero(number)
            }
        })

        return initialNumber;
    }
    
    const convertTimestampToDatetime = () => {
        // SIM EU SEI QUE ISSO È UMA GAMBIRRA, POREM FAZEMOS PRIMEIRO, DEPOIS OTIMIZAMOS AMIGOS
        const timestamp = props.create_at;

        let date = new Date(timestamp);

        let hours = convertNumberSingleToNumberZero(date.getHours());
        let minutes = convertNumberSingleToNumberZero(date.getMinutes());
        
        let day = convertNumberSingleToNumberZero(date.getDay());
        let month = convertMonthNumberToMonthString(date.getMonth());
        let year = date.getFullYear();

        return {
            hours,
            minutes,
            day,
            month,
            year
        }
    }

    const handleDeletePost = async (id) => {
        
        try {
            const request = await axios.get(`/api/feed/delete/${id}`);

            if(request.status === 200) {
                
                const removeUserState = post.filter(item => item.id != id);
                setPost(removeUserState);
                
                return true;
            }
        }
        catch(error) {
            console.log(error);
        }
        
        
    }

    const handleUpdatePost = async (id) => {
        try {
            let request = await axios.get(`/api/feed/`);
            const dataReturn = request.data.return;

            const findUser = dataReturn.filter(item => item.id === id);
            
            setId(id);
            setAuthor(findUser[0].author);
            setCategories(findUser[0].categorie);
            setPublishedText(findUser[0].published_text);
            setPhoto(findUser[0].photo);
            
        }
        catch(error) {
            console.log(error);
        }
        setModal(!modal);
    }
    
    return (
        <Box
        w="50%"
        bg="white"
        p="1%"
        borderRadius={5}
        >
            <Box 
            w="100%"
            display="flex"
            alignItems="center"
            >
                <Avatar name={props.author} src={props.avatar_url} />

                <Box
                display="flex"
                flexDirection="column"
                pl="2%"
                >
                    <Text
                    color='blue'
                    >{props.author}</Text>
                    <Text
                    fontSize='xs'
                    >Publicado em {convertTimestampToDatetime().day} de {convertTimestampToDatetime().month} de {convertTimestampToDatetime().year} as {convertTimestampToDatetime().hours}:{convertTimestampToDatetime().minutes}</Text>
                </Box>

                <Menu>
                    
                    <MenuButton
                    p="1%"
                    transition='all 0.2s'
                    ml="auto"
                    > ...</MenuButton>
                    
                    <MenuList>
                        <MenuItem onClick={() => handleUpdatePost(props.id)}>Editar</MenuItem>
                        <MenuItem
                        color="red"
                        onClick={() => handleDeletePost(props.id)}
                        >Excluir</MenuItem>
                    </MenuList>
                    
                    </Menu>

            </Box>

            <Box
            display="flex"
            alignItems="center"
            flexDirection="row"
            pt="1%"
            gap="5px"
            >
                <AttachmentIcon />
                <Text
                mt={5}
                fontSize='sm'
                color='blue'
                m={0}
                >{props.categorie}</Text>
            </Box>

            <Box
            display="flex"
            flexDirection="column"
            pt="2%"
            >
                <ReadMoreReact 
                text={props.published_text}
                max={500}
                readMoreText="Leia mais"
                />

                {(props.publish_image != null) ? 
                
                (<Image
                boxSize='900px'
                objectFit='cover'
                src={props.publish_image}
                alt='Image da publicação'
                />)
                :
                ""
                }
                

            </Box>
            
        </Box>
    );
}

Post.prototype = {
    create_at: PropTypes.string.isRequired,
    avatar_url: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    categorie: PropTypes.string.isRequired,
    published_text: PropTypes.string.isRequired,
    publish_image: PropTypes.string.isRequired,
}

export default Post;