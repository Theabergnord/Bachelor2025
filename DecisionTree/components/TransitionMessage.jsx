import { View, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';
import NextButton from './NextButton';

export default function TransitionMessage({ message, onNext }) {
    return (
        <View style={styles.container}>
            <ThemedText type="title" style={styles.text}>{message}</ThemedText>
            <NextButton onPress={onNext} text="Next" style={{ marginTop: 32 }} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      padding: 24,
      alignItems: 'center',
    },
    text: {
        textAlign: 'center',
        fontSize: 20,
        lineHeight: 24,
        fontFamily: 'Poppins_400Regular',
        marginBottom: 20,
    },
  });