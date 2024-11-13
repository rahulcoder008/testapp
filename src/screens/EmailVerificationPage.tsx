import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import {ArrowLeft} from 'lucide-react-native';
import axios from 'axios';
import EmailConfirm from '../components/EmailConfirm';

export default function EmailVerificationPage({navigation, route}: any) {
  const email = route?.params?.email;
  const [code, setCode] = useState(['', '', '', '']);
  const inputRefs: any = useRef([]);
  const [emailPopupVisible, setEmailPopupVisible] = useState(false);
  const [loader, setLoader] = useState(false);

  // Initialize refs array
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 4);
  }, []);

  const handleCodeChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Auto-advance to next input
    if (text.length === 1 && index < 3) {
      inputRefs.current[index + 1].focus();
    }

    // Check if code is complete (all 4 digits entered)
    if (index === 3 && text.length === 1) {
      const fullCode = newCode.join('');
      handleComplete(fullCode);
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // Handle backspace
    if (e.nativeEvent.key === 'Backspace' && index > 0 && !code[index]) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleComplete = (fullCode: string) => {
    setLoader(true);
    axios({
      method: 'post',
      url: `${process.env.API_URL}/api/v1/users/email-verifications/verify`,
      headers: {
        'x-api-key': process.env.API_KEY,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: {
        user_id: '8d5f2a96-4eee-428b-8257-aaa44c86c6e2',
        user_email: email,
        verification_code: fullCode,
      },
    })
      .then(function (response) {
        if (response) {
          setLoader(false);
          setEmailPopupVisible(true);
        }
        //   navigation.navigate('EmailVerificationPage', {email});
      })
      .catch(error => {
        setLoader(false);
        console.log('error - ', JSON.stringify(error));
        // Alert.alert('Error',error?.detail|| 'Something went wrong, Try again after sometime.')
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <TouchableOpacity
        onPress={() => {
          navigation.pop();
        }}
        style={styles.backButton}>
        <Image
          source={require('../assets/image/backButton.png')}
          resizeMode="contain"
          style={{width: 50, height: 50}}
        />
      </TouchableOpacity>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Verify email</Text>
        <Text style={styles.description}>
          To make sure we have the right contact details for you, we've send an
          email to <Text style={styles.email}>{email}</Text>. Please click the
          link in the email to verify your address.
        </Text>

        {/* Code Input */}
        <View style={styles.codeContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={ref => (inputRefs.current[index] = ref)}
              style={styles.codeInput}
              value={digit}
              onChangeText={text => handleCodeChange(text, index)}
              onKeyPress={e => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
              selectionColor="#222222"
            />
          ))}
        </View>
      </View>
      <EmailConfirm
        visible={emailPopupVisible}
        onClose={() => {
          navigation.navigate('HomeTabs');
          setEmailPopupVisible(false);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    // padding: 16,
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  content: {
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    color: '#222222',
    fontFamily: 'InterVariable',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'InterVariable',
    color: '#6A6A6A',
    marginBottom: 32,
  },
  email: {
    fontWeight: '700',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  codeInput: {
    width: 48,
    height: 60,
    borderWidth: 1,
    borderColor: '#222222',
    borderRadius: 18,
    fontSize: 24,
    textAlign: 'center',
    color: '#222222',
    backgroundColor: '#fff',
  },
});
