import { useContext } from "react";
import { todoContext, TodoContextType } from "./Context";

const Filter = () => {
  const { filterItems, currentFilter } = useContext(
    todoContext
  ) as TodoContextType;
  console.log(currentFilter);

  const buttons = [
    { id: "all", text: "All" },
    { id: "completed", text: "Completed" },
    { id: "incomplete", text: "Incomplete" },
  ];

  return (
    <div className="flex sm:justify-start space-x-2">
      {buttons.map((button) => (
        <button
          key={button.id}
          onClick={() =>
            filterItems(button.id as "all" | "completed" | "incomplete")
          }
          className={`px-3 sm:px-4 py-1 sm:py-1.5  md:py-2 text-sm md:text-base rounded text-slate-100 transition-colors ${
            currentFilter === button.id ? "bg-[#54ac34]" : "bg-gray-400"
          }`}
        >
          {button.text}
        </button>
      ))}
    </div>
  );
};
export default Filter;
