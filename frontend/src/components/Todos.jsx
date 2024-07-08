"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AddTodo from "./AddTodo";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Todos({ todos, token }) {
  const router = useRouter();
  const [notDoneTodos, setNotDoneTodos] = useState([]);
  const [Upd, setUpd] = useState(false);
  const [id, setId] = useState("");
  const [doneTodos, setDoneTodos] = useState([]);
  const [addModel, setAddModel] = useState(false);
  console.log(todos, "asdfjlkasjdflj;lcxmv,zxcmv");

  useEffect(() => {
    toast.success("Welcome!");
  }, []);

  useEffect(() => {
    if (token) {
      console.log(token)
      const notDone = todos.filter((item) => {
        return item.isDone === false;
      });
      const done = todos.filter((todo) => {
        return todo.isDone === true;
      });
      setDoneTodos(done);
      setNotDoneTodos(notDone);
    }
  }, [todos]);

  const handleTodoClick = (todo) => {
    setId(todo);
    setAddModel(true);
    setUpd(true);
  };

  const deleteTodo = async (id) => {
    console.log(todos);
    const todoid = {
      _id: id,
      token: token,
    };
    try {
      const res = await fetch(
        "https://mern-todo-kanban-production.up.railway.app/todos",
        {
          method: "DELETE",
          credentials: "include",

          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(todoid),
        }
      );
      const data = await res.json();
      console.log(data);
      const notDone = data.filter((item) => item.isDone === false);
      const done = data.filter((item) => item.isDone === true);
      console.log(done, "====");
      console.log(done);
      setNotDoneTodos([...notDone]);
      setDoneTodos([...done]);

      if (res.ok) {
        toast.error("Todo Deleted");
        console.log("Todo Deleted");
      }
    } catch (error) {
      console.log(`Error Deleting Todo: ${error}`);
    }
  };

  const updatingDoneProp = async (_id, status) => {
    const res = await fetch(
      "https://mern-todo-kanban-production.up.railway.app/todos",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ _id, status: status, token: token }),
      }
    );
    const data = res.json();
    console.log("Todo status updated");
  };

  const handleDragDrop = (results) => {
    const { source, destination, type } = results;
    console.log(source, destination);
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;
    if (type === "group") {
      let delTodo;
      const reorderedTodos = [...notDoneTodos];
      const doneReordered = [...doneTodos];
      const sourceIndex = source.index;
      const destinationIndex = destination.index;
      if (destination.droppableId !== source.droppableId) {
        if (destination.droppableId === "DONE") {
          [delTodo] = reorderedTodos.splice(sourceIndex, 1);
          toast.success("Todo moved to Completed");
          const todo = notDoneTodos[sourceIndex];
          updatingDoneProp(todo._id, true);
          doneTodos.splice(destinationIndex, 0, delTodo);
          setNotDoneTodos(reorderedTodos);
          return setDoneTodos(doneTodos);
        } else if (destination.droppableId === "ROOT") {
          [delTodo] = doneReordered.splice(sourceIndex, 1);
          toast.success("Todo moved to Pending");
          const todo = doneTodos[sourceIndex];
          updatingDoneProp(todo._id, false);
          notDoneTodos.splice(destinationIndex, 0, delTodo);
          setDoneTodos(doneReordered);
          return setNotDoneTodos(notDoneTodos);
        }
      } else if (
        source.droppableId === "ROOT" &&
        destination.droppableId === "ROOT"
      ) {
        const [removedTodo] = reorderedTodos.splice(sourceIndex, 1);
        reorderedTodos.splice(destinationIndex, 0, removedTodo);
        return setNotDoneTodos(reorderedTodos);
      } else if (
        source.droppableId === "DONE" &&
        destination.droppableId === "DONE"
      ) {
        const [removedTodo] = doneReordered.splice(sourceIndex, 1);
        doneReordered.splice(destinationIndex, 0, removedTodo);
        return setDoneTodos(doneReordered);
      }
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragDrop}>
      <ToastContainer />
      <div className="mt-[32px] flex justify-between">
        {addModel && (
          <AddTodo
            token={token}
            notDoneTodos={notDoneTodos}
            id={id}
            setAddModel={setAddModel}
            Upd={Upd}
            setNotDoneTodos={setNotDoneTodos}
            setDoneTodos={setDoneTodos}
            setUpd={setUpd}
            doneTodos={doneTodos}
          />
        )}
        <Droppable droppableId="ROOT" type="group">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="p-[24px] max-w-[560px] h-fit w-full rounded-[16px] bg-[#D5CCFF]"
            >
              <div className="flex items-center justify-between">
                <div className="flex gap-[8px]">
                  <img src="/clip.svg" />
                  <h1 className="font-bold text-[30px] text-[#2B1887]">
                    To-Do
                  </h1>
                </div>
                <button
                  onClick={() => setAddModel(true)}
                  className="hover:bg-opacity-50 transtion ease-out duration-500 font-semibold text-[#2B1887] p-[8px] bg-white rounded-[8px]"
                >
                  Add +
                </button>
              </div>
              {!notDoneTodos.length && (
                <div className="mx-auto w-fit my-[24px] font-semibold text-[24px]">
                  <h1>No Todos Here</h1>
                </div>
              )}
              {notDoneTodos.map((todo, index) => {
                return (
                  <Draggable
                    draggableId={todo._id}
                    key={todo._id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        onClick={() => handleTodoClick(todo._id)}
                        className="p-[24px] hover:bg-opacity-60 transtion ease-in-out duration-300 cursor-pointer mt-[24px] bg-[#F4F2FF] rounded-[12px]"
                      >
                        <div>
                          <div className="flex justify-between">
                            <h1 className="font-bold text-[24px]">
                              {todo.title}
                            </h1>
                            <img
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteTodo(todo._id);
                              }}
                              className="trasition hover:cursor-pointer hover:-translate-y-1 trasition-all ease-in-out duration-300"
                              src="/trash.svg"
                            />
                          </div>
                          <p className="mt-[16px]">{todo.description}</p>
                          <div className="mt-[26px] flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="p-[8px] bg-[#ECB800] rounded-[8px] max-w-[35.76px] w-full">
                                <h1 className="text-white font-semibold text-[16px] leading-[24px]">
                                  Fri
                                </h1>
                              </div>
                              <div className="flex items-center gap-3">
                                <img
                                  className="max-w-[24px] w-full max-h-[25px]"
                                  src="/orange.svg"
                                />
                                <img
                                  className="max-w-[24px] w-full max-h-[25px]"
                                  src="/gray.svg"
                                />
                              </div>
                            </div>
                            <div className="text-[24px] leading-[32px] text-[#2B1887]">
                              {notDoneTodos.indexOf(todo) + 1}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="DONE" type="group">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="p-[24px] max-w-[560px] h-fit w-full rounded-[16px] bg-[#D5CCFF]"
            >
              <div className="flex items-center justify-between">
                <div className="flex gap-[8px]">
                  <img src="/isDone.svg" />
                  <h1 className="font-bold text-[30px] text-[#2B1887]">Done</h1>
                </div>
              </div>
              {!doneTodos.length && (
                <div className="mx-auto w-fit my-[28px] font-semibold text-[24px]">
                  <h1>No Todos Here</h1>
                </div>
              )}
              {doneTodos.map((todo, index) => {
                return (
                  <Draggable
                    index={index}
                    draggableId={todo._id}
                    key={todo._id}
                  >
                    {(provided) => (
                      <div
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        onClick={() => handleTodoClick(todo._id)}
                        className="p-[24px] hover:bg-opacity-60 transtion ease-in-out duration-300 cursor-pointer mt-[24px] bg-[#F4F2FF] rounded-[12px]"
                      >
                        <div>
                          <div className="flex justify-between">
                            <h1 className="font-bold text-[24px]">
                              {todo.title}
                            </h1>
                            <img
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteTodo(todo._id);
                              }}
                              className="trasition hover:cursor-pointer hover:-translate-y-1 trasition-all ease-in-out duration-300"
                              src="/trash.svg"
                            />
                          </div>
                          <p className="mt-[16px]">{todo.description}</p>
                          <div className="mt-[26px] flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="p-[8px] bg-[#ECB800] rounded-[8px] max-w-[35.76px] w-full">
                                <h1 className="text-white font-semibold text-[16px] leading-[24px]">
                                  Fri
                                </h1>
                              </div>
                              <div className="flex items-center gap-3">
                                <img
                                  className="max-w-[24px] w-full max-h-[25px]"
                                  src="/blue.svg"
                                />
                                <img
                                  className="max-w-[24px] w-full max-h-[25px]"
                                  src="/blue.svg"
                                />
                              </div>
                            </div>
                            <div className="text-[24px] leading-[32px] text-[#2B1887]">
                              {doneTodos.indexOf(todo) + 1}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}
