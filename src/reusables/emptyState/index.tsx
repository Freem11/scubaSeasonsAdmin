import React from 'react';
import './style.scss';

type EmptyStateProps = {
  visual: React.ReactNode
  text:   string
  error:  boolean
  onClick?: () => void
};

export default function EmptyState({ visual, text, error }: EmptyStateProps) {
  return (
    <div className={`emptyState ${error && 'error'}`}>
      <div>
        {visual}
      </div>
      <p>{text}</p>
    </div>
  );
}
