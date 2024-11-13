import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
  Image,
  Animated,
} from 'react-native';

const width = Dimensions.get('screen').width;

interface Status {
  title: string;
  imageUrl: any;
  description: string;
}

const PROGRESS_BAR_WIDTH = Dimensions.get('window').width;
const DURATION = 5000;

const StartupScreen = ({navigation}: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const progressAnimation = useRef(new Animated.Value(0)).current;
  const startupPages: Status[] = [
    {
      title: `One app${'\n'}all things${'\n'}discount &${'\n'}offers`,
      description: 'One app is all you need',
      imageUrl: require('../assets/image/step1.png'),
    },
    {
      title: `Collect points${'\n'}on everything${'\n'}you buy`,
      description:
        'Add your card info to be identified whey you buy anything to get your points',
      imageUrl: require('../assets/image/step2.png'),
    },
    {
      title: `Save money${'\n'}with loyalty${'\n'}program`,
      description: 'One app is all you need',
      imageUrl: require('../assets/image/step3.png'),
    },
    {
      title: `Sync all your${'\n'}membership${'\n'}with all`,
      description: 'One app is all you need',
      imageUrl: require('../assets/image/step4.png'),
    },
  ];
  useEffect(() => {
    startProgressAnimation();
  }, [currentIndex]);

  const startProgressAnimation = () => {
    progressAnimation.setValue(0);
    Animated.timing(progressAnimation, {
      toValue: PROGRESS_BAR_WIDTH,
      duration: DURATION,
      useNativeDriver: false,
    }).start(({finished}) => {
      if (finished) {
        nextStatus();
      }
    });
  };

  const nextStatus = () => {
    if (currentIndex < startupPages.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Loop back to the first status
      setCurrentIndex(0);
    }
  };

  const progressBarWidth = progressAnimation.interpolate({
    inputRange: [0, PROGRESS_BAR_WIDTH],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });
  return (
    <View style={styles.container}>
      {/* Status Bar Container */}
      <View style={styles.statusContainer}>
        <View style={styles.progressContainer}>
          {startupPages.map((_, index) => (
            <View key={index} style={styles.progressBar}>
              <Animated.View
                style={[
                  styles.activeProgressBar,
                  {
                    width:
                      index === currentIndex
                        ? progressBarWidth
                        : index < currentIndex
                        ? '100%'
                        : '0%',
                  },
                ]}
              />
            </View>
          ))}
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <Image
          source={startupPages[currentIndex].imageUrl}
          style={styles.image}
          resizeMode="contain"
        />

        <Text style={styles.title}>{startupPages[currentIndex].title}</Text>
        <Text style={styles.subtitle}>
          {startupPages[currentIndex].description}
        </Text>
        <View style={{flex: 1}} />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('EmailPage');
          }}
          style={styles.button}
          activeOpacity={0.8}>
          <Image
            source={require('../assets/image/bankId.png')}
            style={styles.bankIdIcon}
          />
          <Text style={styles.buttonText}>Log in with BankID</Text>
        </TouchableOpacity>

        <Text style={styles.termsText}>
          By proceeding, I accept LoyX's{'\n'}
          <Text
            style={styles.link}
            onPress={() => {
              navigation.navigate('StaticPage');
            }}>
            privacy policy
          </Text>{' '}
          och{' '}
          <Text
            style={styles.link}
            onPress={() => {
              navigation.navigate('StaticPage');
            }}>
            terms of use
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 50 : 16, // Adjust for iOS notch
    gap: 4,
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  statusBarBackground: {
    flex: 1,
    height: 2,
    backgroundColor: '#E5E5E5',
    borderRadius: 2,
    overflow: 'hidden',
  },
  statusBarForeground: {
    height: '100%',
    width: '0%',
    backgroundColor: '#222222',
    borderRadius: 2,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 90 : 56, // Adjust for status bar + padding
  },
  image: {
    width: width * 0.8,
    height: width * 0.8,
    marginBottom: 40,
  },
  title: {
    fontSize: 45,
    fontFamily: 'InterVariable',
    fontWeight: '800',
    textAlign: 'center',
    lineHeight: 44,
    letterSpacing: -0.5,
    marginBottom: 16,
    color: '#222222',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'InterVariable',
    color: '#6A6A6A',
    textAlign: 'center',
    fontWeight: '400',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#222222',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
    paddingHorizontal: 24,
    borderRadius: 100,
    width: '100%',
    marginBottom: 16,
  },
  bankIdIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'InterVariable',
    fontSize: 16,
    fontWeight: '600',
  },
  termsText: {
    fontFamily: 'InterVariable',
    fontSize: 14,
    color: '#333333',
    textAlign: 'center',
    marginBottom: 20,
  },
  link: {
    fontFamily: 'InterVariable',
    color: '#222222',
    textDecorationLine: 'underline',
  },
  progressContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 20,
    zIndex: 1,
    width: width,
    paddingHorizontal: 10,
    alignItems:'center',alignSelf:'center',
  },
  progressBar: {
    flex: 1,
    height: 4,
    width:'100%',
    borderRadius:20,
    backgroundColor: '#2C334F33',
    marginHorizontal: 2,
  },
  activeProgressBar: {
    height: '100%',
    borderRadius:20,
    backgroundColor: '#222222',
  },
});

export default StartupScreen;
