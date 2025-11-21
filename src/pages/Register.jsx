import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  InputGroup,
  InputRightElement,
  IconButton,
  HStack,
  useToast,
  Link,
  useColorModeValue
} from '@chakra-ui/react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { authService } from '../services/auth.service';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const toast = useToast();

  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (password !== confirmPassword) {
      toast({
        title: 'Помилка',
        description: 'Паролі не співпадають',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: 'Помилка',
        description: 'Пароль повинен містити мінімум 6 символів',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);

    try {
      await authService.register(username, email, password);

      toast({
        title: 'Реєстрація успішна!',
        description: 'Тепер ви можете увійти до системи',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      // Redirect to login
      navigate('/auth/login');
    } catch (error) {
      toast({
        title: 'Помилка реєстрації',
        description: error.response?.data?.message || 'Помилка сервера. Спробуйте пізніше',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxW="md" py={12}>
      <VStack spacing={8}>
        {/* Header */}
        <Box textAlign="center">
          <Heading color="brand.500" size="2xl" mb={2}>
            Реєстрація
          </Heading>
          <Text color="gray.600">
            Створіть акаунт TernyGym
          </Text>
        </Box>

        {/* Register Form */}
        <Box
          w="full"
          bg={bgColor}
          p={8}
          borderRadius="lg"
          boxShadow="lg"
          border="1px"
          borderColor={borderColor}
        >
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              {/* Username */}
              <FormControl isRequired>
                <FormLabel>Ім'я користувача</FormLabel>
                <Input
                  type="text"
                  placeholder="Введіть ім'я"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  size="lg"
                />
              </FormControl>

              {/* Email */}
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  size="lg"
                />
              </FormControl>

              {/* Password */}
              <FormControl isRequired>
                <FormLabel>Пароль</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Мінімум 6 символів"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    size="lg"
                  />
                  <InputRightElement h="full">
                    <IconButton
                      variant="ghost"
                      icon={showPassword ? <FiEyeOff /> : <FiEye />}
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Сховати пароль' : 'Показати пароль'}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              {/* Confirm Password */}
              <FormControl isRequired>
                <FormLabel>Підтвердіть пароль</FormLabel>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Повторіть пароль"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  size="lg"
                />
              </FormControl>

              {/* Submit Button */}
              <Button
                type="submit"
                colorScheme="brand"
                size="lg"
                w="full"
                isLoading={isLoading}
                loadingText="Реєстрація..."
              >
                Зареєструватись
              </Button>
            </VStack>
          </form>
        </Box>

        {/* Login Link */}
        <HStack>
          <Text color="gray.600">Вже є акаунт?</Text>
          <Link color="brand.500" fontWeight="medium" onClick={() => navigate('/auth/login')}>
            Увійти
          </Link>
        </HStack>
      </VStack>
    </Container>
  );
}
