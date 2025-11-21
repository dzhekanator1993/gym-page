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
  Divider,
  HStack,
  useToast,
  Link,
  useColorModeValue
} from '@chakra-ui/react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const toast = useToast();

  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Симуляція API запиту
    setTimeout(() => {
      setIsLoading(false);

      // Тимчасова валідація (без бекенду)
      if (email && password) {
        toast({
          title: 'Успішний вхід!',
          description: `Ласкаво просимо, ${email}`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });

        // Зберігаємо "токен" в localStorage (тимчасово)
        localStorage.setItem('user', JSON.stringify({ email, name: email.split('@')[0] }));

        // Dispatch custom event для оновлення navbar
        window.dispatchEvent(new Event('userChanged'));

        // Перенаправляємо на курси
        navigate('/courses');
      } else {
        toast({
          title: 'Помилка',
          description: 'Будь ласка, заповніть всі поля',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    }, 1500);
  };



  return (
    <Container maxW="md" py={12}>
      <VStack spacing={8}>
        {/* Header */}
        <Box textAlign="center">
          <Heading color="brand.500" size="2xl" mb={2}>
            Вхід
          </Heading>
          <Text color="gray.600">
            Увійдіть до свого акаунту TernyGym
          </Text>
        </Box>

        {/* Login Form */}
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
              {/* Email */}
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <InputGroup>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    size="lg"
                  />
                </InputGroup>
              </FormControl>

              {/* Password */}
              <FormControl isRequired>
                <FormLabel>Пароль</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Введіть пароль"
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

              {/* Forgot Password */}
              <HStack w="full" justify="space-between">
                <Box />
                <Link color="brand.500" fontSize="sm" fontWeight="medium">
                  Забули пароль?
                </Link>
              </HStack>

              {/* Submit Button */}
              <Button
                type="submit"
                colorScheme="brand"
                size="lg"
                w="full"
                isLoading={isLoading}
                loadingText="Вхід..."
              >
                Увійти
              </Button>
            </VStack>
          </form>
        </Box>

        {/* Sign Up Link */}
        <HStack>
          <Text color="gray.600">Немає акаунту?</Text>
          <Link color="brand.500" fontWeight="medium" onClick={() => navigate('/auth/register')}>
            Зареєструватись
          </Link>
        </HStack>


      </VStack>
    </Container>
  );
}
