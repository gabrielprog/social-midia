import React from 'react';
import {
    Box,
    CircularProgress
} from '@chakra-ui/react';

function Loading() {
  return (
    <Box
    position="position"
    bg="white"
    display="flex"
    w="100vw"
    h="100vh"
    justifyContent="center"
    alignItems="center"
    >

        <CircularProgress isIndeterminate color='green.300' />

    </Box>
  );
}

export default Loading;