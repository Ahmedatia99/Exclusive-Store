import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useTranslation } from "react-i18next";
interface RegistrationInputProps {
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  name: string;
  type: string;
  className?: string;
  label?: string;
  id?: string; 
  [x: string]: unknown; 
}
function RegistrationInput({
  value,
  onChange,
  placeholder = "",
  name,
  type,
  className = "",
  label,
  id,
  ...rest
}: RegistrationInputProps) {
  const { t } = useTranslation();
  const inputId = id || name;
  
  return (
    <div className="registration-input">
      {label && (
        <Label
          htmlFor={inputId}
          className="block text-body-sm font-medium text-gray-700 mb-1"
        >
          {t(label)}
        </Label>
      )}
      <Input
        id={inputId}
        type={type}
        name={name}
        placeholder={t(placeholder)}
        value={value}
        onChange={onChange} 
        className={`w-full border-2 border-gray-300 ${className}`}
        required
        aria-label={label ? t(label) : t(placeholder)}
        {...rest}
      />
    </div>
  );
}

export default RegistrationInput;
