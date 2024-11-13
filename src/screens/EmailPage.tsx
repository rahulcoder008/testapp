import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {Check} from 'lucide-react-native';
import axios from 'axios';

export default function EmailPage({navigation}: any) {
  const [email, setEmail] = useState('');
  const [keepUpdated, setKeepUpdated] = useState(false);
  const [loader, setLoader] = useState(false);

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleContinue = () => {
    if (isValidEmail(email)) {
      setLoader(true);
      axios({
        method: 'post',
        url: `${process.env.API_URL}/api/v1/users/email-verifications`,
        headers: {
          'x-api-key': process.env.API_KEY,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        data: {
          user_id: '8d5f2a96-4eee-428b-8257-aaa44c86c6e2',
          user_email: email,
        },
      })
        .then(function (response) {
          if (response) {
            setLoader(false);
            navigation.navigate('EmailVerificationPage', {email: email});
          }
        })
        .catch(error => {
          setLoader(false);
          console.log('error - ', JSON.stringify(error));
          Alert.alert(
            'Error',
            error?.message || 'Something went wrong, Try again after sometime.',
          );
        });
      //   navigation.navigate('EmailVerificationPage', {email: email});
      //   console.log('Continue with:', {email, keepUpdated});
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.safeArea}>
          <StatusBar barStyle="dark-content" />

          <View style={styles.content}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>
                Hey Mark, what's your{'\n'}email?
              </Text>
              <Text style={styles.subtitle}>
                We need this only one time and to sync your membership with
                brands
              </Text>
            </View>

            {/* Form */}
            <View style={styles.form}>
              <TextInput
                style={styles.input}
                placeholder="Email address"
                placeholderTextColor="#6A6A6A"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChangeText={setEmail}
              />

              <TouchableOpacity
                style={styles.checkboxContainer}
                activeOpacity={0.7}
                onPress={() => setKeepUpdated(!keepUpdated)}>
                <View
                  style={[
                    styles.checkbox,
                    keepUpdated && styles.checkboxChecked,
                  ]}>
                  {keepUpdated && <Check size={16} color="#fff" />}
                </View>
                <Text style={styles.checkboxLabel}>
                  Keep me up to date about personalised offers and services
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Continue Button */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.continueButton,
                isValidEmail(email) && styles.continueButtonEnabled,
              ]}
              disabled={!isValidEmail(email)}
              onPress={handleContinue}>
              {loader ? (
                <ActivityIndicator size={'small'} color={'white'} />
              ) : (
                <Text
                  style={[
                    styles.continueButtonText,
                    isValidEmail(email) && styles.continueButtonTextEnabled,
                  ]}>
                  Continue
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    paddingTop: 40,
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontFamily: 'InterVariable',
    fontWeight: '600',
    color: '#222222',
    marginBottom: 12,
    lineHeight: 38,
  },
  subtitle: {
    fontFamily: 'InterVariable',
    fontSize: 16,
    fontWeight: '400',
    color: '#6A6A6A',
    lineHeight: 22,
  },
  form: {
    gap: 24,
  },
  input: {
    height: 60,
    borderWidth: 1,
    fontFamily: 'InterVariable',
    borderColor: '#6A6A6A',
    color: '#222222',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  checkboxChecked: {
    backgroundColor: '#222222',
    borderColor: '#222222',
  },
  checkboxLabel: {
    flex: 1,
    fontFamily: 'InterVariable',
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '400',
    color: '#222222',
  },
  continueButton: {
    height: 52,
    borderRadius: 100,
    backgroundColor: '#E5E5E5',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
    marginBottom: Platform.OS === 'ios' ? 0 : 16,
  },
  continueButtonEnabled: {
    backgroundColor: '#222222',
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#999',
  },
  continueButtonTextEnabled: {
    color: '#fff',
  },
});
