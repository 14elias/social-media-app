import { VStack, Flex, FormLabel, Button, FormControl, Input, Heading, Box ,Text} from "@chakra-ui/react";  
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
function Login() {
    const [username,setusername]=useState('')
    const [password,setpassword]=useState('')

    const nav=useNavigate()

    const {auth_login}=useAuth();
    const handlelogin=()=>{

        auth_login(username,password)
    }

    const handleNav=()=>{
      nav('/register')
    }

  return (
    <Flex align="center" justify="center" h="100vh" bg="gray.100">  
      <Box  
        w={{ base: "90%", md: "400px", lg: "500px" }}  // Wider on large screens  
        p={8}  
        boxShadow="xl"  
        borderRadius="lg"  
        bg="white"
      >
        <VStack spacing={6}>
          <Heading size="lg" color="blue.600">Login</Heading>  

          <FormControl>
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input id="username" type="text" placeholder="Enter your username" onChange={(e)=>setusername(e.target.value)}/>
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input id="password" type="password" placeholder="Enter your password" onChange={(e)=>setpassword(e.target.value)}/>
          </FormControl>
          <VStack w='100%' gap='10px'>
            <Button colorScheme="green" w="full" onClick={handlelogin}>Login</Button>  {/* Full-width button */}
            <Text onClick={handleNav} cursor='pointer' fontSize='16px' color='gray.600'>create new account? sign up</Text>
          </VStack>
          
        </VStack>
      </Box>
    </Flex>
  );
}

export default Login;
