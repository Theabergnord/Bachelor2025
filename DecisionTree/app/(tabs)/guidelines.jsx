import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Modal, Platform } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
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

  // Retningslinjer - erstatt med dine faktiske retningslinjer
  const guidelines = [
    { number: 1, title: "Forberedelse" },
    { number: 2, title: "Oppstart av vurdering av BC" },
    { number: 3, title: "Valg av metode" },
    { number: 4, title: "Datainnsamling" },
    { number: 5, title: "Tolkning av data" },
    { number: 6, title: "Rapportering av data" },
    { number: 7, title: "Formidling av data" },
    { number: 8, title: "Monitoring" },
  ];

  const handleNumberPress = (number) => {
    setSelectedNumber(number);
    setModalVisible(true);
  };

  const handleNext = () => {
    router.push('(tabs)/decisionTreePage')
  };

  const outerRadius = 140; // Ytre radius
  const innerRadius = 90;  // Indre radius (hvit sirkel)
  const centerX = outerRadius + 10;
  const centerY = outerRadius + 10;

  // Gradientfargene
  const lightGreen = [167, 200, 176];
  const darkGreen = [26, 49, 38];

  return (
    <ParallaxScrollView>  
      <ThemedView style={styles.container}>
        {/* Tittel rett over listen */}
        <ThemedText style={styles.title}>RETNINGSLINJER</ThemedText>

        {/*<TipsBox subtitle="Klikk på tallene for å lese mer om retningslinjene" />*/}

        {/* Liste over retningslinjer */}
        <View style={styles.guidelineListContainer}>
          {guidelines.map((guideline, index) => {
            // Samme fargeberegning som for sirkelsegmentene
            const r = Math.round(lightGreen[0] - (index * (lightGreen[0] - darkGreen[0]) / (guidelines.length - 1)));
            const g = Math.round(lightGreen[1] - (index * (lightGreen[1] - darkGreen[1]) / (guidelines.length - 1)));
            const b = Math.round(lightGreen[2] - (index * (lightGreen[2] - darkGreen[2]) / (guidelines.length - 1)));
            const fillColor = `rgb(${r}, ${g}, ${b})`;

            return (
              <TouchableOpacity 
                key={guideline.number} 
                style={styles.guidelineItem}
                onPress={() => handleNumberPress(guideline.number)}
              >
                
                <View style={[styles.guidelineNumberCircle, { backgroundColor: fillColor }]}>
                  <ThemedText style={styles.guidelineNumberText}>{guideline.number}</ThemedText>
                </View>
                <ThemedText style={styles.guidelineTitle}>{guideline.title}</ThemedText>
              </TouchableOpacity>
            );
          })}
        </View>
        <ThemedText style={styles.subtitle}>Klikk på tallene for å lese mer</ThemedText>
        {/* Sirkelen rundt tall */}
        <View style={styles.circleContainer}>
          <Svg width={(outerRadius * 2) + 20} height={(outerRadius * 2) + 20}>
            {numbers.map((_, index) => {
              const startAngle = ((index - 0.5) / numbers.length) * Math.PI * 2 - Math.PI / 2;
              const endAngle = ((index + 0.5) / numbers.length) * Math.PI * 2 - Math.PI / 2;

              const x1 = centerX + outerRadius * Math.cos(startAngle);
              const y1 = centerY + outerRadius * Math.sin(startAngle);
              const x2 = centerX + innerRadius * Math.cos(startAngle);
              const y2 = centerY + innerRadius * Math.sin(startAngle);
              const x3 = centerX + innerRadius * Math.cos(endAngle);
              const y3 = centerY + innerRadius * Math.sin(endAngle);
              const x4 = centerX + outerRadius * Math.cos(endAngle);
              const y4 = centerY + outerRadius * Math.sin(endAngle);

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
            <Circle cx={centerX} cy={centerY} r={innerRadius} fill="white" />
          </Svg>

          {numbers.map((number, index) => {
            const angle = (((index) / numbers.length) * Math.PI * 2) - Math.PI / 2; 
            const distance = (innerRadius + outerRadius) / 2;
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

        {/*<NextButton onPress={handleNext} text={('NEXT')} style={{ marginBottom: 32 }} />*/}
        
        {/* Modal for å vise informasjon */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <ThemedText style={styles.modalTitle}>
                {selectedNumber && guidelines[selectedNumber-1]?.title}
              </ThemedText>
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingRight: 20,
    paddingLeft: 20
  },
  title: {
    color: '#2E443E',
    marginTop: 0,
    marginBottom: 0, // mindre luft under tittel
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
  guidelineListContainer: {
    width: '100%',
    marginTop: 8, // mindre luft over listen
    marginBottom: 16,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  guidelineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 3,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  guidelineNumberCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    // backgroundColor settes dynamisk!
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  guidelineNumberText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  guidelineTitle: {
    color: '#2E443E',
    fontSize: 14,
    flex: 1,
  },
  circleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginVertical: 0,
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
