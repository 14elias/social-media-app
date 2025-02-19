import {Text,Flex,Box,VStack,Heading,HStack,Image,Button} from '@chakra-ui/react'
import {useState,useEffect} from 'react'
import { get_user_profile_data } from '../api/endpoints'
import { SERVER_URL } from '../constants/constants'

const UserProfile=()=>{

    const get_user_name_from_url=()=>{
        const url_split=window.location.pathname.split('/')
        return url_split[url_split.length-1]
    }
    
    const[username,setusername]=useState(get_user_name_from_url())

    useEffect(()=>{
        setusername(get_user_name_from_url())
    },[])
    return (
    <Flex w='100%' justifyContent='center'>
        <VStack w='75%'>
            <Box w='100%' mt='40px'>
                <UserDetail username={username}/>
            </Box>
        </VStack>
    </Flex>
    )
}


const UserDetail=({username})=>{
    const [loading,setLoading]=useState(true)
    const [bio,setBio]=useState('')
    const [profileImage,setProfileImage]=useState('')
    const [followerCount,setFollowerCount]=useState(0)
    const [followingCount,setFollowingCount]=useState(0)

    useEffect(()=>{
        const fetchdata = async () => {
            try{
                const data = await get_user_profile_data(username);
                setBio(data.bio)
                setProfileImage(data.profile_image)
                setFollowerCount(data.follower_count)
                setFollowingCount(data.following_count)
            }catch{
                console.log('error')
            }finally{
                setLoading(false)
            }
            
        }
        fetchdata()
    },[])
    return (
    <VStack w='100%' alignItems='start' gap='40px'>
        <Heading>@{username}</Heading>
        <HStack gap='20px'>
            <Box boxSize='150px' border='2px solid' borderColor='gray.700' bg='white' borderRadius='full' overflow='hidden' >
                <Image src={ loading? '-' : `${SERVER_URL}${profileImage}`} boxSize='100%' objectFit='-moz-initial'/>
            </Box>
            <VStack gap='20px'>
                <HStack gap='20px' fontSize='18px'>
                    <VStack gap='20px'>
                        <Text>followers</Text>
                        <Text>{loading? '-' : followerCount}</Text>
                    </VStack>
                    <VStack gap='20px'>
                        <Text>following</Text>
                        <Text>{loading? '-' : followingCount}</Text>
                    </VStack>
                </HStack>
                <Button w='100%'>edit profile</Button>
            </VStack>
        </HStack>
        <Text>{loading? '-' : bio}</Text>
    </VStack>
    )
}

export default UserProfile