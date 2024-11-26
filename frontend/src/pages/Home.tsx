import { Box, Button, Heading, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// @ts-ignore
const MotionBox = motion(Box);
// @ts-ignore
const MotionButton = motion(Button);

export function Home() {
  const navigate = useNavigate();
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  return (
    <Box 
      minH="calc(100vh - 64px)" 
      w="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg={useColorModeValue('gray.50', 'gray.900')}
      position="absolute"
      top="64px"
      left="0"
      right="0"
      bottom="0"
    >
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        maxW="container.lg"
        w="full"
        p={8}
      >
        <Stack 
          spacing={12} 
          alignItems="center" 
          justifyContent="center"
          h="full"
        >
          <MotionBox
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            textAlign="center"
          >
            <Heading
              fontSize={{ base: '4xl', md: '6xl' }}
              fontWeight="bold"
              lineHeight="shorter"
              mb={6}
            >
              Welcome to RBAC System
            </Heading>
            
            <Text 
              fontSize={{ base: 'lg', md: 'xl' }} 
              color={textColor} 
              maxW="2xl" 
              mx="auto"
            >
              A secure role-based access control system with authentication and authorization.
            </Text>
          </MotionBox>

          <Stack
            direction={{ base: 'column', md: 'row' }}
            spacing={6}
            w="full"
            maxW="md"
            justify="center"
          >
            <MotionButton
              size="lg"
              colorScheme="blue"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/login')}
              fontSize="xl"
              py={8}
              px={12}
            >
              Login
            </MotionButton>
            
            <MotionButton
              size="lg"
              colorScheme="green"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/register')}
              fontSize="xl"
              py={8}
              px={12}
            >
              Register
            </MotionButton>
          </Stack>

          <MotionBox
            p={8}
            bg={bgColor}
            rounded="xl"
            shadow="xl"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
            maxW="2xl"
            w="full"
          >
            <Stack spacing={6}>
              <Heading size="lg" textAlign="center">Features</Heading>
              <Stack spacing={4} fontSize="lg">
                <Text>✨ Secure Authentication</Text>
                <Text>🔒 Role-Based Access Control</Text>
                <Text>👥 User Management</Text>
                <Text>🚀 Beautiful UI/UX</Text>
              </Stack>
            </Stack>
          </MotionBox>
        </Stack>
      </MotionBox>
    </Box>
  );
} 