import * as React from "react";
import { View, Text } from "@tarojs/components";
import { FC, useCallback, useEffect, useState } from "react";
import { useSudokuSelector, ICell, CellStatus } from "../../models/redux/store";
import { useDispatch } from "react-redux";
import cx from "classnames";
import { BoardActions, BoardActionType } from "../../models/redux/actions";
import "./styles.less";
import { max } from "lodash";

interface ICoodinate {
  col: number;
  row: number;
}

const generateBoardStyles = (order: number) => ({
  gridTemplateColumns: `repeat(${order}, 1fr)`,
  gridTemplateRows: `repeat(${order}, 1fr)`
});

interface ICellProps extends ICell {
  onClick?: () => void;
}

const getCordByIdx = (idx: number, order: number): ICoodinate => {
  return {
    col: idx % order,
    row: Math.floor(idx / order)
  };
};

const getPeerDistance = (x: ICoodinate, y: ICoodinate) =>
  Math.max(Math.abs(x.col - y.col), Math.abs(x.row - y.row));

const usePeer = (idx: number) => {
  const { order, currentIdx } = useSudokuSelector(state => state.board);
  const selected = getCordByIdx(currentIdx, order);
  const current = getCordByIdx(idx, order);

  // console.log(selected,current);
  const peer = selected.col === current.col || selected.row === current.row;
  return peer ? getPeerDistance(selected, current) : 0;
};

const Cell: FC<ICellProps> = ({ idx, mutable, status = true, onClick }) => {
  const { currentIdx, selected: sthSelected, cells } = useSudokuSelector(
    state => state.board
  );
  const peerDistance = usePeer(idx);
  const selected = sthSelected && idx === currentIdx;
  const peer = sthSelected && !selected && peerDistance;
  const conflict = peer && status > 0 && cells[currentIdx].status === status;
  return (
    <View
      className={cx("sudoku-board-cell", {
        disable: !mutable,
        selected,
        peer,
        conflict
      })}
      style={{ transitionDelay: `${peerDistance * 50}ms` }}
      onClick={mutable ? onClick : null}
    >
      <View className="value">
        <Text className="text">
          {status !== CellStatus.Unknown ? status : ""}
        </Text>
      </View>
    </View>
  );
};

interface IBoardProps {}

export const Board: FC = props => {
  const { order, cells } = useSudokuSelector(state => state.board);
  const dispatch = useDispatch();

  const [boardStyles, setBoardStyles] = useState(generateBoardStyles(order));

  useEffect(() => {
    setBoardStyles(generateBoardStyles(order));
  }, [order]);

  useEffect(() => {
    dispatch(BoardActions.init(9));
  }, []);

  const handleCellClick = useCallback(
    (idx: number) => {
      if (idx >= order ** 2) {
        return;
      }
      if (!cells[idx].mutable) return;

      // const newStatus = ((cells[idx].status + 8) % 9) - 1;
      // console.log(idx, cells[idx], newStatus);
      dispatch(BoardActions.select(idx));
    },
    [order, cells]
  );

  return (
    <View className="sudoku-board-container" style={boardStyles}>
      {cells.map((cell, idx) => (
        <Cell
          idx={idx}
          mutable={cell.mutable}
          key={idx}
          status={cell.status}
          onClick={() => handleCellClick(idx)}
        />
      ))}
    </View>
  );
};
