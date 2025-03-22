import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    VStack,
    Box,
    Avatar,
    Text,
  } from "@chakra-ui/react";
  import { useState } from "react";
  import { logout, update_user_profile } from "../api/endpoints";
  import { useNavigate } from "react-router-dom";
  import { FaSignOutAlt } from "react-icons/fa";
  import { ToastContainer, toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
  
  const Setting = () => {
    const storage = JSON.parse(localStorage.getItem("userdata"));
    const [username, setUsername] = useState(storage ? storage.username : "");
    const [email, setEmail] = useState(storage ? storage.email : "");
    const [firstname, setFirstname] = useState(storage ? storage.first_name : "");
    const [lastname, setLastname] = useState(storage ? storage.last_name : "");
    const [bio, setBio] = useState(storage ? storage.bio : "");
    const [profileImage, setProfileImage] = useState(
      storage ? storage.profile_image : ""
    );
  
    const nav = useNavigate();
  
    const handleLogout = async () => {
      await logout();
      nav("/login");
    };
  
    const handleUpdate = async () => {
      try {
        await update_user_profile({
          username,
          email,
          first_name: firstname,
          last_name: lastname,
          bio,
          profile_image: profileImage,
        });
        localStorage.setItem(
          "userdata",
          JSON.stringify({
            username,
            email,
            first_name: firstname,
            last_name: lastname,
            bio,
          })
        );
        toast.success("Updated successfully", {
          position: "top-right",
          autoClose: 1000,
        });
        nav(`/${username}`);
      } catch {
        toast.error("Updating failed");
      }
    };
  
    return (
      <Flex justify="center" align="center" minH="100vh" bg="gray.100" p={4}>
        <Box
          bg="white"
          p={8}
          rounded="lg"
          shadow="lg"
          w={{ base: "90%", md: "50%" }}
          maxW="600px"
        >
          <VStack spacing={6} align="stretch">
            {/* Page Heading */}
            <Heading size="lg" textAlign="center" color="teal.600">
              Settings
            </Heading>
  
            {/* Profile Picture */}
            <VStack spacing={4} align="center">
              <Avatar
                size="xl"
                src={profileImage ? URL.createObjectURL(profileImage) : ""}
                name={username}
                bg="teal.500"
              />
              <FormControl>
                <FormLabel fontWeight="bold" color="gray.700">
                  Profile Picture
                </FormLabel>
                <Input
                  type="file"
                  p={1}
                  border="1px solid gray.300"
                  onChange={(e) => setProfileImage(e.target.files[0])}
                />
              </FormControl>
            </VStack>
  
            {/* Form Fields */}
            <VStack spacing={4}>
              <FormControl>
                <FormLabel fontWeight="bold" color="gray.700">
                  Username
                </FormLabel>
                <Input
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                  focusBorderColor="teal.400"
                  value={username}
                />
              </FormControl>
              <FormControl>
                <FormLabel fontWeight="bold" color="gray.700">
                  Email
                </FormLabel>
                <Input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  focusBorderColor="teal.400"
                  value={email}
                />
              </FormControl>
              <FormControl>
                <FormLabel fontWeight="bold" color="gray.700">
                  First Name
                </FormLabel>
                <Input
                  type="text"
                  onChange={(e) => setFirstname(e.target.value)}
                  focusBorderColor="teal.400"
                  value={firstname}
                />
              </FormControl>
              <FormControl>
                <FormLabel fontWeight="bold" color="gray.700">
                  Last Name
                </FormLabel>
                <Input
                  type="text"
                  onChange={(e) => setLastname(e.target.value)}
                  focusBorderColor="teal.400"
                  value={lastname}
                />
              </FormControl>
              <FormControl>
                <FormLabel fontWeight="bold" color="gray.700">
                  Bio
                </FormLabel>
                <Input
                  type="text"
                  onChange={(e) => setBio(e.target.value)}
                  focusBorderColor="teal.400"
                  value={bio}
                />
              </FormControl>
            </VStack>
  
            {/* Save Changes Button */}
            <Button
              colorScheme="teal"
              w="full"
              size="lg"
              onClick={handleUpdate}
              _hover={{ bg: "teal.500" }}
            >
              Save Changes
            </Button>
  
            {/* Logout Button */}
            <Button
              colorScheme="red"
              variant="solid"
              leftIcon={<FaSignOutAlt />}
              onClick={handleLogout}
              _hover={{ bg: "red.600" }}
              _active={{ bg: "red.700" }}
              borderRadius="md"
              p={3}
              fontSize="md"
              w="fit-content"
              alignSelf="center"
            >
              Logout
            </Button>
          </VStack>
        </Box>
        <ToastContainer />
      </Flex>
    );
  };
  
  export default Setting;