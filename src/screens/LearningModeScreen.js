import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const LearningModeScreen = ({ navigation }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showCompletion, setShowCompletion] = useState(false);
  const fadeAnim = new Animated.Value(1);

  const words = [
    { word: 'Hello', translation: 'Merhaba', example: 'Hello, how are you?' },
    { word: 'Goodbye', translation: 'Hoşçakal', example: 'Goodbye, see you tomorrow!' },
    { word: 'Thank you', translation: 'Teşekkür ederim', example: 'Thank you for your help.' },
    { word: 'Please', translation: 'Lütfen', example: 'Please help me.' },
    { word: 'Sorry', translation: 'Özür dilerim', example: 'I am sorry for being late.' },
    { word: 'Yes', translation: 'Evet', example: 'Yes, I understand.' },
    { word: 'No', translation: 'Hayır', example: 'No, thank you.' },
    { word: 'Maybe', translation: 'Belki', example: 'Maybe we can meet tomorrow.' },
    { word: 'Help', translation: 'Yardım', example: 'Can you help me?' },
    { word: 'Time', translation: 'Zaman', example: 'What time is it?' },
    { word: 'Day', translation: 'Gün', example: 'Have a nice day!' },
    { word: 'Night', translation: 'Gece', example: 'Good night!' },
    { word: 'Morning', translation: 'Sabah', example: 'Good morning!' },
    { word: 'Afternoon', translation: 'Öğleden sonra', example: 'Good afternoon!' },
    { word: 'Evening', translation: 'Akşam', example: 'Good evening!' },
  ];

  useEffect(() => {
    setShowTranslation(false);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [currentWordIndex]);

  const handleShowTranslation = () => {
    setShowTranslation(true);
  };

  const handleNext = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      if (currentWordIndex < words.length - 1) {
        setCurrentWordIndex(currentWordIndex + 1);
        setProgress(((currentWordIndex + 1) / words.length) * 100);
      } else {
        setShowCompletion(true);
      }
    });
  };

  const handleRestart = () => {
    setCurrentWordIndex(0);
    setShowTranslation(false);
    setProgress(0);
    setShowCompletion(false);
  };

  if (showCompletion) {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#4CAF50', '#2E7D32']}
          style={styles.header}
        >
          <Text style={styles.headerTitle}>Tebrikler!</Text>
        </LinearGradient>

        <View style={styles.content}>
          <View style={styles.completionCard}>
            <Text style={styles.completionTitle}>Tüm Kelimeleri Tamamladınız!</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.actionButton} onPress={handleRestart}>
                <Text style={styles.actionButtonText}>Yeniden Başla</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.continueButton]}
                onPress={() => navigation.navigate('QuizMode')}
              >
                <Text style={styles.actionButtonText}>Sınava Geç</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.homeButton]}
                onPress={() => navigation.navigate('Home')}
              >
                <Text style={styles.homeButtonText}>Ana Sayfaya Dön</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }

  const currentWord = words[currentWordIndex];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#4CAF50', '#2E7D32']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Öğrenme Modu</Text>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${progress}%` },
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            {currentWordIndex + 1}/{words.length}
          </Text>
        </View>

        <Animated.View
          style={[
            styles.wordContainer,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <Text style={styles.word}>{currentWord.word}</Text>
          {showTranslation && (
            <>
              <Text style={styles.translation}>{currentWord.translation}</Text>
              <Text style={styles.example}>{currentWord.example}</Text>
            </>
          )}
        </Animated.View>

        <View style={styles.buttonContainer}>
          {!showTranslation ? (
            <TouchableOpacity style={styles.showButton} onPress={handleShowTranslation}>
              <Text style={styles.showButtonText}>Çeviriyi Göster</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
              <Text style={styles.nextButtonText}>Sonraki</Text>
            </TouchableOpacity>
          )}
        </View>
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
  wordContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  word: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 20,
  },
  translation: {
    fontSize: 24,
    color: '#4CAF50',
    marginBottom: 10,
  },
  example: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginTop: 20,
  },
  buttonContainer: {
    gap: 15,
  },
  showButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  showButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  nextButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  completionCard: {
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
  completionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 30,
    textAlign: 'center',
  },
  actionButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  continueButton: {
    backgroundColor: '#2196F3',
  },
  homeButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  homeButtonText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LearningModeScreen; 