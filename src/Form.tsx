import { FormEvent, useState, useContext } from "react";
import { toast } from "react-toastify";
import { todoContext, TodoContextType } from "./Context";

const Form = () => {
  const context = useContext(todoContext);

  const { addItem } = context as TodoContextType;
  const [newItemName, setNewItemName] = useState<string>("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!newItemName) {
      toast.error("No value");
      return;
    }
    addItem(newItemName);
    setNewItemName("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full space-y-2">
      <input
        type="text"
        value={newItemName}
        placeholder="Type Something"
        className="w-full py-2 sm:py-3 px-3 sm:px-4 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
        onChange={(event) => setNewItemName(event.target.value)}
      />
      <button
        type="submit"
        className="bg-black text-white rounded-md py-2 sm:py-3 text-sm sm:text-base"
      >
        Add Task
      </button>
    </form>
  );
};

export default Form;
