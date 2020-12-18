import * as React from "react";
import { View, Text } from "@tarojs/components";
import { FC, useCallback, useEffect, useState } from "react";
import { useSudokuSelector, ICell, CellStatus } from "../../models/redux/store";
import { useDispatch } from "react-redux";
import cx from "classnames";
import { BoardActions, BoardActionType } from "../../models/redux/actions";
import "./styles.less";
import { AtButton, AtDivider, AtIcon } from "taro-ui";
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const colors = [
  "#FF0000",
  "#FF7F00",
  "#FFFF00",
  "#00FF00",
  "#0000FF",
  "#2E2B5F",
  "#8B00FF"
];

const controlBtn: FC = () => {
  return;
};

interface INumpadProps {
  onClick?: () => void;
}

export const Numpad: FC<INumpadProps> = ({ onClick }) => {
  const dispatch = useDispatch();
  const handleClick = useCallback(status => {
    dispatch(BoardActions.makeMove(status));
    console.log(status);
  }, []);
  return (
    <View className="numpad">
      <View className="nums">
        {nums.map((num, i) => (
          <View
            key={num}
            className="num"
            // style={{ background: colors[i] }}
            onClick={() => handleClick(num)}
          >
            {num}
          </View>
        ))}
      </View>
      <View className="control-btns">
        <AtButton className="btn" size="small">
          <AtIcon value="edit" size="10" />
          Mark
        </AtButton>
        <AtButton className="btn" size="small" onClick={() => handleClick(-1)}>
          <AtIcon value="close" size="10" />
          Clear
        </AtButton>
        <AtButton className="btn" size="small">
          <AtIcon value="lock" size="10" />
          Lock
        </AtButton>
        <AtButton className="btn" size="small">
          <AtIcon value="help" size="10" />
          Answer
        </AtButton>
      </View>
    </View>
  );
};
