import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Heading,
  Text,
  Button,
  Container,
  VStack,
  HStack,
  Badge,
  Divider,
  Icon,
  Progress,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  useColorModeValue,
  Spinner,
  useToast,
  Image,
} from '@chakra-ui/react';
import { FiPlay, FiClock, FiBook, FiArrowLeft, FiCheckCircle } from 'react-icons/fi';
import { courseService } from '../services/course.service';
import { progressService } from '../services/progress.service';

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const [course, setCourse] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const mutedColor = useColorModeValue('gray.500', 'gray.400');
  const lessonBgNormal = useColorModeValue('gray.50', 'gray.600');
  const lessonBgCompleted = useColorModeValue('green.50', 'green.900');
  const lessonHoverNormal = useColorModeValue('gray.100', 'gray.500');

  useEffect(() => {
    fetchCourseData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchCourseData = async () => {
    try {
      setLoading(true);
      const courseResponse = await courseService.getCourseById(id);
      setCourse(courseResponse.data);

      // Fetch progress
      try {
        const progressResponse = await progressService.getProgress(id);
        setProgress(progressResponse.data);
      } catch (error) {
        // Progress might not exist yet, that's ok
        setProgress(null);
      }
    } catch (error) {
      toast({
        title: 'Помилка',
        description: 'Не вдалося завантажити курс',
        status: 'error',
        duration: 3000,
      });
      navigate('/courses');
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

  const isLessonCompleted = (lessonId) => {
    if (!progress) return false;
    return progress.completedLessons.some(l => l._id === lessonId || l === lessonId);
  };

  const getTotalLessons = () => {
    if (!course || !course.modules) return 0;
    return course.modules.reduce((total, module) => total + (module.lessons?.length || 0), 0);
  };

  const getCompletedLessons = () => {
    if (!progress) return 0;
    return progress.completedLessons.length;
  };

  if (loading) {
    return (
      <Container maxW="container.lg" py={12}>
        <VStack spacing={8}>
          <Spinner size="xl" color="brand.500" />
          <Text>Завантаження курсу...</Text>
        </VStack>
      </Container>
    );
  }

  if (!course) {
    return (
      <Container maxW="container.md" py={12}>
        <Text>Курс не знайдено</Text>
        <Button onClick={() => navigate('/courses')} mt={4}>
          Назад до курсів
        </Button>
      </Container>
    );
  }

  const totalLessons = getTotalLessons();
  const completedLessons = getCompletedLessons();
  const progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return (
    <Container maxW="container.lg" py={12}>
      <Button
        leftIcon={<FiArrowLeft />}
        variant="ghost"
        mb={6}
        onClick={() => navigate('/courses')}
      >
        Назад до курсів
      </Button>

      <Box bg={bgColor} p={8} borderRadius="lg" boxShadow="md">
        {/* Course Image */}
        {course.imageUrl && (
          <Image
            src={course.imageUrl}
            alt={course.title}
            objectFit="cover"
            w="full"
            h="300px"
            borderRadius="lg"
            mb={6}
            fallbackSrc="https://via.placeholder.com/800x300?text=Course"
          />
        )}

        {/* Header */}
        <HStack mb={4} flexWrap="wrap" spacing={3}>
          <Badge colorScheme={getDifficultyColor(course.difficulty)} fontSize="md">
            {getDifficultyLabel(course.difficulty)}
          </Badge>
          <HStack color={mutedColor}>
            <Icon as={FiBook} />
            <Text>{course.modules?.length || 0} модулів</Text>
          </HStack>
          <HStack color={mutedColor}>
            <Icon as={FiClock} />
            <Text>{totalLessons} уроків</Text>
          </HStack>
        </HStack>

        <Heading color="brand.500" size="2xl" mb={4}>
          {course.title}
        </Heading>

        <Text color={textColor} fontSize="lg" mb={6}>
          {course.description}
        </Text>

        {/* Progress Bar */}
        {progress && (
          <Box mb={6}>
            <HStack justify="space-between" mb={2}>
              <Text fontWeight="medium">Прогрес курсу</Text>
              <Text color="brand.500" fontWeight="bold">
                {completedLessons}/{totalLessons} уроків ({progressPercent}%)
              </Text>
            </HStack>
            <Progress
              value={progressPercent}
              colorScheme="brand"
              size="lg"
              borderRadius="full"
              hasStripe
              isAnimated
            />
          </Box>
        )}

        <Divider my={6} />

        {/* Modules */}
        <Heading size="md" mb={4} color={textColor}>
          Модулі курсу
        </Heading>

        {course.modules && course.modules.length > 0 ? (
          <Accordion allowMultiple defaultIndex={[0]}>
            {course.modules.map((module, moduleIndex) => (
              <AccordionItem
                key={module._id || moduleIndex}
                border="1px"
                borderColor={borderColor}
                borderRadius="md"
                mb={3}
              >
                <AccordionButton _expanded={{ bg: 'brand.50', color: 'brand.700' }}>
                  <Box flex="1" textAlign="left" fontWeight="semibold" color={textColor}>
                    {module.title}
                  </Box>
                  <Badge mr={2}>{module.lessons?.length || 0} уроків</Badge>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  {module.description && (
                    <Text color={mutedColor} fontSize="sm" mb={3}>
                      {module.description}
                    </Text>
                  )}
                  <VStack align="stretch" spacing={2}>
                    {module.lessons && module.lessons.length > 0 ? (
                      module.lessons.map((lesson) => {
                        const completed = isLessonCompleted(lesson._id || lesson);
                        return (
                          <Box
                            key={lesson._id || lesson}
                            p={3}
                            bg={completed ? lessonBgCompleted : lessonBgNormal}
                            borderRadius="md"
                            borderLeft="4px"
                            borderColor={completed ? 'green.500' : 'brand.500'}
                            _hover={{ bg: lessonHoverNormal }}
                            cursor="pointer"
                            onClick={() => navigate(`/courses/${id}/lessons/${lesson._id || lesson}`)}
                          >
                            <HStack justify="space-between">
                              <HStack flex={1}>
                                <Icon
                                  as={completed ? FiCheckCircle : FiPlay}
                                  color={completed ? 'green.500' : 'brand.500'}
                                  boxSize={5}
                                />
                                <VStack align="start" spacing={0}>
                                  <Text fontWeight="medium" color={textColor}>
                                    {typeof lesson === 'string' ? 'Урок' : lesson.title}
                                  </Text>
                                  {lesson.duration && (
                                    <Text fontSize="sm" color={mutedColor}>
                                      {lesson.duration} хв
                                    </Text>
                                  )}
                                </VStack>
                              </HStack>
                            </HStack>
                          </Box>
                        );
                      })
                    ) : (
                      <Text color={mutedColor} fontSize="sm" textAlign="center" py={2}>
                        Уроків поки немає
                      </Text>
                    )}
                  </VStack>
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <Text color={mutedColor} textAlign="center" py={4}>
            Модулів поки немає
          </Text>
        )}

        <Button
          colorScheme="brand"
          size="lg"
          w="full"
          mt={8}
          leftIcon={<FiPlay />}
          onClick={() => {
            if (course.modules && course.modules.length > 0) {
              const firstModule = course.modules[0];
              if (firstModule.lessons && firstModule.lessons.length > 0) {
                const firstLesson = firstModule.lessons[0];
                navigate(`/courses/${id}/lessons/${firstLesson._id || firstLesson}`);
              }
            }
          }}
          isDisabled={!course.modules || course.modules.length === 0}
        >
          {completedLessons === 0 ? 'Почати курс' : 'Продовжити навчання'}
        </Button>
      </Box>
    </Container>
  );
}
