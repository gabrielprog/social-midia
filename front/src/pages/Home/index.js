import React, { useState, useEffect, useRef } from 'react';

import { Box } from '@chakra-ui/react';

import CreatePost from '../../components/CreatePost';
import Post from '../../components/Post';
import Loading from '../../components/Loading';
import EndContent from '../../components/EndContent';

import { useContextFeed } from '../../providers/FeedContext';
import { PostProvider } from '../../providers/PostContext';
import { ModalProvider } from '../../providers/ModalContext';

import axios from '../../services/feedInstance';

function Home() {
    
  const [post, setPost] = useContextFeed();
  const [isLoading, setIsLoading] = useState(true);
  const [isEndContent, setIsEndContent] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const refScroll = useRef(null);

  const isElementBottom = (el) => {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  }

  const handleScroll = () => {
      if (isElementBottom(refScroll.current)) { 
        setCurrentPage(currentPage + 1);
      }
  }

  const nextPage = async () => {
    

    if(post.next_page_url == null) {

      setIsEndContent(!isEndContent);
      return;
    }

    const request = await axios.get(`/api/feed?page=${currentPage}`);

    setPost({
      ...post,
      data: [...post.data, ...request.data.data],
      next_page_url: request.data.next_page_url
    });

  }

  const fetchData = async () => {

    if (post.data && post.data.length > 0) {
      nextPage();
      return;
    }
    
    const request = await axios.get("/api/feed/");

    setPost(request.data);
    setIsLoading(!isLoading);
  }
  
  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    
    fetchData();

  }, [currentPage]);

  return (
    <>
      {isLoading && <Loading />}
      <Box
      w="100%"
      height="100%"
      p={1}
      display="flex"
      justifyContent="center"
      alignItems="center"
      gap="10px"
      flexDirection="column"
      ref={refScroll}
      >
        
        <PostProvider>
        <ModalProvider>
          <CreatePost />
          
          
          {
            post.data && post.data.map(item => {
                return (
                
                <Post
                key={item.id}
                id={item.id}
                create_at={item.created_at}
                avatar_url={item.avatar_url}
                author={item.author}
                categorie={item.categorie}
                published_text={item.published_text}
                publish_image={item.publish_image}
                />
                
                )
            })
          }
          
          
          {isEndContent && <EndContent />}


        </ModalProvider>
        </PostProvider>
      </Box>
      </>
  );
}

export default Home;