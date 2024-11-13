import React from 'react'
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native'
import Animated, { 
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
} from 'react-native-reanimated'

interface VerificationModalProps {
  visible: boolean
  onClose: () => void
}

const { width } = Dimensions.get('window')
const MODAL_WIDTH = width - 48 // 24px padding on each side

export default function EmailConfirm({ visible, onClose }: VerificationModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <Animated.View 
              entering={SlideInDown.springify().damping(15)}
              exiting={SlideOutDown}
              style={styles.modalContainer}
            >
              <View style={styles.content}>
                <Text style={styles.title}>Thank you</Text>
                <Text style={styles.message}>Your email has been verified.</Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={onClose}
                  activeOpacity={0.7}
                >
                  <Text style={styles.buttonText}>Ok</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: MODAL_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
    ...Platform.select({
      ios: {
        shadowColor: '#222222',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333333',
  },
  message: {
    fontSize: 16,
    color: '#6A6A6A',
    fontWeight:'400',
    textAlign: 'center',
    marginBottom: 32,
  },
  button: {
    width: '100%',
    height: 52,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#222222',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222222',
  },
})