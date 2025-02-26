import { Text, Flex, HStack, IconButton, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { IoPersonCircleOutline } from "react-icons/io5";
import { IoIosAddCircle } from "react-icons/io";
import { IoMdHome } from "react-icons/io";
import { get_username } from "../api/endpoints";
import { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { RiSettings2Line } from "react-icons/ri";



const Navbar = () => {
  const navigate = useNavigate();

  const handleNavigation = (route) => {
    navigate(`/${route}`);
  };

  const [username,setUsername]=useState('')

  const fetchData=async()=>{
    const data=await get_username()
    setUsername(data)
  }
  useEffect(()=>{
    try{
        fetchData()
    }catch{
        return({'error':'error fetching data'})
    }
  },[])

  return (
    <Flex
      w="100%"
      h="60px"
      bgGradient="linear(to-r, blue.700, blue.500)"
      justifyContent="center"
      alignItems="center"
      position="fixed"
      top="0"
      zIndex="1000"
      boxShadow="md"
    >
      <HStack w="90%" maxW="1200px" justifyContent="space-between" color="white">
        {/* Logo */}
        <Text fontSize="24px" fontWeight="bold" cursor="pointer">
          SocialHub
        </Text>

        {/* Icons */}
        <HStack gap="20px">
          <IconButton
            aria-label="Home"
            icon={<IoMdHome size="24px" />}
            variant="ghost"
            color="white"
            _hover={{ bg: "blue.600" }}
            onClick={() => handleNavigation("")}
          />
          <IconButton
            aria-label="Create Post"
            icon={<IoIosAddCircle size="24px" />}
            variant="ghost"
            color="white"
            _hover={{ bg: "blue.600" }}
            onClick={() => handleNavigation("create/post")}
          />
          <IconButton
            aria-label="Profile"
            icon={<IoPersonCircleOutline size="24px" />}
            variant="ghost"
            color="white"
            _hover={{ bg: "blue.600" }}
            onClick={() => handleNavigation(`${username}`)}
          />
          <IconButton
            aria-label="Profile"
            icon={<IoSearchSharp size='24px'/>}
            variant="ghost"
            color="white"
            _hover={{ bg: "blue.600" }}
            onClick={() => handleNavigation(`search`)}
          />
          <IconButton
            aria-label="Profile"
            icon={<RiSettings2Line size='24px'/>}
            variant="ghost"
            color="white"
            _hover={{ bg: "blue.600" }}
            onClick={() => handleNavigation(`setting`)}
          />
        </HStack>
      </HStack>
    </Flex>
  );
};

export default Navbar;
