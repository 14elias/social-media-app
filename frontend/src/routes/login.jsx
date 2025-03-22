import {
  VStack,
  Flex,
  FormLabel,
  Button,
  FormControl,
  Input,
  Heading,
  Box,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function Login() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  const nav = useNavigate();

  const { auth_login } = useAuth();
  const handlelogin = () => {
    auth_login(username, password);
  };

  const handleNav = () => {
    nav("/register");
  };

  return (
    <Flex align="center" justify="center" h="100vh" bg="gray.100">
      <Box
        w={{ base: "90%", md: "400px", lg: "500px" }}
        p={8}
        boxShadow="xl"
        borderRadius="lg"
        bg="white"
      >
        <VStack spacing={6}>
          {/* Page Heading */}
          <Heading size="lg" color="blue.600">
            Login
          </Heading>

          {/* Username Input */}
          <FormControl>
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              onChange={(e) => setusername(e.target.value)}
              focusBorderColor="blue.500"
            />
          </FormControl>

          {/* Password Input */}
          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setpassword(e.target.value)}
              focusBorderColor="blue.500"
            />
          </FormControl>

          {/* Login Button and Signup Link */}
          <VStack w="100%" gap="10px">
            <Button
              colorScheme="blue"
              w="full"
              onClick={handlelogin}
              _hover={{ bg: "blue.600" }}
            >
              Login
            </Button>
            <Text
              onClick={handleNav}
              cursor="pointer"
              fontSize="16px"
              color="blue.500"
              _hover={{ textDecoration: "underline" }}
            >
              Create new account? Sign up
            </Text>
          </VStack>
        </VStack>
      </Box>
    </Flex>
  );
}

export default Login;