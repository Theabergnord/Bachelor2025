import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Modal, Platform } from 'react-native';
import Svg, { Circle, Line, Path } from 'react-native-svg';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import TipsBox from '../../components/TipsBox';
import NextButton from '../../components/NextButton';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next'
import ParallaxScrollView from '@/components/ParallaxScrollView';
import Header from '@/components/Header';


const GuidelinesScreen = () => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8];
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter()
  const { t } = useTranslation()

  const handleNumberPress = (number) => {
    setSelectedNumber(number);
    setModalVisible(true);
  };

  const handleNext = () => {
    router.push('(tabs)/decisionTreePage')
  };

  const outerRadius = 160; // Ytre radius
  const innerRadius = 100;  // Indre radius (hvit sirkel)
  const centerX = outerRadius + 10;
  const centerY = outerRadius + 10;

  return (
    <ParallaxScrollView>
      <Header />  
    <ThemedView style={styles.container}>
      {/* Tittel */}
      <ThemedText style={styles.subtitle}>FØR GJENNOMFØRING</ThemedText>
      <ThemedText style={styles.title}>RETNINGSLINJER</ThemedText>

      {/* Tips-boksen */}
      <TipsBox subtitle="Klikk på tallene for å lese retningslinjene" />

      {/* Sirkelen rundt tall */}
      <View style={styles.circleContainer}>
  <Svg width={(outerRadius * 2) + 20} height={(outerRadius * 2) + 20}>
    {/* Grønne firkantene */}
    {numbers.map((_, index) => {
      const startAngle = ((index - 0.5) / numbers.length) * Math.PI * 2 - Math.PI / 2;
      const endAngle = ((index + 0.5) / numbers.length) * Math.PI * 2 - Math.PI / 2;

      // Beregn punkter for tall i retningslinjene
      const x1 = centerX + outerRadius * Math.cos(startAngle);
      const y1 = centerY + outerRadius * Math.sin(startAngle);
      const x2 = centerX + innerRadius * Math.cos(startAngle);
      const y2 = centerY + innerRadius * Math.sin(startAngle);
      const x3 = centerX + innerRadius * Math.cos(endAngle);
      const y3 = centerY + innerRadius * Math.sin(endAngle);
      const x4 = centerX + outerRadius * Math.cos(endAngle);
      const y4 = centerY + outerRadius * Math.sin(endAngle);

      // Grønnfarge - lys til mørk grønn
      const lightGreen = [167, 200, 176];
      const darkGreen = [26, 49, 38];
      
      // Beregn grønnfarge basert på indeks
      const r = Math.round(lightGreen[0] - (index * (lightGreen[0] - darkGreen[0]) / (numbers.length - 1)));
      const g = Math.round(lightGreen[1] - (index * (lightGreen[1] - darkGreen[1]) / (numbers.length - 1)));
      const b = Math.round(lightGreen[2] - (index * (lightGreen[2] - darkGreen[2]) / (numbers.length - 1)));
      
      const fillColor = `rgb(${r}, ${g}, ${b})`;

      return (
        <Path
          key={`segment-${index}`}
          d={`M${x2},${y2} L${x1},${y1} A${outerRadius},${outerRadius} 0 0,1 ${x4},${y4} L${x3},${y3} A${innerRadius},${innerRadius} 0 0,0 ${x2},${y2} Z`}
          fill={fillColor}
          stroke="white"
          strokeWidth={2}
        />
      );
    })}

    {/* Hvite sirkelen i midten */}
    <Circle cx={centerX} cy={centerY} r={innerRadius} fill="white" />
  </Svg>

  
  {numbers.map((number, index) => {
    // FInne midtpunktet av hvert segment
    const angle = (((index) / numbers.length) * Math.PI * 2) - Math.PI / 2; 
    const distance = (innerRadius + outerRadius) / 2; // Midt på ringen
    const x = centerX + distance * Math.cos(angle);
    const y = centerY + distance * Math.sin(angle);

    return (
      <TouchableOpacity
        key={`number-${index}`}
        style={[
          styles.numberCircle,
          {
            position: 'absolute',
            left: x - 20,
            top: y - 20,
          },
        ]}
        onPress={() => handleNumberPress(number)}
      >
        <ThemedText style={styles.numberText}>{number}</ThemedText>
      </TouchableOpacity>
    );
  })}
</View>


<NextButton onPress={handleNext} text={t('NEXT')} style={{ marginBottom: 32 }} />
  

      {/* Modal for å vise informasjon */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ThemedText style={styles.modalTitle}>Retningslinje {selectedNumber}</ThemedText>
            <ThemedText style={styles.modalBody}>
              Dette er informasjonen om retningslinje {selectedNumber}.
            </ThemedText>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <ThemedText style={styles.closeButtonText}>Lukk</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ThemedView>
    </ParallaxScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  title: {
    color: '#2E443E',
    marginTop: 0,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Rubik-Bold' : 'Rubik',
  },
  subtitle: {
    color: '#2E443E',
    marginBottom: 0,
    marginTop: 0,
    textAlign: 'center',
    lineHeight: 28
  },
  circleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginVertical: 30,
  },
  numberCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    zIndex: 10,
  },
  numberText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E443E',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    paddingVertical: 25,
    paddingHorizontal: 30,
    borderRadius: 15,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E443E',
    marginBottom: 15,
  },
  modalBody: {
    fontSize: 16,
    color: '#2E443E',
    textAlign: 'center',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#2E443E',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default GuidelinesScreen;
