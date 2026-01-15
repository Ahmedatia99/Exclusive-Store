import { PacmanLoader } from "react-spinners";
import type { CSSProperties } from "react";

interface LoadingSpinnerProps {
  size?: number | string;
  color?: string;
  loading?: boolean;
  className?: string;
  fullScreen?: boolean;
}

export default function LoadingSpinner({
  size = 25,
  color = "#DB4444", // Main color from theme
  loading = true,
  className = "",
  fullScreen = false,
}: LoadingSpinnerProps) {
  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: color,
  };

  if (fullScreen) {
    return (
      <div
        className={`flex items-center justify-center min-h-[400px] w-full ${className}`}
      >
        <PacmanLoader
          color={color}
          loading={loading}
          cssOverride={override}
          size={size}
          aria-label="Loading"
        />
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center py-10 ${className}`}>
      <PacmanLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={size}
        aria-label="Loading"
      />
    </div>
  );
}
