import React, { Component, FC, useCallback, useEffect, useState } from "react";
import { Provider } from "react-redux";
import { View, Text } from "@tarojs/components";
import { AtButton, AtFab, AtTabBar } from "taro-ui";
import "taro-ui/dist/style/components/button.scss"; // 按需引入
import "./index.less";
import { Game } from "../../components/game";
import { sudokuStore } from "../../models/redux/store";
import "taro-ui/dist/style/components/tab-bar.scss";
import "taro-ui/dist/style/components/badge.scss";
import "taro-ui/dist/style/components/fab.scss";
import "taro-ui/dist/style/components/icon.scss";
import { Entry } from "@/components/entry";
import { Level } from "@/components/level";

import { navigateTo, redirectTo, switchTab } from "@tarojs/taro";
import { User } from "@/components/user";
interface ITarbarProps {
  current: number;
}
export const TabBar: FC<ITarbarProps> = ({ current }) => {
  const handleClick = useCallback(index => {
    if (index === current) return;
    switch (index) {
      case 0:
        return redirectTo({ url: "/pages/index/index" });
      case 1:
        return redirectTo({ url: "/pages/game/index" });
      case 2:
        return redirectTo({ url: "/pages/user/user" });
    }
  }, []);
  return (
    <AtTabBar
      fixed
      tabList={[
        { title: "Puzzle", iconType: "home", text: "ing" },
        { title: "History", iconType: "list" },
        { title: "My", iconType: "user" }
      ]}
      onClick={handleClick}
      current={current}
    />
  );
};

export const Index: FC = () => {
  const [tab, setTab] = useState(0);
  const handleSwitchTab = useCallback(index => {
    // if (index === tab) return;
    setTab(index);
    switch (index) {
      case 0:
        return redirectTo({ url: "/pages/index/index" });
      case 1:
        return redirectTo({ url: "/pages/game/index" });
      case 2:
        return redirectTo({ url: "/pages/user/login" });
    }
  }, []);
  return (
    <Provider store={sudokuStore}>
      <View className="index">
        {/* <Level /> */}
        <Entry />
        {/* <User /> */}
        {/* <AtFab>
          <Text className="at-fab__icon at-icon at-icon-menu"></Text>
        </AtFab> */}
      </View>

      <AtTabBar
        fixed
        tabList={[
          { title: "Puzzle", iconType: "home", text: "ing" },
          { title: "History", iconType: "list" },
          { title: "My", iconType: "user" }
        ]}
        onClick={handleSwitchTab}
        current={tab}
      />
    </Provider>
  );
};

export default Index;
