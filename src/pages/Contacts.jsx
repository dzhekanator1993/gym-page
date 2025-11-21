import {
    Container,
    Heading,
    Box,
    VStack,
    SimpleGrid,
    Text,
    HStack,
    Icon,
    Link,
    useColorModeValue,
    Divider
} from '@chakra-ui/react';
import { FiClock, FiPhone, FiMapPin, FiMail } from 'react-icons/fi';
import Classes from "../components/classCard/Classes.js";
import Header from "../components/header/Header.jsx";
import Info from "../components/info/Info.js";
import Service from "../components/service/Service.js";
import Services from "../components/services/Services.jsx";

const Contacts = () => {
    const bgColor = useColorModeValue('white', 'gray.700');
    const textColor = useColorModeValue('gray.600', 'gray.300');
    const borderColor = useColorModeValue('gray.200', 'gray.600');

    return (<>
        {/* Original Header with Image */}
        <Header />

        {/* Original Content Blocks */}
        <main className="section">
            <div className="container">
                <Info />
                <Services />
                <Classes />
                <Service />
            </div>
        </main>

        {/* Contact Information - Chakra UI */}
        <Container maxW="container.xl" py={12}>
            <VStack spacing={8} align="stretch">
                <Divider />

                <Heading size="xl" textAlign="center" color="brand.500">
                    Контактна Інформація
                </Heading>

                <SimpleGrid columns={[1, 1, 2]} spacing={6}>
                    {/* Working Hours */}
                    <Box bg={bgColor} p={6} borderRadius="lg" boxShadow="md" borderWidth="1px" borderColor={borderColor}>
                        <HStack mb={4}>
                            <Icon as={FiClock} color="brand.500" boxSize={6} />
                            <Heading size="md" color="brand.500">
                                Графік роботи
                            </Heading>
                        </HStack>
                        <VStack align="start" spacing={3}>
                            <Box>
                                <Text fontWeight="bold" color={textColor}>
                                    Понеділок - П'ятниця
                                </Text>
                                <Text color={textColor}>09:00 - 20:00</Text>
                            </Box>
                            <Box>
                                <Text fontWeight="bold" color={textColor}>
                                    Суббота
                                </Text>
                                <Text color={textColor}>09:00 - 14:00</Text>
                            </Box>
                            <Box>
                                <Text fontWeight="bold" color={textColor}>
                                    Неділя
                                </Text>
                                <Text color={textColor}>Вихідний</Text>
                            </Box>
                        </VStack>
                    </Box>

                    {/* Contact Details */}
                    <Box bg={bgColor} p={6} borderRadius="lg" boxShadow="md" borderWidth="1px" borderColor={borderColor}>
                        <HStack mb={4}>
                            <Icon as={FiPhone} color="brand.500" boxSize={6} />
                            <Heading size="md" color="brand.500">
                                Зв'язок
                            </Heading>
                        </HStack>
                        <VStack align="start" spacing={4}>
                            <HStack>
                                <Icon as={FiPhone} color={textColor} />
                                <Link href="tel:+380961737528" color="brand.500" fontWeight="medium">
                                    +38 (096) 173-75-28
                                </Link>
                            </HStack>
                            <HStack>
                                <Icon as={FiMail} color={textColor} />
                                <Text color={textColor}>Telegram: @ternygym</Text>
                            </HStack>
                        </VStack>
                    </Box>

                    {/* Location */}
                    <Box
                        bg={bgColor}
                        p={6}
                        borderRadius="lg"
                        boxShadow="md"
                        borderWidth="1px"
                        borderColor={borderColor}
                        gridColumn={['1', '1', 'span 2']}
                    >
                        <HStack mb={4}>
                            <Icon as={FiMapPin} color="brand.500" boxSize={6} />
                            <Heading size="md" color="brand.500">
                                Адреса
                            </Heading>
                        </HStack>
                        <Text color={textColor} fontSize="lg" mb={4}>
                            Ukraine, Kriviy Rig city, Uhtomskogo street, 26a
                        </Text>

                        {/* Map */}
                        <Box borderRadius="md" overflow="hidden" h="400px">
                            <iframe
                                title="TernyGym Location"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2645.123456789!2d33.3456789!3d47.9123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDU0JzQ0LjQiTiAzM8KwMjAnNDQuNCJF!5e0!3m2!1sen!2sua!4v1234567890123!5m2!1sen!2sua"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </Box>
                    </Box>
                </SimpleGrid>

                {/* Call to Action */}
                <Box
                    p={8}
                    bg="brand.500"
                    borderRadius="lg"
                    textAlign="center"
                    color="white"
                    mt={8}
                >
                    <Heading size="lg" mb={4}>
                        Готові почати?
                    </Heading>
                    <Text fontSize="lg" mb={6}>
                        Приєднуйтесь до TernyGym та досягайте своїх фітнес-цілей разом з нами!
                    </Text>
                    <Link
                        href="tel:+380961737528"
                        bg="white"
                        color="brand.500"
                        px={8}
                        py={3}
                        borderRadius="md"
                        fontWeight="bold"
                        _hover={{ bg: 'gray.100' }}
                        display="inline-block"
                    >
                        Зателефонувати зараз
                    </Link>
                </Box>
            </VStack>
        </Container>
    </>);
}

export default Contacts;