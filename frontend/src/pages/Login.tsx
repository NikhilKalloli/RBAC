import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';
import { authApi } from '../services/api';

interface LoginFormData {
  email: string;
  password: string;
}

export function Login() {
  const { register, handleSubmit } = useForm<LoginFormData>();
  const { login } = useAuth();
  const toast = useToast();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await authApi.login(data.email, data.password);
      login(response.token, response.user);
      toast({
        title: 'Login successful',
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: 'Login failed',
        description: error instanceof Error ? error.message : 'Unknown error occurred',
        status: 'error',
        duration: 3000,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box maxW="md" mx="auto" mt={8} p={6} borderRadius="lg" boxShadow="lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input {...register('email')} type="email" />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input {...register('password')} type="password" />
            </FormControl>
            <Button
              type="submit"
              colorScheme="blue"
              w="full"
              as={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Login
            </Button>
          </VStack>
        </form>
      </Box>
    </motion.div>
  );
} 