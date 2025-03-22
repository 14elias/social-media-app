import { Box, VStack, Flex } from "@chakra-ui/react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <Flex
      direction="column"
      w="100vw"
      minH="100vh"
      bg="#FCFCFC"
      align="center"
      overflowX="hidden"
    >
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <Box
        w="100%"
        maxW="1200px"
        mt="70px" // To account for the fixed Navbar height
        px={{ base: "4", md: "8" }}
        py="4"
        flex="1"
      >
        {children}
      </Box>
    </Flex>
  );
};

export default Layout;