import { Box, Heading, SimpleGrid, Text, useColorModeValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

// @ts-ignore
const MotionBox = motion(Box);

export function Dashboard() {
  const { user } = useAuth();
  const bgColor = useColorModeValue('white', 'gray.800');

  return (
    <Box maxW="6xl" mx="auto" px={4} py={8}>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Heading mb={6}>Welcome, {user?.email}</Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          <MotionBox
            p={6}
            bg={bgColor}
            rounded="xl"
            shadow="md"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <Heading size="md" mb={4}>Your Role</Heading>
            <Text>{user?.role}</Text>
          </MotionBox>
          
          {/* Add more dashboard widgets here */}
        </SimpleGrid>
      </MotionBox>
    </Box>
  );
} 