import { Box, Flex, Stack, Button, Heading, useColorModeValue } from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// @ts-ignore
const MotionFlex = motion(Flex);

export function Layout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const bgColor = useColorModeValue('white', 'gray.800');

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <MotionFlex
        as="header"
        bg={bgColor}
        px={4}
        py={2}
        shadow="sm"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <Flex align="center" justify="space-between" w="full" maxW="6xl" mx="auto">
          <Heading size="md" cursor="pointer" onClick={() => navigate('/')}>
            RBAC System
          </Heading>
          <Stack direction="row" spacing={4}>
            {user && (
              <>
                <Button variant="ghost" onClick={() => navigate('/dashboard')}>
                  Dashboard
                </Button>
                {(user.role === 'ADMIN' || user.role === 'SUPER_ADMIN') && (
                  <Button variant="ghost" onClick={() => navigate('/admin')}>
                    Admin Panel
                  </Button>
                )}
                <Button onClick={handleLogout}>Logout</Button>
              </>
            )}
          </Stack>
        </Flex>
      </MotionFlex>

      <Flex 
        as="main" 
        flex="1"
        align="center" 
        justify="center"
        px={4}
        py={8}
      >
        <Box w="full" maxW="6xl">
          {children}
        </Box>
      </Flex>
    </Box>
  );
} 