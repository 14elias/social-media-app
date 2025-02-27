import {Text,Flex,Box,VStack,Heading,HStack,Image,Button,Avatar} from '@chakra-ui/react'
import {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { get_user_post, get_user_profile_data, toggle_follow } from '../api/endpoints'
import { SERVER_URL } from '../constants/constants'
import Post from '../components/Post'
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
            <Box w='100%' mt='30px'>
               <UserPost username={username}/>
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

    const [isOurProfile,setIsOurProfile]=useState(false)
    const [following,setFollowing]=useState(false)

    useEffect(()=>{
        const fetchdata = async () => {
            try{
                const data = await get_user_profile_data(username);
                setBio(data.bio)
                setProfileImage(data.profile_image)
                setFollowerCount(data.follower_count)
                setFollowingCount(data.following_count)
                setIsOurProfile(data.is_our_profile)
                setFollowing(data.following)
            }catch{
                console.log('error')
            }finally{
                setLoading(false)
            }
            
        }
        fetchdata()
    },[])

    const togglehandle=async()=>{
        const data= await toggle_follow(username)
        if (data.now_following){
            setFollowerCount(prev=>prev+1)
            setFollowing(true)
        }
        else{
            setFollowerCount(prev=>prev-1)
            setFollowing(false)
        }
    }

    const nav=useNavigate()

    const handleedit=()=>{
        nav(`/setting`)
    }
    
    return (
    <VStack w='100%' alignItems='start' gap='40px'>
        <Heading>@{username}</Heading>
        <HStack gap='20px'>
            <Avatar 
            src={loading ? '' : `${SERVER_URL}${profileImage}`} 
            name={username} 
            size="2xl" // Keeps the size large without shrinking
            />

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
                {
                    isOurProfile?
                      <Button w='100%' onClick={handleedit}>Edit Profile</Button>
                    :
                    <Button w='100%' colorScheme='blue' onClick={togglehandle}>{following?'unfollow':'follow'}</Button>
                }
            </VStack>
        </HStack>
        <Text>{loading? '-' : bio}</Text>
    </VStack>
    )
}

const UserPost=({username})=>{
    const [posts,setposts]=useState([])
    const [loading,setLoading]=useState(true)
    useEffect(()=>{
        const fetchdata=async()=>{
            try{
                const post=await get_user_post(username)
                setposts(post)
            }catch{
                alert('error getting users post')
            }finally{
                setLoading(false)
            }
        }

        fetchdata()
    },[])

    return(
        <Flex w='100%' wrap='wrap' gap='40px' pb='50px'>
            {loading ? 
             <Text>Loading...</Text> 
            :  
             posts.map((post)=>{return <Post key={post.id} id={post.id} username={post.username} description={post.description} formatted_data={post.formatted_data} liked={post.liked} likes_count={post.likes_count}/>})
            }
        </Flex>
    )
}

export default UserProfile