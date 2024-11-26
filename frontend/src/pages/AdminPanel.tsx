import { Box, Heading, SimpleGrid, Text, useColorModeValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { adminApi } from '../services/api';
import { useEffect, useState } from 'react';
// @ts-ignore
const MotionBox = motion(Box);

export function AdminPanel() {
  const { user } = useAuth();
  const bgColor = useColorModeValue('white', 'gray.800');
  const [adminData, setAdminData] = useState<any>(null);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const data = await adminApi.getAdminData();
        setAdminData(data);
      } catch (error) {
        console.error('Failed to fetch admin data:', error);
      }
    };

    fetchAdminData();
  }, []);

  return (
    <Box maxW="6xl" mx="auto" px={4} py={8}>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Heading mb={6}>Admin Panel</Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          <MotionBox
            p={6}
            bg={bgColor}
            rounded="xl"
            shadow="md"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <Heading size="md" mb={4}>Admin Status</Heading>
            <Text>Role: {user?.role}</Text>
            <Text>Email: {user?.email}</Text>
          </MotionBox>

          <MotionBox
            p={6}
            bg={bgColor}
            rounded="xl"
            shadow="md"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <Heading size="md" mb={4}>Admin Access</Heading>
            <Text>{adminData?.message || 'Loading...'}</Text>
          </MotionBox>
        </SimpleGrid>
      </MotionBox>
    </Box>
  );
} 