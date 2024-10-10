import { useContext } from "react";
import SingleItem from "./SingleItem";
import { todoContext, TodoContextType } from "./Context";

const Items = () => {
  const { filteredItems } = useContext(todoContext) as TodoContextType;

  return (
    <div>
      {filteredItems.map((item) => (
        <SingleItem key={item.id} itemId={item.id} />
      ))}
    </div>
  );
};

export default Items;
