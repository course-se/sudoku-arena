import React, { FC, forwardRef, useCallback } from "react";
import { AtTabBar, AtCard, AtAvatar, AtButton } from "taro-ui";
import "./styles.less";
import "taro-ui/dist/style/components/card.scss";
import "taro-ui/dist/style/components/avatar.scss";
import { navigateTo, redirectTo, switchTab } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { useSudokuSelector } from "@/models/redux/store";

const LoginOrRegister: FC = () => {
  return (
    <>
      <Text>You haven't login</Text>
      <AtButton type={"primary"} className="btn">
        Login
      </AtButton>
      <AtButton className="btn">Register</AtButton>
    </>
  );
};

export const User: FC = () => {
  const { logined } = useSudokuSelector(state => state.user);

  return (
    <View className="user-container">
      <LoginOrRegister />
    </View>
  );
};
