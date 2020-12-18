import React, { FC, forwardRef, useCallback } from "react";
import { AtTabBar } from "taro-ui";

import "taro-ui/dist/style/components/tab-bar.scss";
import "taro-ui/dist/style/components/badge.scss";
import "taro-ui/dist/style/components/fab.scss";
import "taro-ui/dist/style/components/icon.scss";
import { navigateTo, redirectTo, switchTab } from "@tarojs/taro";
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
