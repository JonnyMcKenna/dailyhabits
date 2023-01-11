import React, { useRef } from "react";
import { StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";

export function MeditateAnimation() {
  const animation = useRef(null);

  return (
    <View style={styles.animationContainer}>
      <LottieView
        autoPlay
        ref={animation}
        style={{
          width: 300,
          height: 300,
        }}
        source={require("../assets/meditate.json")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  animationContainer: {},
});
