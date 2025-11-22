import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Heading,
  Text,
  Button,
  Container,
  AspectRatio,
  VStack,
  HStack,
  Badge,
  Divider,
  useToast,
  useColorModeValue,
  Spinner,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';
import ReactPlayer from 'react-player';
import { FiArrowLeft, FiCheckCircle, FiExternalLink } from 'react-icons/fi';
import { lessonService } from '../services/lesson.service';
import { progressService } from '../services/progress.service';

export default function Lesson() {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState(false);

  const bgColor = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  useEffect(() => {
    fetchLesson();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonId]);

  const fetchLesson = async () => {
    try {
      setLoading(true);
      const response = await lessonService.getLessonById(lessonId);
      setLesson(response.data);
    } catch (error) {
      toast({
        title: 'Помилка',
        description: 'Не вдалося завантажити урок',
        status: 'error',
        duration: 3000,
      });
      navigate(`/courses/${courseId}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteLesson = async () => {
    try {
      setCompleting(true);
      await progressService.completeLesson(courseId, lessonId);

      toast({
        title: 'Урок завершено!',
        description: 'Ваш прогрес збережено',
        status: 'success',
        duration: 3000,
      });

      // Navigate back to course
      setTimeout(() => navigate(`/courses/${courseId}`), 1500);
    } catch (error) {
      toast({
        title: 'Помилка',
        description: 'Не вдалося зберегти прогрес',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setCompleting(false);
    }
  };

  if (loading) {
    return (
      <Container maxW="container.xl" py={12}>
        <VStack spacing={8}>
          <Spinner size="xl" color="brand.500" />
          <Text>Завантаження уроку...</Text>
        </VStack>
      </Container>
    );
  }

  if (!lesson) {
    return (
      <Container maxW="container.md" py={12}>
        <Text>Урок не знайдено</Text>
        <Button onClick={() => navigate(`/courses/${courseId}`)} mt={4}>
          Назад до курсу
        </Button>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      <Button
        leftIcon={<FiArrowLeft />}
        variant="ghost"
        mb={6}
        onClick={() => navigate(`/courses/${courseId}`)}
      >
        Назад до курсу
      </Button>

      <VStack spacing={6} align="stretch">
        {/* Header */}
        <Box>
          <HStack mb={2}>
            <Badge colorScheme="purple">Урок</Badge>
            {lesson.duration && (
              <Text color="gray.500">{lesson.duration} хвилин</Text>
            )}
          </HStack>
          <Heading color="brand.500" size="xl">
            {lesson.title}
          </Heading>
        </Box>

        {/* Video */}
        {lesson.videoUrl && (
          <Box bg="black" borderRadius="lg" overflow="hidden" boxShadow="xl">
            <AspectRatio ratio={16 / 9}>
              <ReactPlayer
                url={lesson.videoUrl}
                controls
                width="100%"
                height="100%"
                config={{
                  youtube: {
                    playerVars: { showinfo: 1 }
                  }
                }}
              />
            </AspectRatio>
          </Box>
        )}

        {/* Content */}
        <Box bg={bgColor} p={8} borderRadius="lg" boxShadow="md">
          <Heading size="md" mb={4}>
            Опис уроку
          </Heading>
          <Text color={textColor} whiteSpace="pre-wrap" lineHeight="tall">
            {lesson.content}
          </Text>
        </Box>

        {/* Resources */}
        {lesson.resources && lesson.resources.length > 0 && (
          <Box bg={bgColor} p={6} borderRadius="lg" boxShadow="md">
            <Heading size="md" mb={4}>
              Додаткові матеріали
            </Heading>
            <List spacing={3}>
              {lesson.resources.map((resource, index) => (
                <ListItem key={index}>
                  <HStack>
                    <ListIcon as={FiExternalLink} color="brand.500" />
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#4F46E5', textDecoration: 'underline' }}
                    >
                      {resource.title}
                    </a>
                    <Badge colorScheme="gray" ml={2}>
                      {resource.type.toUpperCase()}
                    </Badge>
                  </HStack>
                </ListItem>
              ))}
            </List>
          </Box>
        )}

        <Divider />

        {/* Navigation */}
        <HStack justify="space-between">
          <Button
            leftIcon={<FiArrowLeft />}
            variant="outline"
            colorScheme="brand"
            onClick={() => navigate(`/courses/${courseId}`)}
          >
            До списку уроків
          </Button>

          <Button
            colorScheme="green"
            leftIcon={<FiCheckCircle />}
            onClick={handleCompleteLesson}
            isLoading={completing}
          >
            Завершити урок
          </Button>
        </HStack>
      </VStack>
    </Container>
  );
}
