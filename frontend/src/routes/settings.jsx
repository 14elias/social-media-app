import { Button, Flex, FormControl, FormLabel, Heading, Input, VStack, Box } from "@chakra-ui/react";
import {useState} from 'react'
import { logout, update_user_profile } from "../api/endpoints";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Setting = () => {

    const storage=JSON.parse(localStorage.getItem('userdata'))
    const [username,setUsername]=useState(storage? storage.username:'')
    const [email,setemail]=useState(storage? storage.email:'')
    const [firstname,setfirstname]=useState(storage? storage.first_name:'')
    const [lastname,setlastname]=useState(storage? storage.last_name:'')
    const [bio,setbio]=useState(storage? storage.bio:'')
    const [profileimage,setProfileImage]=useState(storage? storage.profile_image:'')

    const nav=useNavigate()

    const handlelogout=async()=>{
        await logout()
        nav('/login')
    }

    const handleupdate=async()=>{
        try{
            await update_user_profile({'username':username,'email':email,'first_name':firstname,'last_name':lastname,'bio':bio,'profile_image':profileimage})
            localStorage.setItem('userdata',JSON.stringify({'username':username,'email':email,'first_name':firstname,'last_name':lastname,'bio':bio,}))
            toast.success('updated successfully',{position:'top-right',autoClose:1000,})
            nav(`/${username}`)
        }catch{
            toast.error('updating failed')
        }
    }
    return (
        <Flex justify="center" align="center" minH="100vh" bg="gray.100" p={4}>
            <Box bg="white" p={8} rounded="lg" shadow="lg" w={{ base: "90%", md: "50%" }}>
                <VStack spacing={6} align="stretch">
                    <Heading size="lg" textAlign="center" color="teal.600">Settings</Heading>
                    <VStack spacing={4}>
                        <FormControl>
                            <FormLabel fontWeight="bold">Profile Picture</FormLabel>
                            <Input type='file' p={1} border="1px solid gray.300" onChange={(e)=>setProfileImage(e.target.files[0])}/>
                        </FormControl>
                        <FormControl>
                            <FormLabel fontWeight="bold">Username</FormLabel>
                            <Input type='text' onChange={(e)=>setUsername(e.target.value)}  focusBorderColor="teal.400" value={username}/>
                        </FormControl>
                        <FormControl>
                            <FormLabel fontWeight="bold">email</FormLabel>
                            <Input type='text' onChange={(e)=>setemail(e.target.value)}  focusBorderColor="teal.400" value={email}/>
                        </FormControl>
                        <FormControl>
                            <FormLabel fontWeight="bold">First Name</FormLabel>
                            <Input type='text' onChange={(e)=>setfirstname(e.target.value)} value={firstname} focusBorderColor="teal.400"/>
                        </FormControl>
                        <FormControl>
                            <FormLabel fontWeight="bold">Last Name</FormLabel>
                            <Input type='text' onChange={(e)=>setlastname(e.target.value)} value={lastname} focusBorderColor="teal.400"/>
                        </FormControl>
                        <FormControl>
                            <FormLabel fontWeight="bold">Bio</FormLabel>
                            <Input type='text' onChange={(e)=>setbio(e.target.value)} value={bio} focusBorderColor="teal.400"/>
                        </FormControl>
                        <Button colorScheme="teal" w="full" onClick={handleupdate}>Save Changes</Button>
                    </VStack>
                    <Button
                        colorScheme="red"
                        variant="solid"
                        leftIcon={<FaSignOutAlt />}
                        onClick={handlelogout}
                        _hover={{ bg: "red.600" }}
                        _active={{ bg: "red.700" }}
                        borderRadius="md"
                        p={3}
                        fontSize="md"
                        w="fit-content" // This makes the button wrap around its content
                        alignSelf="center" // Centers it within the VStack
                    >
                        Logout
                    </Button>
                </VStack>
            </Box>
        </Flex>
    );
};

export default Setting;
