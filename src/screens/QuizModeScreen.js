import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const QuizModeScreen = ({ navigation }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showFinalResults, setShowFinalResults] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const fadeAnim = new Animated.Value(1);

  const updateUserStats = async (correctCount, wrongCount) => {
    try {
      const savedStats = await AsyncStorage.getItem('userStats');
      let stats = savedStats ? JSON.parse(savedStats) : {
        totalWords: 0,
        learnedWords: 0,
        correctAnswers: 0,
        streak: 0,
        lastStudyDate: null,
      };

      stats.correctAnswers += correctCount;
      stats.learnedWords = Math.max(stats.learnedWords, stats.correctAnswers);

      // Streak güncelleme
      const today = new Date().toDateString();
      const lastStudyDate = stats.lastStudyDate ? new Date(stats.lastStudyDate).toDateString() : null;
      
      if (lastStudyDate === today) {
        // Bugün zaten çalışılmış
      } else if (lastStudyDate === new Date(Date.now() - 86400000).toDateString()) {
        // Dün çalışılmış, streak devam ediyor
        stats.streak += 1;
      } else {
        // Streak kırıldı
        stats.streak = 1;
      }

      stats.lastStudyDate = today;

      await AsyncStorage.setItem('userStats', JSON.stringify(stats));
    } catch (error) {
      console.error('İstatistikler güncellenirken hata oluştu:', error);
    }
  };

  const questions = [
    {
      question: 'What is the Turkish translation of "Hello"?',
      options: ['Merhaba', 'Hoşçakal', 'Teşekkür', 'Lütfen'],
      correctAnswer: 'Merhaba',
    },
    {
      question: 'What is the Turkish translation of "Goodbye"?',
      options: ['Merhaba', 'Hoşçakal', 'Teşekkür', 'Lütfen'],
      correctAnswer: 'Hoşçakal',
    },
    {
      question: 'What is the Turkish translation of "Thank you"?',
      options: ['Merhaba', 'Hoşçakal', 'Teşekkür', 'Lütfen'],
      correctAnswer: 'Teşekkür',
    },
    {
      question: 'What is the Turkish translation of "Please"?',
      options: ['Merhaba', 'Hoşçakal', 'Teşekkür', 'Lütfen'],
      correctAnswer: 'Lütfen',
    },
    {
      question: 'What is the Turkish translation of "Sorry"?',
      options: ['Özür', 'Teşekkür', 'Lütfen', 'Merhaba'],
      correctAnswer: 'Özür',
    },
    {
      question: 'What is the Turkish translation of "Yes"?',
      options: ['Hayır', 'Evet', 'Belki', 'Lütfen'],
      correctAnswer: 'Evet',
    },
    {
      question: 'What is the Turkish translation of "No"?',
      options: ['Evet', 'Belki', 'Hayır', 'Lütfen'],
      correctAnswer: 'Hayır',
    },
    {
      question: 'What is the Turkish translation of "Maybe"?',
      options: ['Evet', 'Hayır', 'Belki', 'Lütfen'],
      correctAnswer: 'Belki',
    },
    {
      question: 'What is the Turkish translation of "Help"?',
      options: ['Yardım', 'Teşekkür', 'Lütfen', 'Merhaba'],
      correctAnswer: 'Yardım',
    },
    {
      question: 'What is the Turkish translation of "Time"?',
      options: ['Gün', 'Zaman', 'Saat', 'Dakika'],
      correctAnswer: 'Zaman',
    },
  ];

  useEffect(() => {
    setSelectedAnswer(null);
    setShowResult(false);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [currentQuestionIndex]);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    setShowResult(true);
    if (answer === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
      setCorrectAnswers(correctAnswers + 1);
    } else {
      setWrongAnswers(wrongAnswers + 1);
    }
  };

  const handleNext = async () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(async () => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        await updateUserStats(correctAnswers, wrongAnswers);
        setShowFinalResults(true);
      }
    });
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setShowFinalResults(false);
    setCorrectAnswers(0);
    setWrongAnswers(0);
  };

  if (showFinalResults) {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#4CAF50', '#2E7D32']}
          style={styles.header}
        >
          <Text style={styles.headerTitle}>Sınav Sonuçları</Text>
        </LinearGradient>

        <View style={styles.content}>
          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>Sınav Tamamlandı!</Text>
            <View style={styles.resultStats}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{correctAnswers}</Text>
                <Text style={styles.statLabel}>Doğru Cevap</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{wrongAnswers}</Text>
                <Text style={styles.statLabel}>Yanlış Cevap</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>
                  {Math.round((correctAnswers / questions.length) * 100)}%
                </Text>
                <Text style={styles.statLabel}>Başarı Oranı</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.restartButton} onPress={handleRestart}>
              <Text style={styles.restartButtonText}>Sınavı Tekrarla</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.homeButton}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.homeButtonText}>Ana Sayfaya Dön</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#4CAF50', '#2E7D32']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Sınav Modu</Text>
        <Text style={styles.scoreText}>Skor: {score}</Text>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` },
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            {currentQuestionIndex + 1}/{questions.length}
          </Text>
        </View>

        <Animated.View
          style={[
            styles.questionContainer,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <Text style={styles.question}>{currentQuestion.question}</Text>
          <View style={styles.optionsContainer}>
            {currentQuestion.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  selectedAnswer === option && {
                    backgroundColor:
                      option === currentQuestion.correctAnswer
                        ? '#4CAF50'
                        : '#FF5252',
                  },
                ]}
                onPress={() => !showResult && handleAnswer(option)}
                disabled={showResult}
              >
                <Text
                  style={[
                    styles.optionText,
                    selectedAnswer === option && { color: '#FFFFFF' },
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {showResult && (
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>
              {currentQuestionIndex < questions.length - 1
                ? 'Sonraki Soru'
                : 'Sınavı Bitir'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  scoreText: {
    fontSize: 18,
    color: '#FFFFFF',
    marginTop: 10,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  progressContainer: {
    marginBottom: 30,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
  progressText: {
    textAlign: 'center',
    marginTop: 10,
    color: '#666666',
  },
  questionContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  question: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 30,
    textAlign: 'center',
  },
  optionsContainer: {
    gap: 15,
  },
  optionButton: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  optionText: {
    fontSize: 16,
    color: '#333333',
    textAlign: 'center',
  },
  nextButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 30,
  },
  resultStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 30,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#666666',
  },
  restartButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  restartButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  homeButton: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  homeButtonText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default QuizModeScreen; 