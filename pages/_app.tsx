import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { extendTheme, ChakraProvider } from '@chakra-ui/react'
// import { ChakraProvider } from '@chakra-ui/react/dist/chakra-provider'

const theme = extendTheme({
  colors:{
    biru:{
      mainBg:"hsl(222, 26%, 31%)",
      keypadBg: "hsl(223, 31%, 20%)",
      screenBg: "hsl(224, 36%, 15%)",
      keyBgBlue: "hsl(225, 21%, 49%)",
      keyShadowBlue:"hsl(224, 28%, 35%)",
      keyBgRed:"hsl(6, 63%, 50%)",
      keyShadowRed : "hsl(6, 70%, 34%)",
      keyBgGrey: "hsl(30, 25%, 89%)",
      keyShadowGrey: "hsl(28, 16%, 65%)",
      textBlue: "hsl(221, 14%, 31%)",
      white:"hsl(0, 0%, 100%)"
    }
  },breakpoints:{
    sm:'376px'
  }
})

export default function App({ Component, pageProps }: AppProps) {
  return <ChakraProvider theme={theme}>
    <Component {...pageProps} />
  </ChakraProvider>
}
