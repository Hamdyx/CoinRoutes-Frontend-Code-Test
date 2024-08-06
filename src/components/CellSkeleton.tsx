import { Skeleton } from 'antd';

export const CellSkeleton = ({
  shape = 'round',
  width,
  height = '16px',
  block = true,
}: {
  shape?: 'circle' | 'square' | 'round' | 'default';
  width?: string;
  height?: string;
  block?: boolean;
}) => <Skeleton.Button active size="small" shape={shape} block={block} style={{ height, width, minWidth: width }} />;
