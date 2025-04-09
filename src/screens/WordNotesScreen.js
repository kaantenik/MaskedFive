import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WordNotesScreen = () => {
  const [words, setWords] = useState([]);
  const [word, setWord] = useState('');
  const [translation, setTranslation] = useState('');
  const [language, setLanguage] = useState('english');
  const [note, setNote] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  const updateUserStats = async (newWordAdded = true) => {
    try {
      const savedStats = await AsyncStorage.getItem('userStats');
      let stats = savedStats ? JSON.parse(savedStats) : {
        totalWords: 0,
        learnedWords: 0,
        correctAnswers: 0,
        streak: 0,
        lastStudyDate: null,
      };

      if (newWordAdded) {
        stats.totalWords += 1;
        stats.learnedWords += 1;
      }

      await AsyncStorage.setItem('userStats', JSON.stringify(stats));
    } catch (error) {
      console.error('İstatistikler güncellenirken hata oluştu:', error);
    }
  };

  const handleAddNote = async () => {
    if (!word || !translation) {
      Alert.alert('Hata', 'Lütfen kelime ve çevirisini giriniz.');
      return;
    }

    const newNote = {
      word,
      translation,
      language,
      note,
      date: new Date().toLocaleDateString(),
    };

    if (editingIndex !== null) {
      const updatedWords = [...words];
      updatedWords[editingIndex] = newNote;
      setWords(updatedWords);
      setEditingIndex(null);
    } else {
      setWords([...words, newNote]);
      await updateUserStats(true);
    }

    setWord('');
    setTranslation('');
    setNote('');
    setLanguage('english');
  };

  const handleDeleteNote = async (index) => {
    const updatedWords = words.filter((_, i) => i !== index);
    setWords(updatedWords);
    await updateUserStats(false);
  };

  const handleEditNote = (index) => {
    const noteToEdit = words[index];
    setWord(noteToEdit.word);
    setTranslation(noteToEdit.translation);
    setLanguage(noteToEdit.language);
    setNote(noteToEdit.note);
    setEditingIndex(index);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#4CAF50', '#2E7D32']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Kelime Notları</Text>
      </LinearGradient>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Kelime"
          value={word}
          onChangeText={setWord}
        />
        <TextInput
          style={styles.input}
          placeholder="Çeviri"
          value={translation}
          onChangeText={setTranslation}
        />
        <View style={styles.languageContainer}>
          <TouchableOpacity
            style={[
              styles.languageButton,
              language === 'english' && styles.selectedLanguage,
            ]}
            onPress={() => setLanguage('english')}
          >
            <Text style={styles.languageText}>İngilizce</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.languageButton,
              language === 'german' && styles.selectedLanguage,
            ]}
            onPress={() => setLanguage('german')}
          >
            <Text style={styles.languageText}>Almanca</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={[styles.input, styles.noteInput]}
          placeholder="Not"
          value={note}
          onChangeText={setNote}
          multiline
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddNote}>
          <Text style={styles.addButtonText}>
            {editingIndex !== null ? 'Notu Güncelle' : 'Not Ekle'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.notesContainer}>
        {words.map((item, index) => (
          <View key={index} style={styles.noteCard}>
            <View style={styles.noteHeader}>
              <Text style={styles.wordText}>{item.word}</Text>
              <View style={styles.noteActions}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleEditNote(index)}
                >
                  <Ionicons name="pencil" size={20} color="#4CAF50" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleDeleteNote(index)}
                >
                  <Ionicons name="trash" size={20} color="#FF5252" />
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.translationText}>{item.translation}</Text>
            <Text style={styles.languageText}>
              Dil: {item.language === 'english' ? 'İngilizce' : 'Almanca'}
            </Text>
            {item.note && <Text style={styles.noteText}>{item.note}</Text>}
            <Text style={styles.dateText}>{item.date}</Text>
          </View>
        ))}
      </ScrollView>
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
  formContainer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  noteInput: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 15,
  },
  languageContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  languageButton: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    marginHorizontal: 5,
  },
  selectedLanguage: {
    backgroundColor: '#4CAF50',
  },
  languageText: {
    fontSize: 14,
    color: '#333333',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  notesContainer: {
    flex: 1,
    padding: 20,
  },
  noteCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  wordText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  noteActions: {
    flexDirection: 'row',
  },
  actionButton: {
    marginLeft: 10,
  },
  translationText: {
    fontSize: 16,
    color: '#4CAF50',
    marginBottom: 5,
  },
  noteText: {
    fontSize: 14,
    color: '#666666',
    marginTop: 10,
  },
  dateText: {
    fontSize: 12,
    color: '#999999',
    marginTop: 10,
  },
});

export default WordNotesScreen; 