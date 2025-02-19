import {Text,Flex,HStack} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { IoPersonCircleOutline } from "react-icons/io5";

const Navbar=()=>{

   const navigate=useNavigate();
   const handleNavigation=(route)=>{
    navigate(`/${route}`)
}
    return (
        <Flex w='100%' h='90%' bg='blue.600' justifyContent='center' alignItems='center'>
            <HStack w='80%' justifyContent='space-between'color='white' >
                <Text fontSize='24px' fontWeight='bold'>SocialHub</Text>
                <HStack>
                   <Text onClick={(route)=>handleNavigation('/elias')} cursor={'pointer'}><IoPersonCircleOutline size='20px'/></Text> 
                </HStack>
            </HStack>
        </Flex>
    )
}

export default Navbar