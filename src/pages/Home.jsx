import { useState, useEffect } from 'react';
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
    useColorModeValue,
    useToast,
    Spinner,
    IconButton,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    ModalFooter,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Select,
    useDisclosure,
} from '@chakra-ui/react';
import { FiCalendar, FiUser, FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { newsService } from '../services/news.service';
import { authService } from '../services/auth.service';

export default function Home() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedId, setExpandedId] = useState(null);
    const [editingNews, setEditingNews] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        imageUrl: '',
        category: 'fitness',
        tags: '',
        isPublished: true,
    });

    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    const bgColor = useColorModeValue('white', 'gray.700');
    const textColor = useColorModeValue('gray.600', 'gray.300');
    const borderColor = useColorModeValue('gray.200', 'gray.600');

    const isAdmin = authService.isAdmin();

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            setLoading(true);
            const response = await newsService.getAllNews({ limit: 20 });
            setNews(response.data);
        } catch (error) {
            toast({
                title: 'Помилка',
                description: 'Не вдалося завантажити новини',
                status: 'error',
                duration: 3000,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (newsItem = null) => {
        if (newsItem) {
            setEditingNews(newsItem);
            setFormData({
                title: newsItem.title,
                content: newsItem.content,
                imageUrl: newsItem.imageUrl || '',
                category: newsItem.category,
                tags: newsItem.tags?.join(', ') || '',
                isPublished: newsItem.isPublished,
            });
        } else {
            setEditingNews(null);
            setFormData({
                title: '',
                content: '',
                imageUrl: '',
                category: 'fitness',
                tags: '',
                isPublished: true,
            });
        }
        onOpen();
    };

    const handleSubmit = async () => {
        try {
            const newsData = {
                ...formData,
                tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
            };

            if (editingNews) {
                await newsService.updateNews(editingNews._id, newsData);
                toast({
                    title: 'Успіх',
                    description: 'Новину оновлено',
                    status: 'success',
                    duration: 3000,
                });
            } else {
                await newsService.createNews(newsData);
                toast({
                    title: 'Успіх',
                    description: 'Новину створено',
                    status: 'success',
                    duration: 3000,
                });
            }

            onClose();
            fetchNews();
        } catch (error) {
            toast({
                title: 'Помилка',
                description: error.response?.data?.message || 'Не вдалося зберегти новину',
                status: 'error',
                duration: 3000,
            });
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Видалити цю новину?')) return;

        try {
            await newsService.deleteNews(id);
            toast({
                title: 'Успіх',
                description: 'Новину видалено',
                status: 'success',
                duration: 3000,
            });
            fetchNews();
        } catch (error) {
            toast({
                title: 'Помилка',
                description: 'Не вдалося видалити новину',
                status: 'error',
                duration: 3000,
            });
        }
    };

    const getCategoryColor = (category) => {
        switch (category) {
            case 'fitness': return 'blue';
            case 'nutrition': return 'green';
            case 'lifestyle': return 'orange';
            default: return 'gray';
        }
    };

    const getCategoryLabel = (category) => {
        switch (category) {
            case 'fitness': return 'Фітнес';
            case 'nutrition': return 'Харчування';
            case 'lifestyle': return 'Стиль життя';
            default: return category;
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('uk-UA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    if (loading) {
        return (
            <Container maxW="container.xl" py={12}>
                <VStack spacing={8}>
                    <Spinner size="xl" color="brand.500" />
                    <Text>Завантаження новин...</Text>
                </VStack>
            </Container>
        );
    }

    return (
        <Container maxW="container.xl" py={12}>
            <VStack spacing={8} align="stretch">
                {/* Header */}
                <Box textAlign="center">
                    <Heading color="brand.500" size="2xl" mb={2}>
                        Новини TernyGym
                    </Heading>
                    <Text color={textColor} fontSize="lg">
                        Останні події, досягнення та оголошення у нашому закритому клубі TernyGym
                    </Text>
                </Box>

                {/* Admin Add Button */}
                {isAdmin && (
                    <Box>
                        <Button
                            leftIcon={<FiPlus />}
                            colorScheme="brand"
                            onClick={() => handleOpenModal()}
                        >
                            Додати новину
                        </Button>
                    </Box>
                )}

                {/* News Grid */}
                {news.length === 0 ? (
                    <Box textAlign="center" py={12}>
                        <Text color={textColor} fontSize="lg">
                            Поки що немає новин
                        </Text>
                    </Box>
                ) : (
                    <SimpleGrid columns={[1, 1, 2]} spacing={6}>
                        {news.map((newsItem) => (
                            <Card
                                key={newsItem._id}
                                bg={bgColor}
                                borderWidth="1px"
                                borderColor={borderColor}
                                overflow="hidden"
                                transition="all 0.3s"
                                _hover={{ transform: 'translateY(-4px)', shadow: 'xl' }}
                            >
                                {/* Image */}
                                {newsItem.imageUrl && (
                                    <Image
                                        src={newsItem.imageUrl}
                                        alt={newsItem.title}
                                        objectFit="cover"
                                        h="250px"
                                        w="full"
                                        fallbackSrc="https://via.placeholder.com/800x250?text=TernyGym"
                                    />
                                )}

                                <CardBody>
                                    <VStack align="stretch" spacing={3}>
                                        {/* Category Badge & Admin Actions */}
                                        <HStack justify="space-between">
                                            <Badge
                                                colorScheme={getCategoryColor(newsItem.category)}
                                                fontSize="sm"
                                            >
                                                {getCategoryLabel(newsItem.category)}
                                            </Badge>

                                            {isAdmin && (
                                                <HStack spacing={2}>
                                                    <IconButton
                                                        icon={<FiEdit2 />}
                                                        size="sm"
                                                        colorScheme="blue"
                                                        variant="ghost"
                                                        onClick={() => handleOpenModal(newsItem)}
                                                        aria-label="Редагувати"
                                                    />
                                                    <IconButton
                                                        icon={<FiTrash2 />}
                                                        size="sm"
                                                        colorScheme="red"
                                                        variant="ghost"
                                                        onClick={() => handleDelete(newsItem._id)}
                                                        aria-label="Видалити"
                                                    />
                                                </HStack>
                                            )}
                                        </HStack>

                                        {/* Title */}
                                        <Heading size="md" color="brand.500">
                                            {newsItem.title}
                                        </Heading>

                                        {/* Meta Info */}
                                        <HStack spacing={4} fontSize="sm" color={textColor}>
                                            <HStack>
                                                <FiCalendar />
                                                <Text>{formatDate(newsItem.publishedAt || newsItem.createdAt)}</Text>
                                            </HStack>
                                            {newsItem.author && (
                                                <HStack>
                                                    <FiUser />
                                                    <Text>{newsItem.author.username}</Text>
                                                </HStack>
                                            )}
                                        </HStack>

                                        {/* Tags */}
                                        {newsItem.tags && newsItem.tags.length > 0 && (
                                            <HStack spacing={2} flexWrap="wrap">
                                                {newsItem.tags.map((tag, index) => (
                                                    <Badge key={index} variant="subtle" colorScheme="gray">
                                                        {tag}
                                                    </Badge>
                                                ))}
                                            </HStack>
                                        )}

                                        {/* Description */}
                                        <Text
                                            color={textColor}
                                            noOfLines={expandedId === newsItem._id ? undefined : 3}
                                        >
                                            {newsItem.content}
                                        </Text>

                                        {/* Read More Button */}
                                        {newsItem.content.length > 150 && (
                                            <Button
                                                variant="link"
                                                colorScheme="brand"
                                                size="sm"
                                                onClick={() => toggleExpand(newsItem._id)}
                                                alignSelf="flex-start"
                                            >
                                                {expandedId === newsItem._id ? 'Згорнути' : 'Читати далі'}
                                            </Button>
                                        )}
                                    </VStack>
                                </CardBody>
                            </Card>
                        ))}
                    </SimpleGrid>
                )}
            </VStack>

            {/* Add/Edit Modal */}
            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        {editingNews ? 'Редагувати новину' : 'Додати новину'}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <FormControl isRequired>
                                <FormLabel>Заголовок</FormLabel>
                                <Input
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="Введіть заголовок новини"
                                />
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel>Контент</FormLabel>
                                <Textarea
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    placeholder="Введіть текст новини"
                                    rows={6}
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

                            <FormControl isRequired>
                                <FormLabel>Категорія</FormLabel>
                                <Select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                >
                                    <option value="fitness">Фітнес</option>
                                    <option value="nutrition">Харчування</option>
                                    <option value="lifestyle">Стиль життя</option>
                                </Select>
                            </FormControl>

                            <FormControl>
                                <FormLabel>Теги (через кому)</FormLabel>
                                <Input
                                    value={formData.tags}
                                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                    placeholder="новини, тренування, здоров'я"
                                />
                            </FormControl>

                            <FormControl display="flex" alignItems="center">
                                <FormLabel mb="0">Опублікувати</FormLabel>
                                <input
                                    type="checkbox"
                                    checked={formData.isPublished}
                                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                                />
                            </FormControl>
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant="ghost" mr={3} onClick={onClose}>
                            Скасувати
                        </Button>
                        <Button colorScheme="brand" onClick={handleSubmit}>
                            {editingNews ? 'Оновити' : 'Створити'}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Container>
    );
}