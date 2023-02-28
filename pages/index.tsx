import Head from 'next/head'
import Image from 'next/image'
import { League_Spartan } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Box, Center, Flex, VStack, Text, Circle, Grid, GridItem } from '@chakra-ui/react'
import { useState } from 'react'

const league = League_Spartan({weight:'700', subsets: ['latin'] })

const warna = {
  mainBg: [ "hsl(222, 26%, 31%)", "hsl(0, 0%, 90%)", "hsl(268, 75%, 9%)"],
  toggleBg: [ "hsl(223, 31%, 20%)", "hsl(0, 5%, 81%)", "hsl(268, 71%, 12%)"],
  toggle: ["hsl(6, 63%, 50%)", "hsl(25, 98%, 40%)", "hsl(176, 100%, 44%)"],
  calcBg: ["hsl(224, 36%, 15%)","hsl(0, 0%, 93%)", "hsl(268, 71%, 12%)"],
  numBg: ["hsl(30, 25%, 89%)", "hsl(45, 7%, 89%)","hsl(268, 47%, 21%)"],
  numShadow: ["hsl(28, 16%, 65%)","hsl(35, 11%, 61%)","hsl(290, 70%, 36%)"],
  funcBg: ["hsl(225, 21%, 49%)","hsl(185, 42%, 37%)","hsl(281, 89%, 26%)"],
  funcShadow: ["hsl(224, 28%, 35%)","hsl(185, 58%, 25%)","hsl(285, 91%, 52%)"],
  equalBg: ["hsl(6, 63%, 50%)","hsl(25, 98%, 40%)","hsl(176, 100%, 44%)"],
  equalShadow: ["hsl(6, 70%, 34%)","hsl(25, 99%, 27%)","hsl(177, 92%, 70%)"],
  textMain:["hsl(221, 14%, 31%)", "hsl(60, 10%, 19%)","hsl(52, 100%, 62%)"],
  // textWhite:["hsl(0, 0%, 100%)"],
  textEqu: ["hsl(0, 0%, 100%)","hsl(0, 0%, 100%)","hsl(198, 20%, 13%)"],
  white:"hsl(0, 0%, 100%)"
        }

const Tombol = ({value, rows, cols, jenis, tema, click}:
            {value:string, rows:number, cols:number, jenis:string, tema:number, click:()=>void}) =>{
  const bg = jenis =="number"? warna.numBg[tema]: jenis == "function"? warna.funcBg[tema]: warna.equalBg[tema];
  const shadow = jenis =="number"? warna.numShadow[tema]: jenis == "function"? warna.funcShadow[tema]: warna.equalShadow[tema];
  const clr = jenis =="number"? warna.textMain[tema]: jenis == "equal" && tema == 2? warna.textEqu[tema]: warna.white;
  const fs = jenis=="number" ? "32px" : "25px";
  return <GridItem as="button" bg={bg} color={clr} colSpan={cols} rowSpan={rows} 
          boxShadow={`0 5px ${shadow}`} borderRadius="5px" fontSize={fs}
          onClick={click}>
    <Text mb="-5px">{value}</Text>
  </GridItem>
}

export default function Home() {
  const [display, setDisplay] = useState('');
  const [opr, setOpr] = useState('');
  const [kalian, setKalian] = useState('');
  const [tema, setTema] = useState(0);
  function handleNum(x:string){
    // const onlyNum = display.replaceAll(",", "")
    // const koma = (onlyNum.length%3 == 0 && onlyNum.length > 0 && !onlyNum.includes(".")) ? ",":"";
    // const temp = (display+x).slice(0, (display+x).length -3)+koma+(display+x).slice(-3)
    const temp = display.replaceAll(',', '')+x
    // console.log(parseFloat("2,546"))
    const komma = temp.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    setDisplay(komma);
  }
  function handleOp(op:string){
    setDisplay(display+op)
    if(op == '+' || op == '-'){
      setOpr(opr+op)
    }else{
      setKalian(kalian+op)
    }
    
  }
  function doDelete(){
    const last = display.charAt(display.length-1)
    if(last.includes('x') || last.includes('/') || last.includes('+') || last.includes('-')){
      setOpr(opr.slice(0, opr.length-1))  
    }
    setDisplay(display.slice(0, display.length-1))
  }
  function doReset(){
    setDisplay('')
    setOpr('')
    setKalian('')
  }
  function calc(){
    // setDisplay(display.replaceAll(",",""))
    const addition = display.split(',').join('').split(/[+-]/)
    console.log(addition)
    // const plusminus = display.split(/[^+-]/)
    // console.log(plusminus)
    addition.forEach((val,idx)=>{
      // addition[idx]
      if(val.includes('x') || val.includes('/')){
        const angka = val.split(/[x\/]/)
        console.log('angka'+angka)
        const mult = kalian.split('')
        console.log(mult)
        let total:number = parseFloat(angka[0])

        mult.forEach((v,i)=>{
          if(v == 'x'){
            total*=parseFloat(angka[i+1])
          }else if(v == '/'){
            total/=parseFloat(angka[i+1])
          }
        })
        addition[idx] = total.toString();
      }
    })
    console.log(addition)
    let semua = parseFloat(addition[0])
    console.log(semua)
    const plusminus = opr.split('')
    console.log(plusminus)
    plusminus.forEach((val,idx) =>{
      if(val == '+'){
        semua+=parseFloat(addition[idx+1])
      }else if(val == '-'){
        semua-=parseFloat(addition[idx+1])
      }
    })
    console.log(semua)
    setDisplay(semua.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
    setOpr('')
    setKalian('')
  }
  function changeTheme(i:number){
    setTema(i)
  }
  return (
    <>
      <Head>
        <title>Calculator App</title>
        <meta name="description" content="Generated by Nida Nido" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/favicon-32x32.png" />
      </Head>
      <main className={league.className}>
        <Flex w={{base:'100%', sm:'100vw'}} h={{base:"100%", sm:'100vh'}} minH="100vh"
              flexFlow="column nowrap" justifyContent="center" alignItems="center"
              bg={warna.mainBg[tema]}
        >
          <VStack spacing={{base:"35", sm:"20px"}} w="90%" maxW="400px">
            <Flex justifyContent="space-between" color={tema == 0? warna.white: warna.textMain[tema]} w="100%">
              <Text fontSize={30}>calc</Text>
              <Flex alignItems="flex-end">
                <Text fontSize={14} lineHeight={1}>THEME</Text>
                <Box>
                  <Flex w="66px" h="20px"  p="3px" ml="20px">
                    <Center w="15px" >1</Center>
                    <Center w="15px" >2</Center>
                    <Center w="15px" >3</Center>
                  </Flex>
                  <Flex w="51px" h="21px" borderRadius={50} bg={warna.toggleBg[tema]} p="3px" ml="20px">
                    <Circle as="button" size="15px" 
                          onClick={()=>changeTheme(0)}
                          bg={tema == 0? warna.toggle[tema]: warna.toggleBg[tema]}></Circle>
                    <Circle as="button" size="15px" 
                          onClick={()=>changeTheme(1)}
                          bg={tema == 1? warna.toggle[tema]: warna.toggleBg[tema]}></Circle>
                    <Circle as="button" size="15px" 
                          onClick={()=>changeTheme(2)}
                          bg={tema == 2? warna.toggle[tema]: warna.toggleBg[tema]}></Circle>  
                  </Flex>
                </Box>
                
              </Flex>
            </Flex>
            <Box h="80px" w="100%" bg={warna.calcBg[tema]} 
                  p="20px" textAlign="right" borderRadius="10px" >
              <Text color={tema == 0? warna.white: warna.textMain[tema]} fontSize="40px">{display}</Text>
            </Box>
            <Grid templateRows="repeat(5, 1fr)" templateColumns="repeat(4, 1fr)"
                  gap="15px" w="100%" fontSize="32px" p="20px" bg={warna.toggleBg[tema]}
                  borderRadius="10px">
              <Tombol click={()=>handleNum("7")} value="7" rows={1} cols={1} jenis="number" tema={tema} />
              <Tombol click={()=>handleNum("8")} value="8" rows={1} cols={1} jenis="number" tema={tema} />
              <Tombol click={()=>handleNum("9")} value="9" rows={1} cols={1} jenis="number" tema={tema} />
              <Tombol click={()=>doDelete()} value="DEL" rows={1} cols={1} jenis="function" tema={tema} />
              <Tombol click={()=>handleNum("4")} value="4" rows={1} cols={1} jenis="number" tema={tema} />
              <Tombol click={()=>handleNum("5")} value="5" rows={1} cols={1} jenis="number" tema={tema} />
              <Tombol click={()=>handleNum("6")} value="6" rows={1} cols={1} jenis="number" tema={tema} />
              <Tombol click={()=>handleOp("+")} value="+" rows={1} cols={1} jenis="number" tema={tema} />
              <Tombol click={()=>handleNum("1")} value="1" rows={1} cols={1} jenis="number" tema={tema} />
              <Tombol click={()=>handleNum("2")} value="2" rows={1} cols={1} jenis="number" tema={tema} />
              <Tombol click={()=>handleNum("3")} value="3" rows={1} cols={1} jenis="number" tema={tema} />
              <Tombol click={()=>handleOp("-")} value="-" rows={1} cols={1} jenis="number" tema={tema} />
              <Tombol click={()=>handleNum(".")} value="." rows={1} cols={1} jenis="number" tema={tema} />
              <Tombol click={()=>handleNum("0")} value="0" rows={1} cols={1} jenis="number" tema={tema} />
              <Tombol click={()=>handleOp("/")} value="/" rows={1} cols={1} jenis="number" tema={tema} />
              <Tombol click={()=>handleOp("x")} value="x" rows={1} cols={1} jenis="number" tema={tema} />
              <Tombol click={()=>doReset()} value="RESET" rows={1} cols={2} jenis="function" tema={tema} />
              <Tombol click={()=>calc()} value="=" rows={1} cols={2} jenis="equal" tema={tema} />
            </Grid>
          </VStack>
        </Flex>
      </main>
    </>
  )
}
