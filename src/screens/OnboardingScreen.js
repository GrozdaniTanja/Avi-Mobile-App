import React from "react";
import {
  SafeAreaView,
  Image,
  StyleSheet,
  FlatList,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Colors from "../utils/constants/Colors";
import Typography from "../utils/constants/Typography";
import Spacing from "../utils/constants/Spacing";
import SecondaryDefaultButton from "../components/SecondaryDefaultButton";
import PrimaryDefaultButton from "../components/PrimaryDefaultButton";

const { width, height } = Dimensions.get("window");

const slides = [
  {
    id: "1",
    image: require("../assets/images/onboarding-picture-1.png"),
    title: "A safe space \n to share and heal",
    subtitle: "Your mental health journey begins here.",
  },
  {
    id: "2",
    image: require("../assets/images/onboarding-picture-2.png"),
    title: "Take some time \n to travel within",
    subtitle: "Mental health is not a destination, but a journey!",
  },
  {
    id: "3",
    image: require("../assets/images/onboarding-picture-3.png"),
    title: "A healthy mind \n is an asset",
    subtitle: "Chat your way to a better you!",
  },
];

const Slide = ({ item }) => {
  return (
    <SafeAreaView>
      <View style={{ alignItems: "center", marginTop: Spacing.space8 * 2 }}>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>
        </View>
        <Image
          source={item.image}
          style={{ height: "80%", width, resizeMode: "contain" }}
        />
      </View>
    </SafeAreaView>
  );
};

const OnboardingScreen = ({ navigation }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = React.useRef();

  const updateCurrentSlideIndex = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({ offset });
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const skip = () => {
    const lastSlideIndex = slides.length - 1;
    const offset = lastSlideIndex * width;
    ref?.current.scrollToOffset({ offset });
    setCurrentSlideIndex(lastSlideIndex);
  };

  const Footer = () => {
    return (
      <View
        style={{
          height: height * 0.25,
          justifyContent: "space-between",
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideIndex == index && {
                  backgroundColor: Colors.primary.darkCerulean,
                  width: 25,
                },
              ]}
            />
          ))}
        </View>
        <View style={{ marginBottom: 20 }}>
          {currentSlideIndex == slides.length - 1 ? (
            <View>
              <TouchableOpacity style={[styles.getstartedBtn]}>
                <Text
                  style={{
                    color: Colors.primary.darkCerulean,
                    fontWeight: Typography.buttons.button1.fontWeight,
                    textAlign: "center",
                    fontSize: Typography.buttons.button1.fontSize,
                  }}
                >
                  GET STARTED
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ flexDirection: "row" }}>
              <SecondaryDefaultButton onPress={skip} title="SKIP" />
              <View style={{ width: 15 }} />
              <PrimaryDefaultButton onPress={goToNextSlide} title="NEXT" />
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.neutral.romance }}>
      <StatusBar backgroundColor={Colors.neutral.romance} />

      <FlatList
        pagingEnabled
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        contentContainerStyle={{ height: height * 0.65 }}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={slides}
        renderItem={({ item }) => <Slide item={item} />}
      />

      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    color: Colors.primary.darkCerulean,
    fontSize: Typography.headings.h4.fontSize,
    marginTop: 10,
    maxWidth: "70%",
    textAlign: "center",
    lineHeight: 23,
  },
  title: {
    color: Colors.primary.darkCerulean,
    fontSize: Typography.headings.h1.fontSize,
    fontWeight: Typography.headings.h1.fontWeight,
    marginTop: 20,
    textAlign: "center",
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
  indicator: {
    height: 2.5,
    width: 10,
    backgroundColor: Colors.primary.darkCerulean,
    marginHorizontal: 3,
    borderRadius: 2,
  },
  getstartedBtn: {
    padding: Spacing.space8 * 2,
    backgroundColor: Colors.neutral.romance,
    marginVertical: Spacing.space8 * 3,
    borderRadius: Spacing.space8,
    shadowColor: Colors.neutral.brightGray,
    shadowOffset: {
      width: 0,
      height: Spacing.space8,
    },
    shadowOpacity: 0.1,
    shadowRadius: Spacing.space8,
    color: Colors.primary.darkCerulean,
  },
});

export default OnboardingScreen;
