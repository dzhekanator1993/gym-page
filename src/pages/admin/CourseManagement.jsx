import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Heading,
  SimpleGrid,
  Card,
  CardBody,
  Image,
  Text,
  Badge,
  Box,
  HStack,
  VStack,
  Button,
  IconButton,
  useColorModeValue,
  useToast,
  Spinner,
  Select,
  Switch,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { courseService } from '../../services/course.service';

export default function CourseManagement() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');

  const navigate = useNavigate();
  const toast = useToast();

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
      setCourses(response.data);
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

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Видалити курс "${title}"?`)) return;

    try {
      await courseService.deleteCourse(id);
      toast({
        title: 'Успіх',
        description: 'Курс видалено',
        status: 'success',
        duration: 3000,
      });
      fetchCourses();
    } catch (error) {
      toast({
        title: 'Помилка',
        description: 'Не вдалося видалити курс',
        status: 'error',
        duration: 3000,
      });
    }
  };

  const handlePublishToggle = async (id, currentStatus) => {
    try {
      await courseService.publishCourse(id, !currentStatus);
      toast({
        title: 'Успіх',
        description: currentStatus ? 'Курс знято з публікації' : 'Курс опубліковано',
        status: 'success',
        duration: 3000,
      });
      fetchCourses();
    } catch (error) {
      toast({
        title: 'Помилка',
        description: 'Не вдалося оновити статус',
        status: 'error',
        duration: 3000,
      });
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

  const getDifficultyLabel = (difficulty) => {
    const labels = {
      beginner: 'Початківець',
      intermediate: 'Середній',
      advanced: 'Просунутий'
    };
    return labels[difficulty] || difficulty;
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
            Управління курсами
          </Heading>
          <Text color="gray.600">
            Створюйте та редагуйте навчальні курси
          </Text>
        </Box>

        {/* Actions & Filters */}
        <HStack spacing={4} justify="space-between" flexWrap="wrap">
          <Button
            leftIcon={<FiPlus />}
            colorScheme="brand"
            onClick={() => navigate('/admin/courses/new')}
          >
            Створити курс
          </Button>

          <HStack spacing={4}>
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
        </HStack>

        {/* Courses Grid */}
        {courses.length === 0 ? (
          <Box textAlign="center" py={12}>
            <Text color="gray.600" fontSize="lg">
              Курсів поки немає. Створіть перший!
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
                overflow="hidden"
                transition="all 0.3s"
                _hover={{ transform: 'translateY(-4px)', shadow: 'xl' }}
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
                    <Text color="gray.600" noOfLines={2}>
                      {course.description}
                    </Text>

                    {/* Stats */}
                    <Text fontSize="sm" color="gray.500">
                      {course.modules?.length || 0} модулів
                    </Text>

                    {/* Publish Toggle */}
                    <FormControl display="flex" alignItems="center">
                      <FormLabel htmlFor={`publish-${course._id}`} mb="0" fontSize="sm">
                        Опубліковано
                      </FormLabel>
                      <Switch
                        id={`publish-${course._id}`}
                        isChecked={course.isPublished}
                        onChange={() => handlePublishToggle(course._id, course.isPublished)}
                        colorScheme="green"
                      />
                    </FormControl>

                    {/* Actions */}
                    <HStack spacing={2} pt={2}>
                      <IconButton
                        icon={<FiEdit2 />}
                        colorScheme="blue"
                        variant="ghost"
                        onClick={() => navigate(`/admin/courses/${course._id}/edit`)}
                        aria-label="Редагувати"
                        flex={1}
                      />
                      <IconButton
                        icon={<FiTrash2 />}
                        colorScheme="red"
                        variant="ghost"
                        onClick={() => handleDelete(course._id, course.title)}
                        aria-label="Видалити"
                        flex={1}
                      />
                    </HStack>
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
