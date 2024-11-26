import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';
import { authApi } from '../services/api';
import { UserRole } from '../types';
import { useNavigate } from 'react-router-dom';

interface RegisterFormData {
  email: string;
  password: string;
  role: UserRole;
}

export function Register() {
  const { register, handleSubmit } = useForm<RegisterFormData>();
  const { login } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      console.log('Registering with data:', data);
      const response = await authApi.register(data.email, data.password, data.role);
      login(response.token, response.user);
      toast({
        title: 'Registration successful',
        status: 'success',
        duration: 3000,
      });
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Registration error:', error.response?.data || error);
      toast({
        title: 'Registration failed',
        description: error.response?.data?.error || error.message || 'Unknown error occurred',
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
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input {...register('email')} type="email" />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input {...register('password')} type="password" minLength={8} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Role</FormLabel>
              <Select {...register('role')} defaultValue={UserRole.USER}>
                <option value={UserRole.USER}>User</option>
                <option value={UserRole.ADMIN}>Admin</option>
                <option value={UserRole.MODERATOR}>Moderator</option>
              </Select>
            </FormControl>
            <Button
              type="submit"
              colorScheme="blue"
              w="full"
              as={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Register
            </Button>
          </VStack>
        </form>
      </Box>
    </motion.div>
  );
} 