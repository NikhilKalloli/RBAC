import { Box, Heading, Text, useColorModeValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

export function ModeratorOnly() {
  const bgColor = useColorModeValue('white', 'gray.800');

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box p={8} bg={bgColor} rounded="xl" shadow="lg">
        <Heading mb={4}>Moderator Only Area</Heading>
        <Text fontSize="lg">
          Welcome to the moderator area. This section is exclusively for content moderators.
          Here you would typically find moderation tools and content management features.
        </Text>
      </Box>
    </MotionBox>
  );
} 