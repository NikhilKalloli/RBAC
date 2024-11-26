import { Box, Button, Container, Heading, Stack, Text, useColorModeValue } from '@chakra-ui/react';
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
    <Container maxW="container.xl" py={20}>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Stack spacing={8} alignItems="center" textAlign="center">
          <Heading
            as={motion.h1}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            // @ts-ignore
            transition={{ duration: 0.5 }}
            fontSize={{ base: '4xl', md: '6xl' }}
            fontWeight="bold"
          >
            Welcome to RBAC System
          </Heading>
          
          <Text fontSize="xl" color={textColor} maxW="2xl">
            A secure role-based access control system with authentication and authorization.
          </Text>

          <Stack
            direction={{ base: 'column', md: 'row' }}
            spacing={4}
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
            >
              Login
            </MotionButton>
            
            <MotionButton
              size="lg"
              colorScheme="green"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/register')}
            >
              Register
            </MotionButton>
          </Stack>

          <MotionBox
            mt={8}
            p={6}
            bg={bgColor}
            rounded="xl"
            shadow="md"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <Stack spacing={4}>
              <Heading size="md">Features</Heading>
              <Stack spacing={2} textAlign="left">
                <Text>✨ Secure Authentication</Text>
                <Text>🔒 Role-Based Access Control</Text>
                <Text>👥 User Management</Text>
                <Text>🚀 Beautiful UI/UX</Text>
              </Stack>
            </Stack>
          </MotionBox>
        </Stack>
      </MotionBox>
    </Container>
  );
} 