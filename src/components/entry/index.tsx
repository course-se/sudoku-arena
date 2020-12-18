import React, { Component, FC, useCallback } from "react";
import { View, Text, Picker } from "@tarojs/components";
import { AtButton, AtList, AtListItem } from "taro-ui";

import "taro-ui/dist/style/components/article.scss";
import "taro-ui/dist/style/components/list.scss";
import "./entry.less";
import { Difficulty, useSudokuSelector } from "@/models/redux/store";
import { useDispatch } from "react-redux";
import { GameActions } from "@/models/redux/actions";
import { navigateTo } from "@tarojs/taro";

const DifficultyPicker: FC = () => {
  const selector = ["Easy", "Medium", "Hard"];
  const { difficulty } = useSudokuSelector(state => state.info);
  const dispatch = useDispatch();
  const onChange = useCallback(e => {
    const { value } = e.detail;
    let diff: Difficulty;
    console.log(e);
    switch (value) {
      case "0": {
        diff = Difficulty.Easy;
        break;
      }
      case "1": {
        diff = Difficulty.Medium;
        break;
      }
      case "2": {
        diff = Difficulty.Hard;
        break;
      }
      default: {
        diff = Difficulty.Easy;
        break;
      }
    }
    console.log(GameActions.setDifficulty(diff));
    dispatch(GameActions.setDifficulty(diff));
  }, []);
  return (
    <View className="container">
      <View className="page-body">
        <View className="page-section">
          <View>
            <Picker
              mode="selector"
              range={selector}
              onChange={onChange}
              value={null}
            >
              <AtList>
                <AtListItem title="Difficulty" extraText={difficulty} />
              </AtList>
            </Picker>
          </View>
        </View>
      </View>
    </View>
  );
};

export const Entry: FC = () => {
  const handlePlayLocal = useCallback(() => {
    navigateTo({
      url: "/pages/game/index"
    });
  }, []);
  return (
    <View className="entry-container">
      <View className="at-article__h1">Sodoku Arena</View>
      <DifficultyPicker />
      <AtButton className="btn" type="primary" circle onClick={handlePlayLocal}>
        <View className="at-icon at-icon-lightning-bolt" />
        Play Local
      </AtButton>
      <AtButton className="btn" type="primary" circle>
        <View className="at-icon at-icon-link" />
        Online Match
      </AtButton>
      <AtButton className="btn" type="secondary" circle>
        <View className="at-icon at-icon-calendar" />
        Daily Challenge
      </AtButton>
      <AtButton className="btn" type="secondary" circle>
        <View className="at-icon at-icon-share" />
        Share
      </AtButton>
    </View>
  );
};

export default Entry;
