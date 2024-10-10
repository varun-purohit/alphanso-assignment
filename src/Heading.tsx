import { CiSearch } from "react-icons/ci";
import Filter from "./Filter";
import { useContext } from "react";
import { todoContext, TodoContextType } from "./Context";

const Heading = () => {
  const { searchItems } = useContext(todoContext) as TodoContextType;
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:space-x-2 space-y-1 ">
      <div className="flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl text-gray-800 font-bold">Today</h2>
      </div>
      <div className="flex flex-col w-full sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 transition-all duration-300">
        <div className="w-full relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <CiSearch className="text-gray-600" />
          </div>
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => searchItems(e.target.value)}
            className="w-full py-2 px-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <Filter />
      </div>
    </div>
  );
};
export default Heading;
