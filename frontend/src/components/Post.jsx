import { VStack, Text, HStack, Flex, IconButton, Box, Avatar, Image, Button } from "@chakra-ui/react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import React, { useState } from "react";
import { toggle_like } from "../api/endpoints";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../constants/constants";

function Post({ id, username, description, formatted_data, likes_count, liked, profile_image, image }) {
    const [clientliked, setClientLiked] = useState(liked);
    const [likes, setLikes] = useState(likes_count);
    const [expanded, setExpanded] = useState(false);

    const handleLike = async () => {
        const data = await toggle_like(id);
        if (data.now_liked) {
            setClientLiked(true);
            setLikes(prev => prev + 1);
        } else {
            setClientLiked(false);
            setLikes(prev => prev - 1);
        }
    };

    const navigate = useNavigate();
    const handleAvatarClick = () => {
        navigate(`/${username}`);
    };

    return (
        <VStack
            w="380px"
            h="auto"
            borderRadius="16px"
            p="3"
            boxShadow="lg"
            spacing="3"
            bg="white"
        >
            {/* Username Section */}
            <HStack w="100%" bg="gray.100" borderTopRadius="12px" p="6px 16px">
                <Avatar 
                    size="md" 
                    src={`${SERVER_URL}${profile_image}`}  
                    name={username} 
                    cursor="pointer"
                    onClick={handleAvatarClick}
                />
                <Text fontWeight="bold" fontSize="md">@{username}</Text>
            </HStack>

            {/* Description (Truncated with "See More") */}
            <Box w="100%" px="4">
                <Text fontSize="md" color="gray.700">
                    {expanded ? description : `${description.slice(0, 100)}...`}
                </Text>
                {description.length > 100 && (
                    <Button 
                        variant="link" 
                        color="blue.500" 
                        size="sm" 
                        onClick={() => setExpanded(!expanded)}
                    >
                        {expanded ? "See Less" : "See More"}
                    </Button>
                )}
            </Box>

            {/* Image Section */}
            <Box w="100%">
                <Image src={`${SERVER_URL}${image}`} borderRadius="8px" />
            </Box>

            {/* Like Button & Date */}
            <HStack w="100%" justifyContent="space-between" p="6px 16px" bg="gray.50" borderBottomRadius="12px">
                <Text fontSize="xs" color="gray.500">{formatted_data}</Text>
                <HStack>
                    <IconButton
                        icon={clientliked ? <AiFillHeart color="red" /> : <AiOutlineHeart />}
                        onClick={handleLike}
                        variant="ghost"
                        size="md"
                        _hover={{ transform: "scale(1.1)" }}
                    />
                    <Text fontSize="sm">{likes} {likes === 1 ? "Like" : "Likes"}</Text>
                </HStack>
            </HStack>
        </VStack>
    );
}

export default Post;
