import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function ExitButton({ onPress = () => {}, text = 'Avslutt' }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#AF0012',
    borderRadius: 50,
    alignSelf: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 10,
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Poppins_400Regular',
    marginBottom: -2,
  },
});
