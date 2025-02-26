import { useState } from "react";
import { create_user } from "../api/endpoints";
import { useNavigate } from "react-router-dom";
import { VStack, Flex, FormLabel, Button, FormControl, Input, Heading, Box, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [error, setError] = useState("");

    const nav = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            try {
                const result = await create_user(username, password, email, firstname, lastname);
                if (result.error) {
                    setError(result.error);
                } else {
                    nav("/login");
                }
            } catch (error) {
                console.error("Error creating user:", error);
                setError("Failed to create user. Please try again.");
            }
        } else {
            setError("Passwords do not match.");
        }
    };
    const handleNav=()=>{
        nav('/login')
    }

    return (
        <Flex justify="center" align="center" minHeight="100vh" bg="gray.100" p={4}>
            <Box
                p={8}
                boxShadow="lg"
                bg="white"
                borderRadius="lg"
                width={{ base: "100%", sm: "80%", md: "60%", lg: "40%" }}
                maxWidth="500px"
            >
                <Heading size="lg" textAlign="center" mb={4} color='blue.600'>Register</Heading>

                {error && <Text color="red.500" textAlign="center" mb={3}>{error}</Text>}

                <VStack spacing={4} as="form" onSubmit={handleSubmit} width="100%">
                    <FormControl>
                        <FormLabel>First Name</FormLabel>
                        <Input 
                            type="text" 
                            placeholder="Enter your first name" 
                            value={firstname} 
                            onChange={(e) => setFirstname(e.target.value)}
                            focusBorderColor="blue.500"
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Last Name</FormLabel>
                        <Input 
                            type="text" 
                            placeholder="Enter your last name" 
                            value={lastname} 
                            onChange={(e) => setLastname(e.target.value)}
                            focusBorderColor="blue.500"
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Username</FormLabel>
                        <Input 
                            type="text" 
                            placeholder="Choose a username" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)}
                            focusBorderColor="blue.500"
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input 
                            type="email" 
                            placeholder="Enter your email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            focusBorderColor="blue.500"
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Password</FormLabel>
                        <Input 
                            type="password" 
                            placeholder="Create a password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            focusBorderColor="blue.500"
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Confirm Password</FormLabel>
                        <Input 
                            type="password" 
                            placeholder="Confirm password" 
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            focusBorderColor="blue.500"
                        />
                    </FormControl>
                    <VStack w='100%' gap='10px'>
                    <Button type="submit" colorScheme="green" width="full" mt={4}>
                        Register
                    </Button>
                    <Text onClick={handleNav} cursor='pointer' color='gray.600'>already have an account? login</Text>
                    </VStack>
                </VStack>
            </Box>
        </Flex>
    );
};

export default Register;
