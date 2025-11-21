import { Box, Heading, Text, Button, VStack, Container } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const navigate = useNavigate();

  return (
    <Container maxW="md" py={12}>
      <VStack spacing={6} align="stretch">
        <Box textAlign="center">
          <Heading color="brand.500" size="xl" mb={2}>
            Авторизація
          </Heading>
          <Text color="gray.600">
            Увійдіть або зареєструйтесь для доступу до курсів
          </Text>
        </Box>

        <Box
          p={8}
          bg="white"
          borderRadius="lg"
          boxShadow="md"
        >
          <VStack spacing={4}>
            <Button
              colorScheme="brand"
              size="lg"
              w="full"
              onClick={() => navigate('/auth/login')}
            >
              Увійти
            </Button>

            <Button
              variant="outline"
              colorScheme="brand"
              size="lg"
              w="full"
              onClick={() => navigate('/auth/register')}
            >
              Зареєструватись
            </Button>
          </VStack>
        </Box>

        <Button
          variant="ghost"
          size="lg"
          onClick={() => navigate('/courses')}
        >
          Переглянути курси без входу
        </Button>
      </VStack>
    </Container>
  );
}
