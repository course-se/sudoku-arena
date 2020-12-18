import { combineReducers, Reducer, ReducerFromReducersMapObject } from "redux";
import { current, produce } from "immer";
import {
  IGameInfo,
  initialGameInfo,
  IBoard,
  initialBoard,
  initialCell,
  ICell,
  initialUserInfo,
  IUserInfo
} from "./store";
import { GameActionType, BoardActionType, BoardActions } from "./actions";
import { Game } from "@/components/game";

const generateEmptyCells = (order: number) =>
  Array(order ** 2).fill(initialCell) as ICell[];

export const userReducer: Reducer<IUserInfo> = (
  state = initialUserInfo,
  action
) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};

export const gameReducer: Reducer<IGameInfo> = (
  state = initialGameInfo,
  action
) => {
  switch (action.type) {
    case GameActionType.Init: {
      return { ...initialGameInfo, startTime: Date.now() };
    }
    case GameActionType.Submit: {
      return state;
    }
    case GameActionType.Difficulty: {
      return { ...state, difficulty: action.data };
    }
    case GameActionType.Progress: {
      return { ...state, progress: action.data };
    }
    default: {
      return state;
    }
  }
};

export const boardReducer: Reducer<IBoard> = (state = initialBoard, action) => {
  switch (action.type) {
    case BoardActionType.Init: {
      const order = action?.data ?? 4;
      return produce(state, draft => {
        draft.order = order;
        draft.cells = generateEmptyCells(order);
      });
    }
    case BoardActionType.Load: {
      const cells = action.data;
      return { ...state, cells };
    }
    case BoardActionType.Move: {
      const status = action.data;
      const idx = state.currentIdx;
      return produce(state, draft => {
        draft.cells[idx].status = status;
        draft.cells[idx].lastModifiedTime = Date.now();
      });
    }
    case BoardActionType.Select: {
      const idx = action.data;
      return produce(state, draft => {
        draft.selected = true;
        draft.currentIdx = action.data;
      });
    }
    case BoardActionType.Clear: {
      const { order } = state;
      return { ...state, cells: generateEmptyCells(order) };
    }
    default: {
      return state;
    }
  }
};
