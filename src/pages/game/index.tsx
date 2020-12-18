import React, { Component, FC, useEffect } from "react";

import "./styles.less";
import { Game } from "@/components/game";
import { Provider, useDispatch } from "react-redux";
import {
  CellStatus,
  ICell,
  sudokuStore,
  useSudokuSelector
} from "@/models/redux/store";
import { BoardActions } from "@/models/redux/actions";

export const GamePage: FC = () => {
  return (
    <Provider store={sudokuStore}>
      <Game />
    </Provider>
  );
};

export default GamePage;
