import { useState } from 'react';
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
    useColorModeValue
} from '@chakra-ui/react';
import { FiCalendar, FiUser } from 'react-icons/fi';

// Тимчасові mock дані для демонстрації
const mockNews = [
    {
        id: 1,
        title: 'Відкриття нового залу для функціонального тренування',
        description: 'Ми раді повідомити про відкриття нового залу площею 200 кв.м, обладнаного найсучаснішим обладнанням для функціонального тренування. Тут ви знайдете все необхідне для ефективних тренувань: TRX петлі, медболи, гирі, канати та багато іншого.',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
        category: 'Подія',
        date: '2025-11-15',
        author: 'Адміністрація TernyGym'
    },
    {
        id: 2,
        title: 'Наша команда здобула перше місце на чемпіонаті',
        description: 'Вітаємо нашу команду з блискучою перемогою на обласному чемпіонаті з кросфіту! Наші спортсмени показали неймовірні результати та командний дух. Особливо відзначаємо Олександра Петренка, який встановив новий рекорд у категорії RX.',
        image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80',
        category: 'Досягнення',
        date: '2025-11-10',
        author: 'Тренерський склад'
    },
    {
        id: 3,
        title: 'Новий розклад групових тренувань',
        description: 'З 1 грудня запускаємо оновлений розклад групових тренувань! Додано нові напрямки: йога для початківців, пілатес, стретчинг та HIIT тренування. Також збільшено кількість занять у вечірній час для вашої зручності.',
        image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=80',
        category: 'Оголошення',
        date: '2025-11-05',
        author: 'Адміністрація TernyGym'
    },
    {
        id: 4,
        title: 'Майстер-клас від чемпіона світу',
        description: 'Запрошуємо на унікальний майстер-клас від чемпіона світу з бодібілдингу Дмитра Іваненка! Він поділиться секретами ефективних тренувань, правильного харчування та мотивації. Кількість місць обмежена, реєструйтесь заздалегідь!',
        image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=80',
        category: 'Подія',
        date: '2025-11-01',
        author: 'Адміністрація TernyGym'
    }
];

export default function Home() {
    const [expandedId, setExpandedId] = useState(null);

    const bgColor = useColorModeValue('white', 'gray.700');
    const textColor = useColorModeValue('gray.600', 'gray.300');
    const borderColor = useColorModeValue('gray.200', 'gray.600');

    const getCategoryColor = (category) => {
        switch (category) {
            case 'Подія': return 'blue';
            case 'Досягнення': return 'green';
            case 'Оголошення': return 'orange';
            default: return 'gray';
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

    return (
        <Container maxW="container.xl" py={12}>
            <VStack spacing={8} align="stretch">
                {/* Header */}
                <Box textAlign="center">
                    <Heading color="brand.500" size="2xl" mb={2}>
                        Новини TernyGym
                    </Heading>
                    <Text color={textColor} fontSize="lg">
                        Останні події, досягнення та оголошення нашого спортивного клубу
                    </Text>
                </Box>

                {/* News Grid */}
                <SimpleGrid columns={[1, 1, 2]} spacing={6}>
                    {mockNews.map((news) => (
                        <Card
                            key={news.id}
                            bg={bgColor}
                            borderWidth="1px"
                            borderColor={borderColor}
                            overflow="hidden"
                            transition="all 0.3s"
                            _hover={{ transform: 'translateY(-4px)', shadow: 'xl' }}
                        >
                            {/* Image */}
                            <Image
                                src={news.image}
                                alt={news.title}
                                objectFit="cover"
                                h="250px"
                                w="full"
                            />

                            <CardBody>
                                <VStack align="stretch" spacing={3}>
                                    {/* Category Badge */}
                                    <Badge
                                        colorScheme={getCategoryColor(news.category)}
                                        w="fit-content"
                                        fontSize="sm"
                                    >
                                        {news.category}
                                    </Badge>

                                    {/* Title */}
                                    <Heading size="md" color="brand.500">
                                        {news.title}
                                    </Heading>

                                    {/* Meta Info */}
                                    <HStack spacing={4} fontSize="sm" color={textColor}>
                                        <HStack>
                                            <FiCalendar />
                                            <Text>{formatDate(news.date)}</Text>
                                        </HStack>
                                        <HStack>
                                            <FiUser />
                                            <Text>{news.author}</Text>
                                        </HStack>
                                    </HStack>

                                    {/* Description */}
                                    <Text
                                        color={textColor}
                                        noOfLines={expandedId === news.id ? undefined : 3}
                                    >
                                        {news.description}
                                    </Text>

                                    {/* Read More Button */}
                                    <Button
                                        variant="link"
                                        colorScheme="brand"
                                        size="sm"
                                        onClick={() => toggleExpand(news.id)}
                                        alignSelf="flex-start"
                                    >
                                        {expandedId === news.id ? 'Згорнути' : 'Читати далі'}
                                    </Button>
                                </VStack>
                            </CardBody>
                        </Card>
                    ))}
                </SimpleGrid>

                {/* Info Box */}
                <Box
                    p={6}
                    bg="blue.50"
                    borderRadius="lg"
                    borderLeft="4px"
                    borderColor="blue.500"
                    textAlign="center"
                >
                    <Text color="blue.700" fontWeight="medium">
                        💡 Хочете бути в курсі всіх подій? Підпишіться на наші соціальні мережі!
                    </Text>
                </Box>
            </VStack>
        </Container>
    );
}