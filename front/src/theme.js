import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        bg: "#EEEEEE",
      },
    }),
  },
});

export default theme