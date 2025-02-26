import { Button, Flex, FormControl, FormLabel, Heading, Textarea, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { create_post } from "../api/endpoints";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
    const [description,setDescription]=useState('')
    const nav=useNavigate()

    const handleSubmit = async () => {
        try {
            await create_post(description);
            setDescription('');
            nav('/')
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };
    
    return (
        <Flex minH="100vh" align="center" justify="center" bg="gray.100">
            <VStack
                spacing={6}
                p={8}
                bg="white"
                boxShadow="xl"
                borderRadius="lg"
                w={{ base: "90%", md: "400px" }}
            >
                <Heading size="lg" color="teal.600">Create Post</Heading>
                <FormControl>
                    <FormLabel fontWeight="bold">Description</FormLabel>
                    <Textarea
                        placeholder="Write something..."
                        focusBorderColor="teal.400"
                        resize="both" //  Allows both horizontal & vertical resizing
                        minH="100px" //  Minimum height
                        maxH="300px" //  Prevents it from growing too large
                        w="full" //  Stretches to full width of the form
                        value={description}
                        onChange={(e)=>setDescription(e.target.value)}
                    />
                </FormControl>
                <Button colorScheme="teal" size="lg" w="full" onClick={handleSubmit}>Create Post</Button>
            </VStack>
        </Flex>
    );
};

export default CreatePost;
