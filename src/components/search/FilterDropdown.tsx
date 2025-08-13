interface FilterDropdownProps {
  children: React.ReactNode;
  onClose?: () => void;
}
export default function FilterDropdown({ children }: FilterDropdownProps) {
  return (
    <div className="absolute top-10 bg-white border border-graye5 rounded-md p-4">
      {children}
    </div>
  );
}
