import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#4CAF50', '#2E7D32']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.greeting}>Merhaba!</Text>
          <Text style={styles.subtitle}>Bugün ne öğrenmek istersin?</Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Günlük Hedefler</Text>
          <View style={styles.goalCard}>
            <Text style={styles.goalText}>Günlük 10 kelime öğren</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progress, { width: '60%' }]} />
            </View>
            <Text style={styles.progressText}>6/10 tamamlandı</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Öğrenme Modları</Text>
          <View style={styles.modesContainer}>
            <TouchableOpacity
              style={styles.modeCard}
              onPress={() => navigation.navigate('LearningMode')}
            >
              <LinearGradient
                colors={['#2196F3', '#1976D2']}
                style={styles.modeGradient}
              >
                <Ionicons name="book-outline" size={40} color="#FFFFFF" />
                <Text style={styles.modeTitle}>Öğrenme Modu</Text>
                <Text style={styles.modeDescription}>Kelimeleri öğren</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modeCard}
              onPress={() => navigation.navigate('QuizMode')}
            >
              <LinearGradient
                colors={['#FF9800', '#F57C00']}
                style={styles.modeGradient}
              >
                <Ionicons name="school-outline" size={40} color="#FFFFFF" />
                <Text style={styles.modeTitle}>Sınav Modu</Text>
                <Text style={styles.modeDescription}>Bilgini test et</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Önerilen Kurslar</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity 
              style={styles.courseCard}
              onPress={() => navigation.navigate('CourseDetail')}
            >
              <LinearGradient
                colors={['#FF9800', '#F57C00']}
                style={styles.courseGradient}
              >
                <Text style={styles.courseTitle}>Temel İngilizce</Text>
                <Text style={styles.courseSubtitle}>Başlangıç Seviyesi</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={styles.courseCard}>
              <LinearGradient
                colors={['#2196F3', '#1976D2']}
                style={styles.courseGradient}
              >
                <Text style={styles.courseTitle}>İş İngilizcesi</Text>
                <Text style={styles.courseSubtitle}>Orta Seviye</Text>
              </LinearGradient>
            </TouchableOpacity>
          </ScrollView>
        </View>
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
  headerContent: {
    marginTop: 20,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    marginTop: 5,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333333',
  },
  goalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  goalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginBottom: 5,
  },
  progress: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#666666',
  },
  modesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modeCard: {
    width: '48%',
    height: 180,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  modeGradient: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 10,
  },
  modeDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    marginTop: 5,
  },
  courseCard: {
    width: 200,
    height: 120,
    marginRight: 15,
    borderRadius: 15,
    overflow: 'hidden',
  },
  courseGradient: {
    flex: 1,
    padding: 15,
    justifyContent: 'flex-end',
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  courseSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    marginTop: 5,
  },
});

export default HomeScreen;

