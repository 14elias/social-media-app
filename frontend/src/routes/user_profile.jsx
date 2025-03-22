import {
    Text,
    Flex,
    Box,
    VStack,
    Heading,
    HStack,
    Image,
    Button,
    Avatar,
    Divider,
  } from "@chakra-ui/react";
  import { useState, useEffect } from "react";
  import { useNavigate } from "react-router-dom";
  import {
    get_user_post,
    get_user_profile_data,
    toggle_follow,
  } from "../api/endpoints";
  import { SERVER_URL } from "../constants/constants";
  import Post from "../components/Post";
  
  const UserProfile = () => {
    const get_user_name_from_url = () => {
      const url_split = window.location.pathname.split("/");
      return url_split[url_split.length - 1];
    };
  
    const [username, setusername] = useState(get_user_name_from_url());
  
    useEffect(() => {
      setusername(get_user_name_from_url());
    }, [username]);
  
    return (
      <Flex direction="column" w="100%" bg="gray.100" align="center" pb="50px">
        {/* Profile Header */}
        <Box w="100%" bg="blue.500" py="50px" color="white">
          <VStack spacing="20px" w="100%" maxW="1200px" mx="auto" px="4">
            <UserDetail username={username} />
          </VStack>
        </Box>
  
        {/* User Posts */}
        <Box w="100%" maxW="1200px" mt="30px" px="4">
          <UserPost username={username} />
        </Box>
      </Flex>
    );
  };
  
  const UserDetail = ({ username }) => {
    const [loading, setLoading] = useState(true);
    const [bio, setBio] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [followerCount, setFollowerCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
  
    const [isOurProfile, setIsOurProfile] = useState(false);
    const [following, setFollowing] = useState(false);
  
    useEffect(() => {
      const fetchdata = async () => {
        try {
          const data = await get_user_profile_data(username);
          console.log("API Response:", data); // Debugging
          setBio(data.bio);
          setProfileImage(data.profile_image);
          setFollowerCount(data.follower_count);
          setFollowingCount(data.following_count);
          setIsOurProfile(data.is_our_profile);
          setFollowing(data.following);
        } catch (error) {
          console.error("Error fetching user profile data:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchdata();
    }, []);
  
    const togglehandle = async () => {
      const data = await toggle_follow(username);
      if (data.now_following) {
        setFollowerCount((prev) => prev + 1);
        setFollowing(true);
      } else {
        setFollowerCount((prev) => prev - 1);
        setFollowing(false);
      }
    };
  
    const nav = useNavigate();
  
    const handleedit = () => {
      nav(`/setting`);
    };
  
    return (
      <Flex
        direction={{ base: "column", md: "row" }}
        align="center"
        w="100%"
        bg="white"
        p="6"
        borderRadius="lg"
        boxShadow="md"
        gap="20px" // Added spacing between avatar and text
      >
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <>
            {/* Avatar */}
            <Avatar
              src={`${SERVER_URL}${profileImage}`}
              name={username}
              size="2xl"
              border="4px solid"
              borderColor="blue.500"
            />
  
            {/* User Info */}
            <VStack
              align={{ base: "center", md: "start" }}
              spacing="10px"
              textAlign={{ base: "center", md: "left" }}
              w="100%"
            >
              {/* Username */}
              <Heading size="lg" color="blue.700">
                @{username}
              </Heading>
  
              {/* Followers and Following */}
              <HStack
                spacing="20px"
                justifyContent={{ base: "center", md: "start" }}
                w="100%"
                wrap="wrap" // Ensure proper wrapping on smaller screens
              >
                <VStack spacing="5px">
                  <Text fontWeight="bold" fontSize="lg" color="gray.800">
                    Followers
                  </Text>
                  <Text fontSize="md" color="gray.600">
                    {followerCount}
                  </Text>
                </VStack>
                <VStack spacing="5px">
                  <Text fontWeight="bold" fontSize="lg" color="gray.800">
                    Following
                  </Text>
                  <Text fontSize="md" color="gray.600">
                    {followingCount}
                  </Text>
                </VStack>
              </HStack>
  
              {/* Bio */}
              <Text color="gray.600" fontSize="md">
                {bio}
              </Text>
  
              {/* Buttons */}
              {isOurProfile ? (
                <Button colorScheme="blue" onClick={handleedit}>
                  Edit Profile
                </Button>
              ) : (
                <Button
                  colorScheme={following ? "red" : "blue"}
                  onClick={togglehandle}
                >
                  {following ? "Unfollow" : "Follow"}
                </Button>
              )}
            </VStack>
          </>
        )}
      </Flex>
    );
  };
  
  const UserPost = ({ username }) => {
    const [posts, setposts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const fetchdata = async () => {
        try {
          const post = await get_user_post(username);
          setposts(post);
        } catch {
          alert("error getting users post");
        } finally {
          setLoading(false);
        }
      };
  
      fetchdata();
    }, [username]);
  
    return (
      <VStack spacing="20px" align="start" w="100%">
        <Heading size="md" color="blue.600">
          Posts
        </Heading>
        <Divider />
        <Flex w="100%" wrap="wrap" gap="20px" justify="center">
          {loading ? (
            <Text>Loading...</Text>
          ) : (
            posts.map((post) => (
              <Post
                key={post.id}
                id={post.id}
                username={post.username}
                description={post.description}
                formatted_data={post.formatted_data}
                liked={post.liked}
                likes_count={post.likes_count}
                image={post.image}
                comment_count={post.comment_count}
              />
            ))
          )}
        </Flex>
      </VStack>
    );
  };
  
  export default UserProfile;