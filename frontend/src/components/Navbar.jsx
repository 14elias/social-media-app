import {
  Text,
  Flex,
  HStack,
  IconButton,
  Box,
  useDisclosure,
  VStack,
  Collapse,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { IoPersonCircleOutline, IoSearchSharp } from "react-icons/io5";
import { IoIosAddCircle } from "react-icons/io";
import { IoMdHome } from "react-icons/io";
import { RiSettings2Line } from "react-icons/ri";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { get_username } from "../api/endpoints";

const Navbar = () => {
  const navigate = useNavigate();
  const { isOpen, onToggle } = useDisclosure();
  const [username, setUsername] = useState("");

  const fetchData = async () => {
    const data = await get_username();
    setUsername(data);
  };

  useEffect(() => {
    try {
      fetchData();
    } catch {
      return { error: "error fetching data" };
    }
  }, []);

  const handleNavigation = (route) => {
    navigate(`/${route}`);
  };

  return (
    <Box
      w="100%"
      bgGradient="linear(to-r, blue.700, blue.500)"
      color="white"
      position="fixed"
      top="0"
      zIndex="1000"
      boxShadow="md"
    >
      {/* Desktop and Mobile Navbar */}
      <Flex
        w="100%"
        h="60px"
        justifyContent="space-between"
        alignItems="center"
        px="4"
        maxW="1200px"
        mx="auto"
      >
        {/* Logo */}
        <Text
          fontSize="24px"
          fontWeight="bold"
          cursor="pointer"
          onClick={() => handleNavigation("")}
        >
          SocialHub
        </Text>

        {/* Desktop Menu */}
        <HStack
          spacing="4"
          display={{ base: "none", md: "flex" }}
          alignItems="center"
        >
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
            aria-label="Search"
            icon={<IoSearchSharp size="24px" />}
            variant="ghost"
            color="white"
            _hover={{ bg: "blue.600" }}
            onClick={() => handleNavigation("search")}
          />
          <IconButton
            aria-label="Settings"
            icon={<RiSettings2Line size="24px" />}
            variant="ghost"
            color="white"
            _hover={{ bg: "blue.600" }}
            onClick={() => handleNavigation("setting")}
          />
        </HStack>

        {/* Mobile Menu Toggle */}
        <IconButton
          display={{ base: "flex", md: "none" }}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          variant="ghost"
          color="white"
          onClick={onToggle}
        />
      </Flex>

      {/* Mobile Menu */}
      <Collapse in={isOpen} animateOpacity>
        <VStack
          bg="blue.600"
          spacing="4"
          py="4"
          display={{ md: "none" }}
          alignItems="start"
          px="4"
        >
          <IconButton
            aria-label="Home"
            icon={<IoMdHome size="24px" />}
            variant="ghost"
            color="white"
            _hover={{ bg: "blue.700" }}
            onClick={() => handleNavigation("")}
          />
          <IconButton
            aria-label="Create Post"
            icon={<IoIosAddCircle size="24px" />}
            variant="ghost"
            color="white"
            _hover={{ bg: "blue.700" }}
            onClick={() => handleNavigation("create/post")}
          />
          <IconButton
            aria-label="Profile"
            icon={<IoPersonCircleOutline size="24px" />}
            variant="ghost"
            color="white"
            _hover={{ bg: "blue.700" }}
            onClick={() => handleNavigation(`${username}`)}
          />
          <IconButton
            aria-label="Search"
            icon={<IoSearchSharp size="24px" />}
            variant="ghost"
            color="white"
            _hover={{ bg: "blue.700" }}
            onClick={() => handleNavigation("search")}
          />
          <IconButton
            aria-label="Settings"
            icon={<RiSettings2Line size="24px" />}
            variant="ghost"
            color="white"
            _hover={{ bg: "blue.700" }}
            onClick={() => handleNavigation("setting")}
          />
        </VStack>
      </Collapse>
    </Box>
  );
};

export default Navbar;