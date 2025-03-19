import { VStack, Text, HStack, IconButton, Box, Avatar, Image, Button, Input } from "@chakra-ui/react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BiComment, BiReply } from "react-icons/bi";
import { FiEdit, FiTrash2, FiCheck, FiX } from "react-icons/fi";
import React, { useState, useEffect } from "react";
import { toggle_like, fetch_comments, add_comment, edit_comment, delete_comment, toggle_comment_like, get_comment_reply, add_reply } from "../api/endpoints";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../constants/constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Post({ id, username, description, formatted_data, likes_count, liked, profile_image, image, comment_count }) {
    const [clientLiked, setClientLiked] = useState(liked);
    const [likes, setLikes] = useState(likes_count);
    const [expanded, setExpanded] = useState(false);
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState("");
    const [showComments, setShowComments] = useState(false);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editedText, setEditedText] = useState("");
    const [replyText, setReplyText] = useState("");
    const [replyingToCommentId, setReplyingToCommentId] = useState(null);
    const [replies, setReplies] = useState({});
    const [loadingRepliesFor, setLoadingRepliesFor] = useState(true);
    const [showReplies,setShowReplies]=useState(false)

    const navigate = useNavigate();
    const user_data = JSON.parse(localStorage.getItem("userdata"));
    const current_user = user_data.username;

    useEffect(() => {
        if (showComments) {
            loadComments();
        }
    }, [showComments]);

    const handleLike = async () => {
        const data = await toggle_like(id);
        if (data.now_liked) {
            setClientLiked(true);
            setLikes((prev) => prev + 1);
        } else {
            setClientLiked(false);
            setLikes((prev) => prev - 1);
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

    const handleEditSave = async (id, commentId) => {
        await edit_comment(id, commentId, editedText);
        setComments(
            comments.map((comment) =>
                comment.id === commentId ? { ...comment, text: editedText } : comment
            )
        );
        setEditingCommentId(null);
    };

    const handleDelete = async (id, commentId) => {
        await delete_comment(id, commentId);
        setComments(comments.filter((comment) => comment.id !== commentId));
    };

    const handleAvatarClick = () => {
        navigate(`/${username}`);
    };

    const handleCommentLike = async (commentId) => {
        const data = await toggle_comment_like(id, commentId);
        setComments(
            comments.map((comment) =>
                comment.id === commentId ? { ...comment, liked: data.liked, like_count: data.like_count } : comment
            )
        );
    };

    const handleReplySubmit = async (commentId) => {
        if (!replyText.trim()) return;
        const newReply = await add_reply(id, commentId, replyText);
        setReplies((prevReplies) => ({
            ...prevReplies,
            [commentId]: [...(prevReplies[commentId] || []), newReply],
        }));
        setReplyText("");
        setReplyingToCommentId(null);
    };


    const loadReplies = async (commentId) => {
        setShowReplies(!showReplies)
        if (showReplies){
            if (replies[commentId]) return; // Don't reload if already loaded
            setLoadingRepliesFor(commentId);
            const data = await get_comment_reply(id, commentId);
            setReplies((prevReplies) => ({
                ...prevReplies,
                [commentId]: data,
        }));
        setLoadingRepliesFor(false);
        }
        
    };
    const toggleReplyInput = (commentId) => {
        // Toggle the reply input field for the selected comment
        setReplyingToCommentId((prevId) => (prevId === commentId ? null : commentId));
    };

    return (
        <VStack w="380px" borderRadius="16px" p="3" boxShadow="lg" spacing="3" bg="white">
            <HStack w="100%" bg="gray.100" borderTopRadius="12px" p="6px 16px">
                <Avatar size="md" src={`${SERVER_URL}${profile_image}`} name={username} cursor="pointer" onClick={handleAvatarClick} />
                <Text fontWeight="bold" fontSize="md">@{username}</Text>
            </HStack>

            <Box w="100%" px="4">
                <Text fontSize="md" color="gray.700">
                    {expanded ? description : `${description.slice(0, 100)}...`}
                </Text>
                {description.length > 100 && (
                    <Button variant="link" color="blue.500" size="sm" onClick={() => setExpanded(!expanded)}>
                        {expanded ? "See Less" : "See More"}
                    </Button>
                )}
            </Box>

            <Box w="100%">
                <Image src={`${SERVER_URL}${image}`} borderRadius="8px" />
            </Box>

            <HStack w="100%" justifyContent="space-between" p="6px 16px" bg="gray.50" borderBottomRadius="12px">
                <Text fontSize="xs" color="gray.500">{formatted_data}</Text>
                <HStack>
                    <IconButton icon={clientLiked ? <AiFillHeart color="red" /> : <AiOutlineHeart />} onClick={handleLike} variant="ghost" size="md" _hover={{ transform: "scale(1.1)" }} />
                    <Text fontSize="sm">{likes} Likes</Text>
                    <IconButton icon={<BiComment />} onClick={() => setShowComments(!showComments)} variant="ghost" size="md" _hover={{ transform: "scale(1.1)" }} />
                    <Text fontSize="sm">{comment_count} Comments</Text>
                </HStack>
            </HStack>

            {showComments && (
                <VStack w="100%" align="start" p="3">
                    <Text fontWeight="bold">Comments:</Text>

                    {/* Input Field for Writing a Comment */}
                    <HStack w="100%">
                        <Avatar size="sm" src={`${SERVER_URL}${profile_image}`} />
                        <Input
                            placeholder="Write a comment..."
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            size="sm"
                            w="100%"
                        />
                        <Button colorScheme="blue" size="sm" onClick={handleCommentSubmit}>
                            Comment
                        </Button>
                    </HStack>

                    {/* Displaying Existing Comments */}
                    <Box w="100%" maxH="200px" overflowY="auto">
                        {comments.map((comment) => (
                            <VStack key={comment.id} align="start" spacing="2" p="2">
                                <HStack w="100%">
                                    <Avatar size="sm" src={`${SERVER_URL}${comment.user.profile_image}`} />
                                    <Box w="100%">
                                        <HStack justifyContent="space-between">
                                            <Text fontWeight="bold">@{comment.user}</Text>
                                            {comment.user === current_user && (
                                                <HStack>
                                                    {editingCommentId === comment.id ? (
                                                        <>
                                                            <IconButton icon={<FiCheck />} size="sm" onClick={() => handleEditSave(id, comment.id)} />
                                                            <IconButton icon={<FiX />} size="sm" onClick={() => setEditingCommentId(null)} />
                                                        </>
                                                    ) : (
                                                        <>
                                                            <IconButton icon={<FiEdit />} size="sm" onClick={() => handleEditClick(comment)} />
                                                            <IconButton icon={<FiTrash2 />} size="sm" color="red" onClick={() => handleDelete(id, comment.id)} />
                                                        </>
                                                    )}
                                                </HStack>
                                            )}
                                        </HStack>
                                        {editingCommentId === comment.id ? (
                                            <Input value={editedText} onChange={(e) => setEditedText(e.target.value)} size="sm" />
                                        ) : (
                                            <HStack justify="space-between" w="100%">
                                                <Text>{comment.text}</Text>
                                                <HStack mt="1" spacing="3">
                                                    <IconButton icon={comment.liked ? <AiFillHeart color="red" /> : <AiOutlineHeart />} size="xs" cursor="pointer" onClick={() => handleCommentLike(comment.id)} />
                                                    <Text fontSize="xs">{comment.like_count} Likes</Text>
                                                    <IconButton
                                                        icon={<BiReply size="16px" color="gray" />}
                                                        size="xs"
                                                        cursor="pointer"
                                                        onClick={() => toggleReplyInput(comment.id)}
                                                    />
                                                    <Text fontSize="xs" cursor="pointer" onClick={() => loadReplies(comment.id)}>
                                                        {comment.reply_count} Replies
                                                    </Text>
                                                </HStack>
                                            </HStack>
                                        )}
                                    </Box>
                                </HStack>
                                {replies[comment.id] && (
                                    <VStack w="100%" pl="12" align="start">
                                        {replies[comment.id].map((reply) => (
                                            <HStack key={reply.id} w="100%">
                                                <Avatar size="sm" src={`${SERVER_URL}${reply.user.profile_image}`} />
                                                <Box>
                                                    <Text fontWeight="bold">@{reply.user}</Text>
                                                    <Text>{reply.text}</Text>
                                                </Box>
                                            </HStack>
                                        ))}
                                        {replyingToCommentId === comment.id && (
                                            <HStack w="100%" pl="12">
                                                <Input
                                                    placeholder="Write a reply..."
                                                    value={replyText}
                                                    onChange={(e) => setReplyText(e.target.value)}
                                                    size="sm"
                                                    w="100%"
                                                />
                                                <Button colorScheme="blue" size="sm" onClick={() => handleReplySubmit(comment.id)}>
                                                    Reply
                                                </Button>
                                            </HStack>
                                        )}
                                    </VStack>
                                )}
                            </VStack>
                        ))}
                    </Box>
                </VStack>
            )}
        </VStack>
    );
}

export default Post;