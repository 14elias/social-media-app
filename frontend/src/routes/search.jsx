import {
    Button,
    Heading,
    HStack,
    Input,
    Text,
    VStack,
    Box,
    Avatar,
    Flex,
  } from "@chakra-ui/react";
  import { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import { search_user } from "../api/endpoints";
  import { SERVER_URL } from "../constants/constants";
  import { FaSearch } from "react-icons/fa";
  
  const SearchUser = () => {
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([]);
    const [searchPerformed, setSearchPerformed] = useState(false);
  
    const handleSearch = async () => {
      if (search.trim() === "") {
        setUsers([]);
        setSearchPerformed(false);
        return;
      }
      setSearchPerformed(true);
      try {
        const response = await search_user(search);
        setUsers(response);
        setSearch("");
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]);
      }
    };
  
    return (
      <VStack w="full" spacing={6} pt="30px" bg="gray.100" minH="100vh" align="center">
        {/* Page Heading */}
        <Heading size="lg" color="blue.600">
          Search User
        </Heading>
  
        {/* Search Bar */}
        <HStack w="full" maxW="500px" spacing={4}>
          <Input
            placeholder="Search users..."
            value={search || ""}
            onChange={(e) => setSearch(e.target.value)}
            bg="white"
            borderRadius="full"
            _focus={{ bg: "white", borderColor: "blue.400" }}
            shadow="sm"
          />
          <Button
            onClick={handleSearch}
            colorScheme="blue"
            borderRadius="full"
            leftIcon={<FaSearch />}
            _hover={{ bg: "blue.500" }}
          >
            Search
          </Button>
        </HStack>
  
        {/* Results */}
        <VStack w="full" spacing={4} align="stretch" maxW="600px" px={4}>
          {users.length === 0 && searchPerformed ? (
            <Text color="gray.500" textAlign="center">
              User does not exist 😢
            </Text>
          ) : (
            users.map((user) => (
              <UserProfile
                key={user.username}
                username={user.username}
                profile_image={user.profile_image}
                first_name={user.first_name}
                last_name={user.last_name}
              />
            ))
          )}
        </VStack>
      </VStack>
    );
  };
  
  const UserProfile = ({ username, profile_image, first_name, last_name }) => {
    const nav = useNavigate();
    const handleAvatarClick = () => {
      nav(`/${username}`);
    };
  
    return (
      <Box
        w="full"
        p={4}
        borderRadius="lg"
        bg="white"
        shadow="md"
        _hover={{ shadow: "lg", transform: "scale(1.02)", bg: "gray.50" }}
        transition="0.2s"
      >
        <Flex align="center">
          <Avatar
            size="md"
            src={`${SERVER_URL}${profile_image}`}
            name={username}
            onClick={handleAvatarClick}
            cursor="pointer"
          />
          <Box ml={4}>
            <Text fontWeight="bold" fontSize="lg" color="gray.800">
              {first_name} {last_name}
            </Text>
            <Text color="gray.500" fontSize="sm">
              @{username}
            </Text>
          </Box>
        </Flex>
      </Box>
    );
  };
  
  export default SearchUser;