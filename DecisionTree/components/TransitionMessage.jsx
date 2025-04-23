import { View, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';
import NextButton from './NextButton';

export default function TransitionMessage({ message, onNext }) {
    return (
        <View style={StyleSheet.container}>
            <ThemedText type="title" style={StyleSheet.text}>{message}</ThemedText>
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
      marginBottom: 20,
    },
  });