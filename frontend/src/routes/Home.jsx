import { Flex, Heading, VStack, Text, Spinner, Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { get_post } from "../api/endpoints";
import Post from "../components/Post";

const Home = () => {
    const [posts, setPosts] = useState([]); // Store posts
    const [loading, setLoading] = useState(false); // Track loading state
    const [nextPage, setNextPage] = useState(1); // Track current page
    const [hasMore, setHasMore] = useState(true); // Track if more posts exist

    // Function to fetch posts
    const fetchData = async () => {
        if (!hasMore) return;

        setLoading(true);
        try {
            const response = await get_post(nextPage);
            setPosts(prevPosts => {
                const newPosts = response.results.filter(post => !prevPosts.some(p => p.id === post.id));
                return [...prevPosts, ...newPosts]; // Append only unique posts
            }); // Append new posts
            setNextPage(response.next ? nextPage + 1 : null); // Update next page
            setHasMore(!!response.next); // Check if more pages exist
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
        setLoading(false);
    };

    // Fetch initial posts
    useEffect(() => {
        fetchData();
    }, []);
    for (const post of posts){
        console.log(post.profile_image)
    }
    return (
        <Flex w="100%" justifyContent="center" pt="20px">
            <VStack maxW="600px" w="100%" spacing={6} alignItems="start">
                <Heading color="blue.500" fontSize="2xl">
                    Latest Posts
                </Heading>

                {posts.length > 0 ? (
                    posts.map((post) => (
                        <Post
                            key={post.id}
                            id={post.id}
                            profile_image={post.profile_image}
                            username={post.username}
                            description={post.description}
                            formatted_data={post.formatted_data}
                            liked={post.liked}
                            likes_count={post.likes_count}
                            image={post.image}
                        />
                    ))
                ) : (
                    !loading && <Text color="gray.500">No posts available</Text>
                )}

                {/* Load More Button */}
                {hasMore && !loading && (
                    <Button onClick={fetchData} colorScheme="blue" w="100%">
                        Load More
                    </Button>
                )}

                {/* Loading Spinner */}
                {loading && <Spinner size="lg" color="blue.500" />}
            </VStack>
        </Flex>
    );
};

export default Home;
