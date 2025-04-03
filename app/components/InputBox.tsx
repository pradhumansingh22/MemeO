"use client";

import type React from "react";

import { useState } from "react";
import { cn } from "../lib/utils/utils";

interface DepthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string; ref?:React.Ref<HTMLInputElement>
}

export default function InputBox({
  type,
  className,
  label,
  id,
  ref,
  value,
  onChange,
  ...props
}: DepthInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="space-y-1 mt-1">
      {label && (
        <label htmlFor={id} className="block text-xs font-medium text-gray-500">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          ref={ref}
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          className={cn(
            "w-full px-4 rounded-3xl bg-gray-100 border border-gray-200 text-sm text-gray-500",
            "shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]",
            "focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500/30 focus:border-blue-500/80",
            "transition-all duration-200",
            isFocused ? "bg-white" : "bg-gray-100",
            className
          )}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
      </div>
    </div>
  );
}
