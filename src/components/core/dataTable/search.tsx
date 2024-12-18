import { Input } from '@/components/ui/input';
import { FC } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { MdOutlineClear } from 'react-icons/md';

interface SearchInputProps {
  value: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clearSearch: () => void;
}
const SearchInput: FC<SearchInputProps> = ({
  value,
  handleSearchChange,
  clearSearch,
}) => {
  return (
    <div className="w-full max-w-sm relative">
      <IoIosSearch className="w-4 h-4 absolute left-2.5 top-2.5 text-gray-500 dark:text-gray-400" />
      <Input
        value={value}
        onChange={handleSearchChange}
        placeholder="Buscar..."
        className="pl-8"
      />

      {value && (
        <button
          type="button"
          onClick={() => clearSearch()}
          className="absolute right-2.5 top-2.5 text-gray-500 dark:text-gray-400"
        >
          <MdOutlineClear />
        </button>
      )}
    </div>
  );
};

export default SearchInput;
