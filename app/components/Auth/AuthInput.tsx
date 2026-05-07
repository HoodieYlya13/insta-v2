"use client";

interface AuthInputProps {
  label: string;
  type: string;
  placeholder?: string;
  defaultValue?: string;
  className?: string;
}

export function AuthInput({
  label,
  type,
  placeholder,
  defaultValue,
  className = "w-full p-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary outline-none transition-all",
}: AuthInputProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className={className}
      />
    </div>
  );
}
