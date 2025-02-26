import { VStack, Text, HStack, Flex, IconButton, Box } from "@chakra-ui/react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import { toggle_like } from "../api/endpoints";

function Post({id, username, description, formatted_data, likes_count,liked }) {
    const [clientliked, setClientLiked] = useState(liked);
    const [likes, setLikes] = useState(likes_count);

    const handleLike = async () => {
        const data= await toggle_like(id)
        if (data.now_liked){
            setClientLiked(true)
            setLikes(prev=>prev+1)
        }
        else{
            setClientLiked(false)
            setLikes(prev=>prev-1)
        }
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
            {/* Username Section (Smaller & Compact) */}
            <HStack w="100%" bg="gray.100" borderTopRadius="12px" p="6px 16px">
                <Text fontWeight="bold" fontSize="md">@{username}</Text>
            </HStack>

            {/* Post Content */}
            <Flex w="100%" minH="300px" justifyContent="center" alignItems="center" px="4">
                <Text fontSize="md" textAlign="center" color="gray.700">{description}</Text>
            </Flex>

            {/* Like Button & Date (More Compact) */}
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
