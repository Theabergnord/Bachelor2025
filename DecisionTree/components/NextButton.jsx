import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function NextButton({ onPress = () => {}, text = 'Neste' }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fff',
    borderColor: '#345641',
    borderWidth: 2,
    borderRadius: 50,
    alignSelf: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  text: {
    color: '#345641',
    fontSize: 20,
    fontFamily: 'Poppins_400Regular',
    marginBottom: -2,
  },
});


/* Kilder
 * TouchableOpacity - https://reactnative.dev/docs/touchableopacity
 * alignSelf - https://reactnative.dev/docs/layout-props 
*/

