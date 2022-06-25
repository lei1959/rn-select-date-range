import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {IconButton} from 'react-native-paper';

interface IProps {
  label: string;
  onPress: () => void;
  align?: 'center' | 'auto' | 'left' | 'right' | 'justify' | undefined;
  disabled: boolean;
  font?: string;
}

export default ({
  label,
  onPress = () => {},
  align,
  disabled = false,
  font,
}: IProps) => {
  const textStyle = {
    textAlign: align,
    opacity: disabled ? 0.2 : 1,
    fontFamily: font,
  };

  return (
    <TouchableOpacity
      disabled={disabled}
      style={styles.buttonContainer}
      onPress={() => onPress()}>
      <IconButton icon={label} size={20} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 0.2,
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center',
  },
});
