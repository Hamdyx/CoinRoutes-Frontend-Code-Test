import { CellSkeleton } from '../CellSkeleton';

function withLoadingSkeleton<T, R>(
  isLoading: boolean,
  renderFunction: (value: T, record?: R) => JSX.Element | string | number,
) {
  const Cell = (value: T, record?: R): JSX.Element | string | number =>
    isLoading ? <CellSkeleton /> : renderFunction(value, record) ?? '_';

  return Cell;
}

export default withLoadingSkeleton;
