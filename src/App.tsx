import Form from "./Form";
import Items from "./Items";
import { ToastContainer } from "react-toastify";
import { TodoProvider } from "./Context";
import Heading from "./Heading";

const App = () => {
  return (
    <div className=" flex justify-center pt-24 h-screen">
      <TodoProvider>
        <section className="  p-4 max-w-sm sm:max-w-xl md:max-w-3xl lg:max-w-5xl w-full transition-all duration-300 ">
          <ToastContainer position="top-center" />
          <div className="flex flex-col space-y-2">
            <Heading />
            <Items />
            <Form />
          </div>
        </section>
      </TodoProvider>
    </div>
  );
};

export default App;
