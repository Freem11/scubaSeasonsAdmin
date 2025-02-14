import React from 'react';
import './style.scss';

export type RoundButtonProps = {
  onClick?:   () => void
  icon?:      React.ReactNode
  className?: string
};

export default function RoundButtonIcon(props: RoundButtonProps) {
  return (
    <button onClick={props.onClick} className={`btn button ${props.className ?? ''}`}>
      <i className="icon">{props.icon}</i>
    </button>
  );
}
