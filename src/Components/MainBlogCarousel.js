import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
  ImageBackground,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";

import { CarouselData1 } from "../../assets/mock-data/slideshow-data";
import Carousel from "react-native-snap-carousel";

const IS_IOS = Platform.OS === "ios";
const { width: viewportWidth, height: viewportHeight } =
  Dimensions.get("window");

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const slideHeight = viewportHeight * 0.36;
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

const sliderWidth = viewportWidth;
const itemWidth = slideWidth + itemHorizontalMargin * 2;

const entryBorderRadius = 8;

//test
const tempGetItem = (data, index) => ({
  id: Math.random().toString(12).substring(0),
  title: `Item ${index + 1}`,
});

const MainBlogCarousel = () => {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const carouselRef = useRef(null);

  return (
    <View>
      <Carousel
        layout={"default"}
        ref={(ref) => (carouselRef.current = ref)}
        data={CarouselData1}
        sliderWidth={viewportWidth}
        itemWidth={itemWidth}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                // backgroundColor: "floralwhite",
                borderRadius: 5,
                height: 100,
                width: itemWidth,
                // padding: 20,

                // marginLeft: 25,
                // marginRight: 25,
              }}
            >
              <ImageBackground
                source={{ uri: item.illustration }}
                style={{ width: "100%", height: "100%" }}
              >
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{ fontSize: 20, color: "white", fontWeight: "bold" }}
                  >
                    {item.title}
                  </Text>
                  <Text>{item.text}</Text>
                </View>
              </ImageBackground>
            </View>
          );
        }}
        // sliderWidth={sliderWidth}
        // itemWidth={itemWidth}
        inactiveSlideScale={0.8}
        inactiveSlideOpacity={0.7}
        loop={true}
        loopClonesPerSide={2}
        autoplay={true}
        autoplayDelay={500}
        autoplayInterval={3000}
        onSnapToItem={(index) => setCarouselIndex(index)}
        initialNumToRender={3}
        getItem={tempGetItem}
        getItemCount={3}
      />
    </View>
  );
};

const carouselItem = ({ item, index }) => {
  return (
    <View
      style={{
        backgroundColor: "floralwhite",
        borderRadius: 5,
        height: 250,
        padding: 50,
        // marginLeft: 25,
        // marginRight: 25,
      }}
    >
      <Text style={{ fontSize: 30 }}>{item.title}</Text>
      <Text>{item.text}</Text>
    </View>
  );
};
export default MainBlogCarousel;

const styles = StyleSheet.create({});
