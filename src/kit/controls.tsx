"use client";

// Stage controls. Every interactive element on a stage must carry data-qa="control"
// so computer-use QA can press it and check that something observable changed.
// A control that changes nothing fails QA ("the beautiful button that does nothing").

import type { ButtonHTMLAttributes, ReactNode } from "react";

export function Control({
  children,
  className = "",
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }) {
  return (
    <button type="button" data-qa="control" className={`control ${className}`} {...rest}>
      {children}
    </button>
  );
}

export function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  disabled,
  format = (v: number) => String(v),
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  disabled?: boolean;
  format?: (v: number) => string;
}) {
  return (
    <label className="slider">
      <span className="slider-label">
        {label} <output>{format(value)}</output>
      </span>
      <input
        data-qa="control"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        aria-label={label}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </label>
  );
}

export function Readout({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="readout" data-qa="readout">
      <span className="readout-label">{label}</span>
      <span className="readout-value">{value}</span>
    </div>
  );
}

export function Row({ children }: { children: ReactNode }) {
  return <div className="row">{children}</div>;
}
