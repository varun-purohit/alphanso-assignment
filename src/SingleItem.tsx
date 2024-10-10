import { useContext } from "react";
import { todoContext } from "./Context";
import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
interface singleItemProps {
  itemId: string;
}

const SingleItem = ({ itemId }: singleItemProps) => {
  const context = useContext(todoContext);
  if (!context) {
    return;
  }

  const { items, removeItem, editItem } = context;
  const item = items.find((item) => item.id === itemId);
  if (!item) {
    return null;
  }
  return (
    <div
      className={`flex bg-gray-50 items-center justify-between p-2 sm:py-3 sm:px-3 rounded-md w-full my-2 border-2 transition-all duration-300 ${
        item.completed ? "border-[#c2e0b5] bg-[#e8f3e1]" : ""
      }`}
    >
      <label
        htmlFor={`checkbox-${itemId}`}
        className="relative inline-flex items-center cursor-pointer"
      >
        <input
          type="checkbox"
          id={`checkbox-${itemId}`}
          checked={item.completed}
          onChange={() => editItem(item.id)}
          className="hidden"
        />
        <div
          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center cursor-pointer  ${
            item.completed ? "border-[#c2e0b5]" : ""
          }`}
        >
          {item.completed ? <FaCheck className="text-[#c2e0b5] text-xl" /> : ""}
        </div>
      </label>

      <p className={`flex-grow mx-2 ${item.completed ? "text-gray-500" : ""}`}>
        {item.name}
      </p>
      <button onClick={() => removeItem(item.id)} className="flex-shrink-0">
        <IoClose className="text-gray-300" />
      </button>
    </div>
  );
};

export default SingleItem;
