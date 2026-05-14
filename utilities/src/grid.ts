export function gridCols(n: number): string {
  return `repeat(${n}, minmax(0, 1fr))`;
}

export function gridRows(n: number): string {
  return `repeat(${n}, minmax(0, 1fr))`;
}

export const gridColsScale: Record<string, string> = {
  "1": gridCols(1),
  "2": gridCols(2),
  "3": gridCols(3),
  "4": gridCols(4),
  "5": gridCols(5),
  "6": gridCols(6),
  "7": gridCols(7),
  "8": gridCols(8),
  "9": gridCols(9),
  "10": gridCols(10),
  "11": gridCols(11),
  "12": gridCols(12),
  none: "none",
};

export const gridRowsScale: Record<string, string> = {
  "1": gridRows(1),
  "2": gridRows(2),
  "3": gridRows(3),
  "4": gridRows(4),
  "5": gridRows(5),
  "6": gridRows(6),
  none: "none",
};

export const colSpanValues: Record<string, string> = {
  "1": "span 1 / span 1",
  "2": "span 2 / span 2",
  "3": "span 3 / span 3",
  "4": "span 4 / span 4",
  "5": "span 5 / span 5",
  "6": "span 6 / span 6",
  "7": "span 7 / span 7",
  "8": "span 8 / span 8",
  "9": "span 9 / span 9",
  "10": "span 10 / span 10",
  "11": "span 11 / span 11",
  "12": "span 12 / span 12",
  full: "1 / -1",
  auto: "auto",
};

export const rowSpanValues: Record<string, string> = {
  "1": "span 1 / span 1",
  "2": "span 2 / span 2",
  "3": "span 3 / span 3",
  "4": "span 4 / span 4",
  "5": "span 5 / span 5",
  "6": "span 6 / span 6",
  full: "1 / -1",
  auto: "auto",
};

export const gridStartEndValues: Record<string, string> = {
  "1": "1",
  "2": "2",
  "3": "3",
  "4": "4",
  "5": "5",
  "6": "6",
  "7": "7",
  "8": "8",
  "9": "9",
  "10": "10",
  "11": "11",
  "12": "12",
  "13": "13",
  auto: "auto",
};

export const gridAutoFlowValues: Record<string, string> = {
  row: "row",
  col: "column",
  dense: "dense",
  "row-dense": "row dense",
  "col-dense": "column dense",
};

export const gridAutoColsValues: Record<string, string> = {
  auto: "auto",
  min: "min-content",
  max: "max-content",
  fr: "minmax(0, 1fr)",
};

export const gridAutoRowsValues: Record<string, string> = {
  auto: "auto",
  min: "min-content",
  max: "max-content",
  fr: "minmax(0, 1fr)",
};

export const placeItemsValues: Record<string, string> = {
  start: "start",
  end: "end",
  center: "center",
  stretch: "stretch",
};

export const placeContentValues: Record<string, string> = {
  start: "start",
  end: "end",
  center: "center",
  between: "space-between",
  around: "space-around",
  evenly: "space-evenly",
  stretch: "stretch",
};

export const placeSelfValues: Record<string, string> = {
  auto: "auto",
  start: "start",
  end: "end",
  center: "center",
  stretch: "stretch",
};
