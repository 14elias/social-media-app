import { VStack, Text, HStack, IconButton, Box, Avatar, Image, Button, Input } from "@chakra-ui/react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import { FiEdit, FiTrash2, FiCheck, FiX } from "react-icons/fi"; 
import React, { useState, useEffect } from "react";
import { toggle_like, fetch_comments, add_comment, edit_comment, delete_comment } from "../api/endpoints"; 
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../constants/constants";

function Post({ id, username, description, formatted_data, likes_count, liked, profile_image, image, comment_count }) {
    const [clientLiked, setClientLiked] = useState(liked);
    const [likes, setLikes] = useState(likes_count);
    const [expanded, setExpanded] = useState(false);
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState("");
    const [showComments, setShowComments] = useState(false);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editedText, setEditedText] = useState("");

    const navigate = useNavigate();
    const user_data=JSON.parse(localStorage.getItem('userdata'))
    const current_user=user_data.username
    console.log(current_user)

    useEffect(() => {
        if (showComments) {
            loadComments();
        }
    }, [showComments]);

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

    const loadComments = async () => {
        const data = await fetch_comments(id);
        setComments(data);
    };

    const handleCommentSubmit = async () => {
        if (!commentText.trim()) return;
        const newComment = await add_comment(id, commentText);
        setComments([...comments, newComment]);
        setCommentText("");
    };

    const handleEditClick = (comment) => {
        setEditingCommentId(comment.id);
        setEditedText(comment.text);
    };

    const handleEditSave = async (id,commentId) => {
        await edit_comment(id,commentId, editedText);
        setComments(comments.map(comment => 
            comment.id === commentId ? { ...comment, text: editedText } : comment
        ));
        setEditingCommentId(null);
    };

    const handleDelete = async (id,commentId) => {
        await delete_comment(id,commentId);
        setComments(comments.filter(comment => comment.id !== commentId));
    };

    const handleAvatarClick = () => {
        navigate(`/${username}`);
    };

    return (
        <VStack w="380px" h="auto" borderRadius="16px" p="3" boxShadow="lg" spacing="3" bg="white">
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

            {/* Description */}
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

            {/* Image */}
            <Box w="100%">
                <Image src={`${SERVER_URL}${image}`} borderRadius="8px" />
            </Box>

            {/* Like & Comment Buttons */}
            <HStack w="100%" justifyContent="space-between" p="6px 16px" bg="gray.50" borderBottomRadius="12px">
                <Text fontSize="xs" color="gray.500">{formatted_data}</Text>
                <HStack>
                    <IconButton
                        icon={clientLiked ? <AiFillHeart color="red" /> : <AiOutlineHeart />}
                        onClick={handleLike}
                        variant="ghost"
                        size="md"
                        _hover={{ transform: "scale(1.1)" }}
                    />
                    <Text fontSize="sm">{likes} {likes === 1 ? "Like" : "Likes"}</Text>
                    <IconButton
                        icon={<BiComment />}
                        onClick={() => setShowComments(!showComments)}
                        variant="ghost"
                        size="md"
                        _hover={{ transform: "scale(1.1)" }}
                    />
                    <Text fontSize="sm">{comment_count} {comment_count === 1 ? "Comment" : "Comments"}</Text>
                </HStack>
            </HStack>

            {/* Comment Section */}
            {showComments && (
                <VStack w="100%" align="start" p="3">
                    <Text fontWeight="bold">Comments:</Text>
                    <Box w="100%" maxH="200px" overflowY="auto">
                        {comments.map((comment) => (
                            <HStack key={comment.id} align="start" spacing="2" p="2">
                                <Avatar size="sm" src={`${SERVER_URL}${comment.user.profile_image}`} />
                                <Box w="100%">
                                    <HStack justifyContent="space-between">
                                        <Text fontWeight="bold">@{comment.user}</Text>
                                        {/* Edit & Delete Buttons */}
                                        <HStack>
                                            {comment.user==current_user && (editingCommentId === comment.id ? (
                                                <>
                                                    <IconButton icon={<FiCheck />} size="sm" onClick={() => handleEditSave(id,comment.id)} />
                                                    <IconButton icon={<FiX />} size="sm" onClick={() => setEditingCommentId(null)} />
                                                </>
                                            ) : (
                                                <> 
                                                    <IconButton icon={<FiEdit />} size="sm" onClick={() => handleEditClick(comment)} />
                                                    <IconButton icon={<FiTrash2 />} size="sm" color='red' onClick={() => handleDelete(id,comment.id)} />
                                                
                                                </>)
                                            )}
                                        </HStack>
                                    </HStack>

                                    {/* Edit Comment Field */}
                                    {editingCommentId === comment.id ? (
                                        <Input 
                                            value={editedText}
                                            onChange={(e) => setEditedText(e.target.value)}
                                            size="sm"
                                        />
                                    ) : (
                                        <Text>{comment.text}</Text>
                                    )}
                                </Box>
                            </HStack>
                        ))}
                    </Box>
                    {/* Add Comment Input */}
                    <HStack w="100%">
                        <Input 
                            placeholder="Write a comment..." 
                            value={commentText} 
                            onChange={(e) => setCommentText(e.target.value)}
                            size="sm"
                        />
                        <Button size="sm" colorScheme="blue" onClick={handleCommentSubmit}>
                            Comment
                        </Button>
                    </HStack>
                </VStack>
            )}
        </VStack>
    );
}

export default Post;
