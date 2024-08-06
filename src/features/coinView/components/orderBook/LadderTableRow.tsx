import { getRowStyle } from "../../utils/getRowStyle";

type Props = {
  children: JSX.Element;
  'data-row-key': 'string';
};

function LadderTableRow({ children, ...restProps }: Props) {
  const recordKey = restProps['data-row-key'];
  const rowStyle = typeof recordKey === 'string' ? getRowStyle(recordKey) : {};

  return (
    <tr {...restProps} style={rowStyle}>
      {children}
    </tr>
  );
}

export default LadderTableRow;
