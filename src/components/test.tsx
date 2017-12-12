import * as React from 'react'
interface Props {
  code: string,
  onClick: () => void;
}

export const Test = (props: Props) => (
  <div onClick={props.onClick}>
    {props.code}
  </div>
)
