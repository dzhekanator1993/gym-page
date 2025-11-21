import {
  Box,
  Heading,
  SimpleGrid,
  Card,
  CardBody,
  Text,
  Badge,
  Button,
  Container,
  HStack,
  Icon,
  useColorModeValue
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FiClock, FiBook } from 'react-icons/fi';

// Тимчасові дані для демонстрації
const mockCourses = [
  {
    id: 1,
    title: 'Основи Фітнесу',
    description: 'Вивчіть базові принципи тренувань та харчування',
    duration: '4 тижні',
    lessons: 12,
    level: 'Початковий'
  },
  {
    id: 2,
    title: 'Силові Тренування',
    description: 'Програма для набору м\'язової маси',
    duration: '8 тижнів',
    lessons: 24,
    level: 'Середній'
  },
  {
    id: 3,
    title: 'Кардіо та Витривалість',
    description: 'Покращте свою витривалість та спалюйте калорії',
    duration: '6 тижнів',
    lessons: 18,
    level: 'Початковий'
  },
];

export default function Courses() {
  const navigate = useNavigate();
  const textColor = useColorModeValue('gray.600', 'gray.300');

  return (
    <Container maxW="container.xl" py={12}>
      <Box mb={8}>
        <Heading color="brand.500" size="2xl" mb={2}>
          Курси TernyGym
        </Heading>
        <Text color={textColor} fontSize="lg">
          Оберіть курс та почніть свій шлях до ідеальної форми
        </Text>
      </Box>

      <SimpleGrid columns={[1, 2, 3]} spacing={6}>
        {mockCourses.map((course) => (
          <Card
            key={course.id}
            _hover={{ transform: 'translateY(-4px)', shadow: 'xl' }}
            transition="all 0.2s"
            cursor="pointer"
            onClick={() => navigate(`/course/${course.id}`)}
          >
            <CardBody>
              <Badge colorScheme="brand" mb={3}>
                {course.level}
              </Badge>
              <Heading size="md" mb={2}>
                {course.title}
              </Heading>
              <Text color={textColor} mb={4}>
                {course.description}
              </Text>

              <HStack spacing={4} color="gray.500" fontSize="sm">
                <HStack>
                  <Icon as={FiClock} />
                  <Text>{course.duration}</Text>
                </HStack>
                <HStack>
                  <Icon as={FiBook} />
                  <Text>{course.lessons} уроків</Text>
                </HStack>
              </HStack>

              <Button
                colorScheme="brand"
                mt={4}
                w="full"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/course/${course.id}`);
                }}
              >
                Детальніше
              </Button>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
}
