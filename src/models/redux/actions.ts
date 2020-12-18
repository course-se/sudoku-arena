import { Action } from "redux";
import { Reducer } from "react";
import { ISudokuStore, CellStatus, Difficulty, ICell } from "./store";

export enum GameActionType {
  Init = "game/init",
  Submit = "game/submit",
  Difficulty = "game/difficulty",
  Progress = "game/progress"
}

export enum BoardActionType {
  Init = "board/init",
  Load = "board/load",
  Save = "board/save",
  Move = "board/move",
  Clear = "board/clear",
  Select = "board/select"
}

export const GameActions = {
  setDifficulty: (difficulty: Difficulty) => ({
    type: GameActionType.Difficulty,
    data: difficulty
  }),
  setProgress: (progress: number) => ({
    type: GameActionType.Progress,
    data: progress
  })
};

export const BoardActions = {
  init: (order: number) => ({
    type: BoardActionType.Init,
    data: order
  }),
  makeMove: (status: CellStatus) => ({
    type: BoardActionType.Move,
    data: status
  }),
  select: (idx: number) => ({
    type: BoardActionType.Select,
    data: idx
  }),
  load: (cells: ICell[]) => ({
    type: BoardActionType.Load,
    data: cells
  })
};
