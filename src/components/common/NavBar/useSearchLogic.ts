import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export function useSearchLogic() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && inputRef.current) {
      const value: string = inputRef.current.value.trim();
      if (value !== "") {
        navigate(`/AllProducts?search=${encodeURIComponent(value)}`);
        inputRef.current.value = "";
      }
    }
    س;
  };

  return { inputRef, handleKeyDown };
}
