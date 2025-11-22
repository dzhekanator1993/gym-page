import { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import {
  Container,
  Heading,
  VStack,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  NumberInput,
  NumberInputField,
  useToast,
  Box,
  HStack,
  IconButton,
  Text,
} from '@chakra-ui/react';
import { FiPlus, FiTrash2, FiArrowLeft } from 'react-icons/fi';
import { lessonService } from '../../services/lesson.service';
import { courseService } from '../../services/course.service';

export default function LessonEditor() {
  const { lessonId } = useParams();
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get('courseId');
  const moduleId = searchParams.get('moduleId');

  const navigate = useNavigate();
  const toast = useToast();
  const isEdit = Boolean(lessonId);

  const [course, setCourse] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    videoUrl: '',
    duration: 0,
    order: 1,
    courseId: courseId || '',
    moduleId: moduleId || '',
    resources: []
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (courseId) {
      fetchCourse();
    }
    if (isEdit && lessonId) {
      fetchLesson();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId, lessonId]);

  const fetchCourse = async () => {
    try {
      const response = await courseService.getCourseById(courseId);
      setCourse(response.data);
    } catch (error) {
      toast({
        title: 'Помилка',
        description: 'Не вдалося завантажити курс',
        status: 'error',
        duration: 3000,
      });
    }
  };

  const fetchLesson = async () => {
    try {
      const response = await lessonService.getLessonById(lessonId);
      setFormData(response.data);
    } catch (error) {
      toast({
        title: 'Помилка',
        description: 'Не вдалося завантажити урок',
        status: 'error',
        duration: 3000,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEdit) {
        await lessonService.updateLesson(lessonId, formData);
        toast({
          title: 'Успіх',
          description: 'Урок оновлено',
          status: 'success',
          duration: 3000,
        });
      } else {
        await lessonService.createLesson(formData);
        toast({
          title: 'Успіх',
          description: 'Урок створено',
          status: 'success',
          duration: 3000,
        });
      }
      navigate(`/admin/courses/${courseId}/edit`);
    } catch (error) {
      toast({
        title: 'Помилка',
        description: error.response?.data?.message || 'Не вдалося зберегти урок',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const addResource = () => {
    setFormData({
      ...formData,
      resources: [
        ...formData.resources,
        { title: '', url: '', type: 'link' }
      ]
    });
  };

  const removeResource = (index) => {
    const newResources = formData.resources.filter((_, i) => i !== index);
    setFormData({ ...formData, resources: newResources });
  };

  const updateResource = (index, field, value) => {
    const newResources = [...formData.resources];
    newResources[index][field] = value;
    setFormData({ ...formData, resources: newResources });
  };

  const getModuleName = () => {
    if (!course || !moduleId) return '';
    const module = course.modules?.find(m => m._id === moduleId);
    return module ? module.title : '';
  };

  return (
    <Container maxW="container.md" py={12}>
      <VStack spacing={8} align="stretch">
        <HStack>
          <IconButton
            icon={<FiArrowLeft />}
            onClick={() => navigate(`/admin/courses/${courseId}/edit`)}
            aria-label="Назад"
          />
          <Box>
            <Heading color="brand.500" size="lg">
              {isEdit ? 'Редагувати урок' : 'Створити урок'}
            </Heading>
            {course && (
              <Text color="gray.600" fontSize="sm">
                Курс: {course.title} → Модуль: {getModuleName()}
              </Text>
            )}
          </Box>
        </HStack>

        <Box as="form" onSubmit={handleSubmit}>
          <VStack spacing={6} align="stretch">
            <FormControl isRequired>
              <FormLabel>Назва уроку</FormLabel>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Вступ до силових тренувань"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Контент уроку</FormLabel>
              <Textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Детальний опис уроку, інструкції, теорія..."
                rows={8}
              />
            </FormControl>

            <FormControl>
              <FormLabel>URL відео (YouTube, Vimeo тощо)</FormLabel>
              <Input
                value={formData.videoUrl}
                onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                placeholder="https://www.youtube.com/watch?v=..."
              />
            </FormControl>

            <HStack spacing={4}>
              <FormControl>
                <FormLabel>Тривалість (хвилини)</FormLabel>
                <NumberInput
                  value={formData.duration}
                  onChange={(value) => setFormData({ ...formData, duration: parseInt(value) || 0 })}
                  min={0}
                >
                  <NumberInputField placeholder="15" />
                </NumberInput>
              </FormControl>

              <FormControl>
                <FormLabel>Порядок</FormLabel>
                <NumberInput
                  value={formData.order}
                  onChange={(value) => setFormData({ ...formData, order: parseInt(value) || 1 })}
                  min={1}
                >
                  <NumberInputField placeholder="1" />
                </NumberInput>
              </FormControl>
            </HStack>

            {/* Resources */}
            <Box>
              <HStack justify="space-between" mb={4}>
                <Text fontWeight="bold" fontSize="lg">Ресурси</Text>
                <Button leftIcon={<FiPlus />} size="sm" onClick={addResource}>
                  Додати ресурс
                </Button>
              </HStack>

              <VStack spacing={4} align="stretch">
                {formData.resources.map((resource, index) => (
                  <Box key={index} p={4} borderWidth="1px" borderRadius="md">
                    <HStack justify="space-between" mb={3}>
                      <Text fontWeight="medium">Ресурс {index + 1}</Text>
                      <IconButton
                        icon={<FiTrash2 />}
                        size="sm"
                        colorScheme="red"
                        variant="ghost"
                        onClick={() => removeResource(index)}
                        aria-label="Видалити ресурс"
                      />
                    </HStack>

                    <VStack spacing={3}>
                      <FormControl isRequired>
                        <FormLabel fontSize="sm">Назва ресурсу</FormLabel>
                        <Input
                          value={resource.title}
                          onChange={(e) => updateResource(index, 'title', e.target.value)}
                          placeholder="Додаткові матеріали"
                          size="sm"
                        />
                      </FormControl>

                      <FormControl isRequired>
                        <FormLabel fontSize="sm">URL ресурсу</FormLabel>
                        <Input
                          value={resource.url}
                          onChange={(e) => updateResource(index, 'url', e.target.value)}
                          placeholder="https://example.com/resource.pdf"
                          size="sm"
                        />
                      </FormControl>

                      <FormControl>
                        <FormLabel fontSize="sm">Тип</FormLabel>
                        <HStack spacing={2}>
                          {['pdf', 'video', 'link', 'image'].map(type => (
                            <Button
                              key={type}
                              size="sm"
                              variant={resource.type === type ? 'solid' : 'outline'}
                              colorScheme={resource.type === type ? 'brand' : 'gray'}
                              onClick={() => updateResource(index, 'type', type)}
                            >
                              {type.toUpperCase()}
                            </Button>
                          ))}
                        </HStack>
                      </FormControl>
                    </VStack>
                  </Box>
                ))}

                {formData.resources.length === 0 && (
                  <Text color="gray.500" textAlign="center" py={4}>
                    Ресурсів поки немає. Додайте перший!
                  </Text>
                )}
              </VStack>
            </Box>

            {/* Actions */}
            <HStack spacing={4} pt={4}>
              <Button
                type="submit"
                colorScheme="brand"
                isLoading={loading}
                flex={1}
              >
                {isEdit ? 'Оновити урок' : 'Створити урок'}
              </Button>
              <Button
                variant="ghost"
                onClick={() => navigate(`/admin/courses/${courseId}/edit`)}
                flex={1}
              >
                Скасувати
              </Button>
            </HStack>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}
