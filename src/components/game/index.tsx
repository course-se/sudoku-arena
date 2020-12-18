import { View, Text } from "@tarojs/components";
import {
  AtAvatar,
  AtBadge,
  AtButton,
  AtCard,
  AtCountdown,
  AtDivider,
  AtProgress,
  AtTabBar,
  AtTag
} from "taro-ui";
import React, { FC, useState, useEffect, useRef, useCallback } from "react";

import {
  useSudokuSelector,
  Difficulty,
  ICell,
  sudokuStore
} from "../../models/redux/store";

import { Board } from "../board/board";
import { Numpad } from "../numpad";

import "./styles.less";
import { useDispatch } from "react-redux";
import {
  BoardActions,
  GameActionType,
  GameActions
} from "../../models/redux/actions";
import "taro-ui/dist/style/components/button.scss";
import "taro-ui/dist/style/components/card.scss";
import "taro-ui/dist/style/components/progress.scss";
import "taro-ui/dist/style/components/avatar.scss";
import "taro-ui/dist/style/components/tag.scss";
import "taro-ui/dist/style/components/flex.scss";
import "taro-ui/dist/style/components/countdown.scss";
import { ENTRYPOINT } from "@/consts";
import { request } from "@tarojs/taro";
// import { ipcRenderer, generate } from "../../models/ipc/ipcRenderer";

const difficultyPhraseMap = {
  [Difficulty.Easy]: "简单",
  [Difficulty.Medium]: "中等",
  [Difficulty.Hard]: "困难"
};

const getCellsFromString = (str: string): ICell[] => {
  const lastModifiedTime = Date.now();
  return str.split("").map<ICell>((char, idx) => {
    const mutable = char === " ";
    return {
      idx,
      mutable,
      lastModifiedTime,
      status: mutable ? -1 : +char
    };
  });
};

const Header: FC = () => {
  return (
    <View className="header">
      <AtCountdown
        className="area"
        format={{ hours: ":", minutes: ":", seconds: "" }}
        seconds={10}
        // onTimeUp={this.onTimeUp.bind(this)}
      />
      <AtButton className="area" size="small">
        Restart
      </AtButton>
      <View className="area">Level 5</View>
    </View>
  );
};

export const Game: FC = props => {
  const { info, order, cells } = useSudokuSelector(state => ({
    info: state.info,
    order: state.board.order,
    cells: state.board.cells
  }));
  const [totalSeconds, setTotalSeconds] = useState(0);
  const loadLock = React.useRef(false);
  const dispatch = useDispatch();
  let answer = useRef<ICell[]>([]);
  useEffect(() => {
    console.log("fetching");
    request({ url: `${ENTRYPOINT}/puzzles/${info.difficulty}/${1}` })
      .then(data => data.data.data.puzzle)
      .then(puzzle => {
        const cells = getCellsFromString(puzzle.puzzle);
        dispatch(BoardActions.load(cells));
        answer.current = getCellsFromString(puzzle.result).filter(
          cell => cells[cell.idx].mutable
        );
      });
  }, []);

  useEffect(() => {
    const handle = setInterval(() => setTotalSeconds(time => time + 1), 1000);
    return () => {
      clearInterval(handle);
    };
  }, [info.startTime]);

  // const handleConfigSumbit = React.useCallback((event: React.FormEvent) => {
  //   event.preventDefault();
  //   const { order, difficulty } = event.target as any;
  //   console.log(order.value);

  //   order && dispatch(BoardActions.init(+order.value));
  //   difficulty &&
  //     dispatch(GameActions.setDifficulty(Difficulty[+difficulty.value]));
  //   console.log("submitted!");
  // }, []);

  const updateProgress = useCallback(() => {
    const cells = sudokuStore.getState().board.cells;
    const current = answer.current.filter(
      cell => cells[cell.idx].status === cell.status
    );
    const percent = (current.length / answer.current.length) * 100;
    dispatch(GameActions.setProgress(Math.floor(percent)));
  }, []);

  useEffect(() => {
    const interval = setInterval(updateProgress, 500);
    return () => clearInterval(interval);
  }, []);
  return (
    <View className="sudoku-game-container">
      {/* <AtCard note="小Tips" extra="额外信息" title="Rival">
        这也是内容区 可以随意定义功能
      </AtCard> */}
      <Header />
      <Board />
      <Numpad />
      <View className="match-info">
        <View className="at-row">
          <Text className="at-col at-col-2">Me</Text>
          <View className="at-col at-col--auto">
            <AtProgress percent={info.progress} status="progress" />
          </View>
        </View>
        <View className="at-row">
          <Text className="at-col at-col-2">Rivel</Text>
          <View className="at-col at-col--auto">
            <AtProgress percent={50} status="progress" color="#FF4949" />
          </View>
        </View>
      </View>
      {/* <AtButton full type="primary">
        提交
      </AtButton> */}
      {/* <View className="sidebar">
        <View className="game-info">
          <Text>
            难度：
            {difficultyPhraseMap[info.difficulty]}
          </Text>

          <Text>用时：{totalSeconds} 秒</Text>
          <Text>步数：{info.totalSteps}</Text>
        </View>
        <View className="game-config">
          <form name="config" onSubmit={handleConfigSumbit}>
            <View className="unit">
              <label>阶数：</label>
              <select name="order" defaultValue={order}>
                {[4, 6, 8, 12].map((val) => (
                  <option key={val} value={val}>
                    {val}
                  </option>
                ))}
              </select>
            </View>
            <View className="unit">
              <label>难度：</label>
              <select
                name="difficulty"
                defaultValue={difficultyPhraseMap[info.difficulty]}
              >
                {Object.values(difficultyPhraseMap).map((str, idx) => (
                  <option key={str} value={idx}>
                    {str}
                  </option>
                ))}
              </select>
            </View>
            <input type="submit" value="应用" />
          </form>
        </View>
        <View className="button-group">
          <button onClick={() => {}}>加载</button>
          <button onClick={handleGenerateClick}>生成</button>
          <button onClick={() => {}}>提交</button>
        </View>
      </View> */}
    </View>
  );
};
