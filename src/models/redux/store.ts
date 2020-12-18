import { createStore, combineReducers } from "redux";
import { gameReducer, boardReducer, userReducer } from "./reducers";

import {
  useSelector,
  TypedUseSelectorHook,
  createSelectorHook
} from "react-redux";

export enum Difficulty {
  Easy = "easy",
  Medium = "medium",
  Hard = "hard"
}

export enum CellStatus {
  Unknown = -1,
  _1 = 1,
  _2 = 2,
  _3 = 3,
  _4 = 4,
  _5 = 5,
  _6 = 6,
  _7 = 7,
  _8 = 8,
  _9 = 9
}

export interface ICell {
  idx: number;
  status: CellStatus;
  mutable?: boolean;
  lastModifiedTime?: number;
}

export const initialCell = {
  status: CellStatus.Unknown,
  mutable: true
};

export interface IBoard {
  order: number;
  cells: ICell[];
  selected: boolean;
  currentIdx: number;
}

export const initialBoard = {
  order: 9,
  cells: [],
  selected: false,
  currentIdx: 0
};

export interface IGameInfo {
  startTime: number;
  difficulty: Difficulty;
  totalSteps: number;
  progress: number;
}

export const initialGameInfo: IGameInfo = {
  startTime: 0,
  difficulty: Difficulty.Easy,
  totalSteps: 0,
  progress: 0
};

export interface IUserInfo {
  username: string;
  id: number;
  logined: boolean;
}

export const initialUserInfo: IUserInfo = {
  logined: false,
  username: "",
  id: -1
};

export const sudokuStore = createStore(
  combineReducers({
    info: gameReducer,
    board: boardReducer,
    user: userReducer
  })
);

type SudokuStore = ReturnType<typeof sudokuStore.getState>;
export const useSudokuSelector = createSelectorHook<SudokuStore>();
