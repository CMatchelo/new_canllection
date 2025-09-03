interface ButtonProps {
  onSubmit?: (...args: unknown[]) => void;
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
  className?: string;
}

export const Button = ({ onSubmit, type = "button", children, className }: ButtonProps) => {
  return (
    <button
      onClick={onSubmit}
      type={type}
      className={`rounded-2xl py-1 px-4 ml-2 
        flex flex-row items-center justify-center gap-1
        bg-highlight1 hover:bg-highlight1Light transition cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
};
