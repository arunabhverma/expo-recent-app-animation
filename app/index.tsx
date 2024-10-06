import React from "react";
import { ImageBackground, StyleSheet } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedRef,
  useScrollViewOffset,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { BG_IMAGE, DATA } from "@/constants";
import { RenderItem } from "@/components/RenderItem";

const Main = () => {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scaleOffset = useSharedValue(1);
  const scrollOffset = useScrollViewOffset(scrollRef);

  const pan = Gesture.Pan()
    .onStart(() => {})
    .onChange((e) => {
      scaleOffset.value += e.changeY;
    })
    .onFinalize(() => {
      if (scaleOffset.value > 60) {
        scaleOffset.value = withTiming(100, { duration: 100 });
      } else {
        scaleOffset.value = withTiming(0, { duration: 200 });
      }
    });

  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={pan}>
        <ImageBackground
          style={{ flex: 1 }}
          source={{
            uri: BG_IMAGE,
          }}
        >
          <Animated.ScrollView
            ref={scrollRef}
            scrollEventThrottle={16}
            horizontal
            snapToAlignment="start"
            decelerationRate={"normal"}
            pagingEnabled
          >
            <Animated.View style={[{ flexDirection: "row" }]}>
              {DATA.map((item, index) => (
                <RenderItem
                  item={item}
                  index={index}
                  key={`${item}`}
                  scaleOffset={scaleOffset}
                  scrollOffset={scrollOffset}
                />
              ))}
            </Animated.View>
          </Animated.ScrollView>
        </ImageBackground>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default Main;
