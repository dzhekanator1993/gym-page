import { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
  Image,
  Text,
  Badge,
  Button,
  Container,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Spinner,
  useToast,
  Select,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FiClock, FiBook } from 'react-icons/fi';
import { courseService } from '../services/course.service';

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');

  const navigate = useNavigate();
  const toast = useToast();
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  useEffect(() => {
    fetchCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryFilter, difficultyFilter]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const params = {};
      if (categoryFilter) params.category = categoryFilter;
      if (difficultyFilter) params.difficulty = difficultyFilter;

      const response = await courseService.getAllCourses(params);
      // Студенти бачать тільки опубліковані курси
      setCourses(response.data.filter(course => course.isPublished));
    } catch (error) {
      toast({
        title: 'Помилка',
        description: 'Не вдалося завантажити курси',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'green';
      case 'intermediate': return 'orange';
      case 'advanced': return 'red';
      default: return 'gray';
    }
  };

  const getDifficultyLabel = (difficulty) => {
    const labels = {
      beginner: 'Початківець',
      intermediate: 'Середній',
      advanced: 'Просунутий'
    };
    return labels[difficulty] || difficulty;
  };

  const getCategoryLabel = (category) => {
    const labels = {
      fitness: 'Фітнес',
      nutrition: 'Харчування',
      lifestyle: 'Стиль життя',
      strength: 'Силові',
      cardio: 'Кардіо'
    };
    return labels[category] || category;
  };

  const getTotalLessons = (course) => {
    if (!course.modules) return 0;
    return course.modules.reduce((total, module) => total + (module.lessons?.length || 0), 0);
  };

  if (loading) {
    return (
      <Container maxW="container.xl" py={12}>
        <VStack spacing={8}>
          <Spinner size="xl" color="brand.500" />
          <Text>Завантаження курсів...</Text>
        </VStack>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8} align="stretch">
        {/* Header */}
        <Box>
          <Heading color="brand.500" size="2xl" mb={2}>
            Курси TernyGym
          </Heading>
          <Text color={textColor} fontSize="lg">
            Оберіть курс та почніть свій шлях до ідеальної форми
          </Text>
        </Box>

        {/* Filters */}
        <HStack spacing={4} flexWrap="wrap">
          <Select
            placeholder="Всі категорії"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            w="200px"
          >
            <option value="fitness">Фітнес</option>
            <option value="nutrition">Харчування</option>
            <option value="lifestyle">Стиль життя</option>
            <option value="strength">Силові</option>
            <option value="cardio">Кардіо</option>
          </Select>

          <Select
            placeholder="Всі рівні"
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            w="200px"
          >
            <option value="beginner">Початківець</option>
            <option value="intermediate">Середній</option>
            <option value="advanced">Просунутий</option>
          </Select>
        </HStack>

        {/* Courses Grid */}
        {courses.length === 0 ? (
          <Box textAlign="center" py={12}>
            <Text color={textColor} fontSize="lg">
              Курсів поки немає. Перевірте пізніше!
            </Text>
          </Box>
        ) : (
          <SimpleGrid columns={[1, 2, 3]} spacing={6}>
            {courses.map((course) => (
              <Card
                key={course._id}
                bg={bgColor}
                borderWidth="1px"
                borderColor={borderColor}
                _hover={{ transform: 'translateY(-4px)', shadow: 'xl' }}
                transition="all 0.2s"
                cursor="pointer"
                onClick={() => navigate(`/courses/${course._id}`)}
              >
                {course.imageUrl && (
                  <Image
                    src={course.imageUrl}
                    alt={course.title}
                    objectFit="cover"
                    h="200px"
                    w="full"
                    fallbackSrc="https://via.placeholder.com/400x200?text=Course"
                  />
                )}

                <CardBody>
                  <VStack align="stretch" spacing={3}>
                    {/* Badges */}
                    <HStack spacing={2}>
                      <Badge colorScheme="blue">
                        {getCategoryLabel(course.category)}
                      </Badge>
                      <Badge colorScheme={getDifficultyColor(course.difficulty)}>
                        {getDifficultyLabel(course.difficulty)}
                      </Badge>
                    </HStack>

                    {/* Title */}
                    <Heading size="md" color="brand.500">
                      {course.title}
                    </Heading>

                    {/* Description */}
                    <Text color={textColor} noOfLines={2}>
                      {course.description}
                    </Text>

                    {/* Stats */}
                    <HStack spacing={4} color="gray.500" fontSize="sm">
                      <HStack>
                        <Icon as={FiBook} />
                        <Text>{course.modules?.length || 0} модулів</Text>
                      </HStack>
                      <HStack>
                        <Icon as={FiClock} />
                        <Text>{getTotalLessons(course)} уроків</Text>
                      </HStack>
                    </HStack>

                    {/* Button */}
                    <Button
                      colorScheme="brand"
                      w="full"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/courses/${course._id}`);
                      }}
                    >
                      Детальніше
                    </Button>
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        )}
      </VStack>
    </Container>
  );
}
