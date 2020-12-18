import { ScrollView, View } from "@tarojs/components";
import React, { FC, useCallback } from "react";

const LevelCell = () => {
  return <View className="cell">1</View>;
};

export const Level: FC = () => {
  return (
    // <View className="level-container">
    <PageView />
    // </View>
  );
};

const PageView: FC = () => {
  const onScrollToUpper = useCallback(() => {}, []);
  const onScroll = useCallback(e => {
    console.log(e.detail);
  }, []);

  // or 使用箭头函数
  // onScrollToUpper = () => {}

  const scrollStyle = {
    height: "150px"
  };
  const scrollTop = 0;
  const Threshold = 20;
  const vStyleA = {
    height: "150px",
    "background-color": "rgb(26, 173, 25)"
  };
  const vStyleB = {
    height: "150px",
    "background-color": "rgb(39,130,215)"
  };
  const vStyleC = {
    height: "150px",
    "background-color": "rgb(241,241,241)",
    color: "#333"
  };
  return (
    <ScrollView
      className="scrollview"
      scrollY
      scrollWithAnimation
      scrollTop={scrollTop}
      style={scrollStyle}
      lowerThreshold={Threshold}
      upperThreshold={Threshold}
      onScrollToUpper={onScrollToUpper} // 使用箭头函数的时候 可以这样写 `onScrollToUpper={this.onScrollToUpper}`
      onScroll={onScroll}
    >
      <View style={vStyleA}>A</View>
      <View style={vStyleB}>B</View>
      <View style={vStyleC}>C</View>
    </ScrollView>
  );
};
