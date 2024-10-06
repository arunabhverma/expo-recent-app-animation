import { getRandomSoftColor } from "@/utils";
import { Image, useWindowDimensions } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  LinearTransition,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

export const RenderItem = ({
  item,
  index,
  scaleOffset,
  scrollOffset,
}: {
  item: string;
  index: number;
  scaleOffset: SharedValue<number>;
  scrollOffset: SharedValue<number>;
}) => {
  const { width: DeviceWidth, height: DeviceHeight } = useWindowDimensions();
  const inputRange = [
    (index - 1) * DeviceWidth,
    index * DeviceWidth,
    (index + 1) * DeviceWidth,
  ];
  const animatedFlatListWrapperStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scaleOffset.value,
      [0, 100],
      [0.7, 1],
      Extrapolation.CLAMP
    );
    const myCalScale = interpolate(scale, [1, 0.7], [-1, 1]);
    const translateX = interpolate(
      scrollOffset.value,
      inputRange,
      [-140 * myCalScale, 0, myCalScale * 140],
      Extrapolation.CLAMP
    );

    const otherItemScale = interpolate(
      scrollOffset.value,
      inputRange,
      [0.93, 1, 0.93],
      Extrapolation.CLAMP
    );

    const translateY = interpolate(
      scaleOffset.value,
      [0, -DeviceHeight],
      [0, -DeviceHeight],
      Extrapolation.CLAMP
    );

    const newTranslateY = interpolate(
      scrollOffset.value,
      inputRange,
      [0, translateY, 0],
      Extrapolation.CLAMP
    );

    return {
      transform: [
        { scale },
        { translateX },
        { scale: otherItemScale },
        { translateY: newTranslateY },
      ],
    };
  });

  return (
    <Animated.View
      layout={LinearTransition}
      style={[{ flex: 1 }, animatedFlatListWrapperStyle]}
      key={`${item}`}
    >
      <Image
        source={{ uri: item }}
        style={{
          backgroundColor: getRandomSoftColor(),
          width: DeviceWidth,
          height: DeviceHeight,
          borderRadius: 50,
        }}
      />
    </Animated.View>
  );
};
