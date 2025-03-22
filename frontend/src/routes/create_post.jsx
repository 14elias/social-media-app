import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Textarea,
    VStack,
    Input,
    Box,
    Text,
    Icon,
  } from "@chakra-ui/react";
  import { useState } from "react";
  import { create_post } from "../api/endpoints";
  import { useNavigate } from "react-router-dom";
  import { FiImage } from "react-icons/fi";
  
  const CreatePost = () => {
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null); // To store the selected image file
    const nav = useNavigate();
  
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setImage(file); // Set the image to state
      }
    };
  
    const handleSubmit = async () => {
      try {
        const formData = new FormData();
        formData.append("description", description);
        if (image) {
          formData.append("image", image);
        }
  
        await create_post(formData); // Pass FormData to the API
        setDescription("");
        setImage(null); // Clear image after post submission
        nav("/"); // Navigate to home after posting
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
          {/* Page Heading */}
          <Heading size="lg" color="teal.600">
            Create Post
          </Heading>
  
          {/* Description Input */}
          <FormControl>
            <FormLabel fontWeight="bold" color="gray.700">
              Description
            </FormLabel>
            <Textarea
              placeholder="Write something..."
              focusBorderColor="teal.400"
              resize="none"
              minH="100px"
              maxH="300px"
              w="full"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormControl>
  
          {/* Image Upload Section */}
          <FormControl>
            <FormLabel fontWeight="bold" color="gray.700">
              Upload Image
            </FormLabel>
            <Flex
              align="center"
              justify="center"
              border="2px dashed"
              borderColor="teal.400"
              borderRadius="md"
              p={4}
              cursor="pointer"
              _hover={{ bg: "teal.50" }}
            >
              <Input
                type="file"
                accept="image/*" // Limit to image files
                onChange={handleImageChange}
                opacity="0"
                position="absolute"
                zIndex="-1"
              />
              <Icon as={FiImage} boxSize={6} color="teal.400" />
              <Text ml={2} color="teal.600" fontWeight="bold">
                Click to upload
              </Text>
            </Flex>
            {image && (
              <Box mt={2}>
                <Text fontWeight="bold" color="gray.700">
                  Image Selected:
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {image.name}
                </Text>
              </Box>
            )}
          </FormControl>
  
          {/* Submit Button */}
          <Button
            colorScheme="teal"
            size="lg"
            w="full"
            onClick={handleSubmit}
            _hover={{ bg: "teal.500" }}
          >
            Create Post
          </Button>
        </VStack>
      </Flex>
    );
  };
  
  export default CreatePost;