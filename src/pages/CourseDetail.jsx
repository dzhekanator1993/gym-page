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
  useColorModeValue
} from '@chakra-ui/react';
import { FiPlay, FiClock, FiBook, FiArrowLeft, FiCheckCircle, FiLock } from 'react-icons/fi';

// Тимчасові дані з модулями
const mockCourseDetails = {
  1: {
    title: 'Основи Фітнесу',
    description: 'Комплексний курс для початківців, який охоплює всі аспекти здорового способу життя',
    duration: '4 тижні',
    level: 'Початковий',
    progress: 35, // Прогрес у відсотках
    modules: [
      {
        id: 1,
        title: 'Модуль 1: Вступ до фітнесу',
        lessons: [
          { id: 1, title: 'Що таке фітнес?', duration: '15 хв', completed: true, type: 'video' },
          { id: 2, title: 'Базові принципи', duration: '20 хв', completed: true, type: 'text' },
          { id: 3, title: 'Тест: Перевірка знань', duration: '10 хв', completed: false, type: 'quiz' },
        ]
      },
      {
        id: 2,
        title: 'Модуль 2: Розминка та розтяжка',
        lessons: [
          { id: 4, title: 'Важливість розминки', duration: '18 хв', completed: false, type: 'video' },
          { id: 5, title: 'Техніка розтяжки', duration: '25 хв', completed: false, type: 'video' },
          { id: 6, title: 'Практичні вправи', duration: '30 хв', completed: false, type: 'text' },
        ]
      },
      {
        id: 3,
        title: 'Модуль 3: Харчування',
        lessons: [
          { id: 7, title: 'Основи харчування', duration: '22 хв', completed: false, type: 'text', locked: true },
          { id: 8, title: 'Калорії та макронутрієнти', duration: '28 хв', completed: false, type: 'video', locked: true },
        ]
      }
    ]
  },
  2: {
    title: 'Силові Тренування',
    description: 'Програма для набору м\'язової маси та збільшення сили',
    duration: '8 тижнів',
    level: 'Середній',
    progress: 0,
    modules: [
      {
        id: 1,
        title: 'Модуль 1: Анатомія м\'язів',
        lessons: [
          { id: 9, title: 'Будова м\'язів', duration: '25 хв', completed: false, type: 'video' },
          { id: 10, title: 'М\'язові групи', duration: '30 хв', completed: false, type: 'text' },
        ]
      }
    ]
  },
  3: {
    title: 'Кардіо та Витривалість',
    description: 'Покращте свою витривалість та спалюйте калорії ефективно',
    duration: '6 тижнів',
    level: 'Початковий',
    progress: 0,
    modules: [
      {
        id: 1,
        title: 'Модуль 1: Основи кардіо',
        lessons: [
          { id: 11, title: 'Що таке кардіо?', duration: '20 хв', completed: false, type: 'video' },
          { id: 12, title: 'HIIT тренування', duration: '25 хв', completed: false, type: 'video' },
        ]
      }
    ]
  }
};

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = mockCourseDetails[id];

  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const mutedColor = useColorModeValue('gray.500', 'gray.400');

  // Lesson card colors
  const lessonBgNormal = useColorModeValue('gray.50', 'gray.600');
  const lessonBgCompleted = useColorModeValue('green.50', 'green.900');
  const lessonHoverNormal = useColorModeValue('gray.100', 'gray.500');
  const lessonHoverLocked = useColorModeValue('gray.50', 'gray.600');

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

  const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0);
  const completedLessons = course.modules.reduce(
    (acc, module) => acc + module.lessons.filter(l => l.completed).length,
    0
  );

  const getLessonIcon = (lesson) => {
    if (lesson.locked) return FiLock;
    if (lesson.completed) return FiCheckCircle;
    return FiPlay;
  };

  const getLessonColor = (lesson) => {
    if (lesson.locked) return 'gray.400';
    if (lesson.completed) return 'green.500';
    return 'brand.500';
  };

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
        {/* Header */}
        <HStack mb={4} flexWrap="wrap">
          <Badge colorScheme="brand" fontSize="md">
            {course.level}
          </Badge>
          <HStack color={mutedColor}>
            <Icon as={FiClock} />
            <Text>{course.duration}</Text>
          </HStack>
          <HStack color={mutedColor}>
            <Icon as={FiBook} />
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
        <Box mb={6}>
          <HStack justify="space-between" mb={2}>
            <Text fontWeight="medium">Прогрес курсу</Text>
            <Text color="brand.500" fontWeight="bold">
              {completedLessons}/{totalLessons} уроків ({course.progress}%)
            </Text>
          </HStack>
          <Progress
            value={course.progress}
            colorScheme="brand"
            size="lg"
            borderRadius="full"
            hasStripe
            isAnimated
          />
        </Box>

        <Divider my={6} />

        {/* Modules */}
        <Heading size="md" mb={4} color={textColor}>
          Модулі курсу
        </Heading>

        <Accordion allowMultiple defaultIndex={[0]}>
          {course.modules.map((module) => (
            <AccordionItem key={module.id} border="1px" borderColor={borderColor} borderRadius="md" mb={3}>
              <AccordionButton _expanded={{ bg: 'brand.50', color: 'brand.700' }}>
                <Box flex="1" textAlign="left" fontWeight="semibold" color={textColor}>
                  {module.title}
                </Box>
                <Badge mr={2}>{module.lessons.length} уроків</Badge>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <VStack align="stretch" spacing={2}>
                  {module.lessons.map((lesson) => (
                    <Box
                      key={lesson.id}
                      p={3}
                      bg={lesson.completed ? lessonBgCompleted : lessonBgNormal}
                      borderRadius="md"
                      borderLeft="4px"
                      borderColor={getLessonColor(lesson)}
                      _hover={{ bg: lesson.locked ? lessonHoverLocked : lessonHoverNormal }}
                      cursor={lesson.locked ? 'not-allowed' : 'pointer'}
                      opacity={lesson.locked ? 0.6 : 1}
                      onClick={() => !lesson.locked && navigate(`/lesson/${lesson.id}`)}
                    >
                      <HStack justify="space-between">
                        <HStack flex={1}>
                          <Icon
                            as={getLessonIcon(lesson)}
                            color={getLessonColor(lesson)}
                            boxSize={5}
                          />
                          <VStack align="start" spacing={0}>
                            <Text fontWeight="medium" color={textColor}>{lesson.title}</Text>
                            <HStack fontSize="sm" color={mutedColor}>
                              <Text>{lesson.duration}</Text>
                              <Text>•</Text>
                              <Badge size="sm" colorScheme={
                                lesson.type === 'video' ? 'purple' :
                                  lesson.type === 'quiz' ? 'orange' : 'blue'
                              }>
                                {lesson.type === 'video' ? 'Відео' :
                                  lesson.type === 'quiz' ? 'Тест' : 'Текст'}
                              </Badge>
                            </HStack>
                          </VStack>
                        </HStack>
                        {lesson.locked && (
                          <Badge colorScheme="gray">Заблоковано</Badge>
                        )}
                      </HStack>
                    </Box>
                  ))}
                </VStack>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>

        <Button
          colorScheme="brand"
          size="lg"
          w="full"
          mt={8}
          leftIcon={<FiPlay />}
          onClick={() => {
            const firstIncompleteLesson = course.modules
              .flatMap(m => m.lessons)
              .find(l => !l.completed && !l.locked);
            if (firstIncompleteLesson) {
              navigate(`/lesson/${firstIncompleteLesson.id}`);
            }
          }}
        >
          {completedLessons === 0 ? 'Почати курс' : 'Продовжити навчання'}
        </Button>
      </Box>
    </Container>
  );
}
