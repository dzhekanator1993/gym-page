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
  RadioGroup,
  Radio,
  Stack,
  useToast,
  useColorModeValue,
  Icon
} from '@chakra-ui/react';
import ReactPlayer from 'react-player';
import { FiArrowLeft, FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import { useState } from 'react';

// Тимчасові дані уроків
const mockLessons = {
  1: {
    title: 'Що таке фітнес?',
    type: 'video',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    description: 'У цьому уроці ви дізнаєтесь про основні принципи фітнесу та його вплив на здоров\'я.',
    courseId: 1
  },
  2: {
    title: 'Базові принципи',
    type: 'text',
    content: `
# Базові принципи фітнесу

## 1. Регулярність
Тренуйтесь регулярно, мінімум 3 рази на тиждень.Постійність - ключ до успіху.

## 2. Прогресивне навантаження
Поступово збільшуйте інтенсивність тренувань.Це може бути більша вага, більше повторень або менший час відпочинку.

## 3. Відновлення
Давайте м'язам час на відновлення. Сон та правильне харчування - важливі складові.

## 4. Різноманітність
Змінюйте вправи та типи тренувань, щоб уникнути плато та підтримувати мотивацію.

## 5. Правильна техніка
Завжди виконуйте вправи з правильною технікою, щоб уникнути травм.
    `,
    courseId: 1
  },
  3: {
    title: 'Тест: Перевірка знань',
    type: 'quiz',
    questions: [
      {
        id: 1,
        question: 'Скільки разів на тиждень рекомендується тренуватись?',
        options: ['1-2 рази', '3-5 разів', '7 разів', 'Кожен день без вихідних'],
        correctAnswer: 1
      },
      {
        id: 2,
        question: 'Що таке прогресивне навантаження?',
        options: [
          'Тренування тільки з великою вагою',
          'Поступове збільшення інтенсивності',
          'Тренування без відпочинку',
          'Виконання однакових вправ'
        ],
        correctAnswer: 1
      },
      {
        id: 3,
        question: 'Чому важлива правильна техніка виконання вправ?',
        options: [
          'Щоб виглядати професійно',
          'Щоб уникнути травм',
          'Щоб швидше закінчити тренування',
          'Це не важливо'
        ],
        correctAnswer: 1
      }
    ],
    courseId: 1
  },
  4: {
    title: 'Важливість розминки',
    type: 'video',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    description: 'Дізнайтесь, чому розминка є критично важливою частиною кожного тренування.',
    courseId: 1
  },
};

export default function Lesson() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const lesson = mockLessons[id];

  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const bgColor = useColorModeValue('white', 'gray.700');

  if (!lesson) {
    return (
      <Container maxW="container.md" py={12}>
        <Text>Урок не знайдено</Text>
        <Button onClick={() => navigate('/courses')} mt={4}>
          Назад до курсів
        </Button>
      </Container>
    );
  }

  const lessonId = parseInt(id);
  const nextLessonId = lessonId + 1;
  const hasNextLesson = mockLessons[nextLessonId];

  const handleQuizSubmit = () => {
    let correct = 0;
    lesson.questions.forEach((q) => {
      if (parseInt(quizAnswers[q.id]) === q.correctAnswer) {
        correct++;
      }
    });
    setQuizScore(correct);
    setQuizSubmitted(true);

    const percentage = (correct / lesson.questions.length) * 100;
    toast({
      title: percentage >= 70 ? 'Вітаємо!' : 'Спробуйте ще раз',
      description: `Ви відповіли правильно на ${ correct } з ${ lesson.questions.length } питань(${ percentage.toFixed(0) } %)`,
      status: percentage >= 70 ? 'success' : 'warning',
      duration: 5000,
      isClosable: true,
    });
  };

  const handleCompleteLesson = () => {
    toast({
      title: 'Урок завершено!',
      description: 'Ваш прогрес збережено',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });

    if (hasNextLesson) {
      setTimeout(() => navigate(`/ lesson / ${ nextLessonId } `), 1500);
    } else {
      setTimeout(() => navigate(`/ course / ${ lesson.courseId } `), 1500);
    }
  };

  return (
    <Container maxW="container.xl" py={8}>
      <Button
        leftIcon={<FiArrowLeft />}
        variant="ghost"
        mb={6}
        onClick={() => navigate(`/ course / ${ lesson.courseId } `)}
      >
        Назад до курсу
      </Button>

      <VStack spacing={6} align="stretch">
        {/* Header */}
        <Box>
          <HStack mb={2}>
            <Badge colorScheme={
              lesson.type === 'video' ? 'purple' :
                lesson.type === 'quiz' ? 'orange' : 'blue'
            }>
              {lesson.type === 'video' ? 'Відеоурок' :
                lesson.type === 'quiz' ? 'Тестування' : 'Текстовий урок'}
            </Badge>
            <Text color="gray.500">Урок #{id}</Text>
          </HStack>
          <Heading color="brand.500" size="xl">
            {lesson.title}
          </Heading>
        </Box>

        {/* Content based on type */}
        {lesson.type === 'video' && (
          <>
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

            <Box bg={bgColor} p={6} borderRadius="lg" boxShadow="md">
              <Heading size="md" mb={3}>
                Опис уроку
              </Heading>
              <Text color="gray.600">
                {lesson.description}
              </Text>
            </Box>
          </>
        )}

        {lesson.type === 'text' && (
          <Box bg={bgColor} p={8} borderRadius="lg" boxShadow="md">
            <Box
              dangerouslySetInnerHTML={{
                __html: lesson.content
                  .split('\n')
                  .map(line => {
                    if (line.startsWith('# ')) return `< h1 style = "font-size: 2em; font-weight: bold; margin: 1em 0 0.5em; color: #4F46E5;" > ${ line.slice(2) }</h1 > `;
                    if (line.startsWith('## ')) return `< h2 style = "font-size: 1.5em; font-weight: bold; margin: 1em 0 0.5em; color: #4F46E5;" > ${ line.slice(3) }</h2 > `;
                    if (line.trim() === '') return '<br/>';
                    return `< p style = "margin: 0.5em 0; line-height: 1.6;" > ${ line }</p > `;
                  })
                  .join('')
              }}
            />
          </Box>
        )}

        {lesson.type === 'quiz' && (
          <Box bg={bgColor} p={8} borderRadius="lg" boxShadow="md">
            <Heading size="md" mb={6}>
              Тестування знань
            </Heading>

            <VStack spacing={6} align="stretch">
              {lesson.questions.map((question, index) => (
                <Box key={question.id} p={4} bg="gray.50" borderRadius="md">
                  <Text fontWeight="bold" mb={3}>
                    {index + 1}. {question.question}
                  </Text>
                  <RadioGroup
                    value={quizAnswers[question.id]?.toString()}
                    onChange={(value) => setQuizAnswers({ ...quizAnswers, [question.id]: value })}
                    isDisabled={quizSubmitted}
                  >
                    <Stack spacing={2}>
                      {question.options.map((option, optIndex) => {
                        const isCorrect = optIndex === question.correctAnswer;
                        const isSelected = parseInt(quizAnswers[question.id]) === optIndex;

                        return (
                          <Radio
                            key={optIndex}
                            value={optIndex.toString()}
                            colorScheme={
                              quizSubmitted
                                ? (isCorrect ? 'green' : (isSelected ? 'red' : 'gray'))
                                : 'brand'
                            }
                          >
                            <HStack>
                              <Text>{option}</Text>
                              {quizSubmitted && isCorrect && (
                                <Badge colorScheme="green">Правильно</Badge>
                              )}
                            </HStack>
                          </Radio>
                        );
                      })}
                    </Stack>
                  </RadioGroup>
                </Box>
              ))}
            </VStack>

            {!quizSubmitted ? (
              <Button
                colorScheme="brand"
                size="lg"
                w="full"
                mt={6}
                onClick={handleQuizSubmit}
                isDisabled={Object.keys(quizAnswers).length !== lesson.questions.length}
              >
                Перевірити відповіді
              </Button>
            ) : (
              <Box mt={6} p={4} bg={quizScore >= lesson.questions.length * 0.7 ? 'green.50' : 'orange.50'} borderRadius="md">
                <HStack justify="center">
                  <Icon as={FiCheckCircle} color={quizScore >= lesson.questions.length * 0.7 ? 'green.500' : 'orange.500'} boxSize={6} />
                  <Text fontWeight="bold" fontSize="lg">
                    Результат: {quizScore}/{lesson.questions.length} ({((quizScore / lesson.questions.length) * 100).toFixed(0)}%)
                  </Text>
                </HStack>
              </Box>
            )}
          </Box>
        )}

        <Divider />

        {/* Navigation */}
        <HStack justify="space-between">
          <Button
            leftIcon={<FiArrowLeft />}
            variant="outline"
            colorScheme="brand"
            onClick={() => navigate(`/ course / ${ lesson.courseId } `)}
          >
            До списку уроків
          </Button>

          <HStack>
            <Button
              colorScheme="green"
              leftIcon={<FiCheckCircle />}
              onClick={handleCompleteLesson}
            >
              Завершити урок
            </Button>

            {hasNextLesson && (
              <Button
                rightIcon={<FiArrowRight />}
                colorScheme="brand"
                onClick={() => navigate(`/ lesson / ${ nextLessonId } `)}
              >
                Наступний урок
              </Button>
            )}
          </HStack>
        </HStack>
      </VStack>
    </Container>
  );
}
