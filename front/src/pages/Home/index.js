import React, { useState, useEffect } from 'react';

import { Box } from '@chakra-ui/react';
import CreatePost from '../../components/CreatePost';
import Post from '../../components/Post';
import Loading from '../../components/Loading';
import { useContextFeed } from '../../providers/FeedContext';
import { PostProvider } from '../../providers/PostContext';
import { ModalProvider } from '../../providers/ModalContext';
import { FeedProvider } from '../../providers/FeedContext';

import axios from '../../services/feedInstance';

function Home() {
    
  const [post, setPost] = useContextFeed();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {

    const fetchData = async () => {
      const request = await axios.get("/api/feed/");
      setPost(request.data.return);
      setIsLoading(!isLoading);
    }

    
    fetchData();
  }, []);

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
      >
        
        <PostProvider>
        <ModalProvider>
          <CreatePost />
          
          
          {post.map(item => {
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
          })}
          
        </ModalProvider>
        </PostProvider>
      </Box>
      </>
  );
}

export default Home;