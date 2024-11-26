import { Box, Heading, Text, useColorModeValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

export function AdminOnly() {
  const bgColor = useColorModeValue('white', 'gray.800');

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box p={8} bg={bgColor} rounded="xl" shadow="lg">
        <Heading mb={4}>Admin Only Area</Heading>
        <Text fontSize="lg">
          This is a restricted area only accessible to administrators. 
          Here you would typically find administrative controls and system management options.
        </Text>
      </Box>
    </MotionBox>
  );
} 