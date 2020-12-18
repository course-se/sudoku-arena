import React, { Component, useCallback, useState } from "react";
import { View, Text } from "@tarojs/components";
import { AtButton, AtForm, AtInput } from "taro-ui";

import "taro-ui/dist/style/components/button.scss"; // 按需引入
import "taro-ui/dist/style/components/form.scss";
import "taro-ui/dist/style/components/input.scss";
import "taro-ui/dist/style/components/icon.scss";
import "./user.less";
import { request } from "@tarojs/taro";
import { ENTRYPOINT } from "@/consts";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = useCallback(() => {
    console.log(username, password);
    request({
      url: `${ENTRYPOINT}/login`,
      method: "POST",
      data: {
        username,
        password
      }
    }).then(data => console.log(data));
  }, [username, password]);

  const handleUsernameChange = useCallback((value, event) => {
    setUsername(value);
    return value;
  }, []);

  const handlePasswordChange = useCallback((value, event) => {
    setPassword(value);
    return value;
  }, []);

  return (
    <View className="user-container">
      <AtInput
        name="username"
        title="Username"
        type="text"
        placeholder="your username"
        value={username}
        onChange={handleUsernameChange}
      />
      <AtInput
        name="password"
        title="Password"
        type="password"
        placeholder="your password"
        value={password}
        onChange={handlePasswordChange}
      />
      <AtButton className="btn" onClick={handleSubmit}>
        提交
      </AtButton>
    </View>
  );
};

export default Login;
