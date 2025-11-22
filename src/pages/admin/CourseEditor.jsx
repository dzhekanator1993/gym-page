import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  Heading,
  VStack,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  useToast,
  Box,
  HStack,
  IconButton,
  Text,
} from '@chakra-ui/react';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import { courseService } from '../../services/course.service';

export default function CourseEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    category: 'fitness',
    difficulty: 'beginner',
    modules: []
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      fetchCourse();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchCourse = async () => {
    try {
      const response = await courseService.getCourseById(id);
      setFormData(response.data);
    } catch (error) {
      toast({
        title: 'Помилка',
        description: 'Не вдалося завантажити курс',
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
        await courseService.updateCourse(id, formData);
        toast({
          title: 'Успіх',
          description: 'Курс оновлено',
          status: 'success',
          duration: 3000,
        });
      } else {
        await courseService.createCourse(formData);
        toast({
          title: 'Успіх',
          description: 'Курс створено',
          status: 'success',
          duration: 3000,
        });
      }
      navigate('/admin/courses');
    } catch (error) {
      toast({
        title: 'Помилка',
        description: error.response?.data?.message || 'Не вдалося зберегти курс',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const addModule = () => {
    setFormData({
      ...formData,
      modules: [
        ...formData.modules,
        { title: '', description: '', order: formData.modules.length + 1, lessons: [] }
      ]
    });
  };

  const removeModule = (index) => {
    const newModules = formData.modules.filter((_, i) => i !== index);
    setFormData({ ...formData, modules: newModules });
  };

  const updateModule = (index, field, value) => {
    const newModules = [...formData.modules];
    newModules[index][field] = value;
    setFormData({ ...formData, modules: newModules });
  };

  return (
    <Container maxW="container.md" py={12}>
      <VStack spacing={8} align="stretch">
        <Heading color="brand.500">
          {isEdit ? 'Редагувати курс' : 'Створити курс'}
        </Heading>

        <Box as="form" onSubmit={handleSubmit}>
          <VStack spacing={6} align="stretch">
            <FormControl isRequired>
              <FormLabel>Назва курсу</FormLabel>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Основи силового тренування"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Опис</FormLabel>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Детальний опис курсу..."
                rows={4}
              />
            </FormControl>

            <FormControl>
              <FormLabel>URL зображення</FormLabel>
              <Input
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                placeholder="https://example.com/image.jpg"
              />
            </FormControl>

            <HStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Категорія</FormLabel>
                <Select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="fitness">Фітнес</option>
                  <option value="nutrition">Харчування</option>
                  <option value="lifestyle">Стиль життя</option>
                  <option value="strength">Силові</option>
                  <option value="cardio">Кардіо</option>
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Рівень складності</FormLabel>
                <Select
                  value={formData.difficulty}
                  onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                >
                  <option value="beginner">Початківець</option>
                  <option value="intermediate">Середній</option>
                  <option value="advanced">Просунутий</option>
                </Select>
              </FormControl>
            </HStack>

            {/* Modules */}
            <Box>
              <HStack justify="space-between" mb={4}>
                <Text fontWeight="bold" fontSize="lg">Модулі</Text>
                <Button leftIcon={<FiPlus />} size="sm" onClick={addModule}>
                  Додати модуль
                </Button>
              </HStack>

              <VStack spacing={4} align="stretch">
                {formData.modules.map((module, index) => (
                  <Box key={index} p={4} borderWidth="1px" borderRadius="md">
                    <HStack justify="space-between" mb={3}>
                      <Text fontWeight="medium">Модуль {index + 1}</Text>
                      <IconButton
                        icon={<FiTrash2 />}
                        size="sm"
                        colorScheme="red"
                        variant="ghost"
                        onClick={() => removeModule(index)}
                        aria-label="Видалити модуль"
                      />
                    </HStack>

                    <VStack spacing={3}>
                      <FormControl isRequired>
                        <FormLabel fontSize="sm">Назва модуля</FormLabel>
                        <Input
                          value={module.title}
                          onChange={(e) => updateModule(index, 'title', e.target.value)}
                          placeholder="Вступ"
                          size="sm"
                        />
                      </FormControl>

                      <FormControl>
                        <FormLabel fontSize="sm">Опис модуля</FormLabel>
                        <Textarea
                          value={module.description}
                          onChange={(e) => updateModule(index, 'description', e.target.value)}
                          placeholder="Короткий опис модуля"
                          size="sm"
                          rows={2}
                        />
                      </FormControl>
                    </VStack>
                  </Box>
                ))}

                {formData.modules.length === 0 && (
                  <Text color="gray.500" textAlign="center" py={4}>
                    Модулів поки немає. Додайте перший!
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
                {isEdit ? 'Оновити курс' : 'Створити курс'}
              </Button>
              <Button
                variant="ghost"
                onClick={() => navigate('/admin/courses')}
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
