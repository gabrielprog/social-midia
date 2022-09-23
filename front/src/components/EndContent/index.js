import React from 'react';

import {
    Box,
    Text
} from '@chakra-ui/react';

function EndContent() {
  return (
    <Box
    bg="white"
    w="50%"
    display="flex"
    justifyContent="center"
    p="0.3%"
    mb="1%"
    borderRadius={5}
    >
        <Text>Por hoje é só :(</Text>
    </Box>
  );
}

export default EndContent;