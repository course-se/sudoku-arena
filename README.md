# sudoku-arena
Fight your friends in Soduku Arena online! Project for Software Engineering course.

## For teacher or TAs

如果你没有听说过“类型即注释”这句话，那么就请你不要对该工程内对注释行数有所要求。举个例子（假设你具有一定的前端知识）：

```javascript
/**
 * 
 * @param order number
 * @returns \{
    idx: number;
    status: CellStatus;
    mutable?: boolean;
    lastModifiedTime?: number;
    \}
 */
const generateEmptyCellsWithComment = (order) =>
  Array(order ** 2).fill(initialCell);
```

上面这种形式远远不如下面这种：

```typescript
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
  _9 = 9,
}

export interface ICell {
  idx: number;
  status: CellStatus;
  mutable?: boolean;
  lastModifiedTime?: number;
}

const generateEmptyCells = (order: number) =>
  Array(order ** 2).fill(initialCell) as ICell[];
```

**所以我建议你谦逊地承认这个事实。**
