import { Box, Flex, Stack, Button, Heading, useColorModeValue, useToast } from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserRole } from '../types';

// @ts-ignore
const MotionFlex = motion(Flex);

export function Layout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const bgColor = useColorModeValue('white', 'gray.800');

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleAdminAccess = () => {
    if (user?.role === UserRole.ADMIN) {
      navigate('/admin-only');
    } else {
      toast({
        title: 'Access Denied',
        description: 'You need administrator privileges to access this area.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
    }
  }; 

  const handleModeratorAccess = () => {
    if (user?.role === UserRole.MODERATOR) {
      navigate('/moderator-only');
    } else {
      toast({
        title: 'Access Denied',
        description: 'You need moderator privileges to access this area.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
    }
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
                <Button 
                  variant="ghost" 
                  onClick={handleAdminAccess}
                  colorScheme={user.role === UserRole.ADMIN ? 'blue' : 'gray'}
                >
                  Admin Only
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={handleModeratorAccess}
                  colorScheme={user.role === UserRole.MODERATOR ? 'blue' : 'gray'}
                >
                  Moderator Only
                </Button>
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