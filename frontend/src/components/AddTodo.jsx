"use client";
import { useEffect, useState } from "react";
import Button from "./Button.jsx";
import { toast } from "react-toastify";

export default function AddTodo({
  setAddModel,
  notDoneTodos,
  id,
  Upd,
  setNotDoneTodos,
  setDoneTodos,
  setUpd,
  doneTodos,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  console.log(title, description);

  useEffect(() => {
    console.log("first");
    let todo = notDoneTodos.find((todo) => {
      return todo._id === id;
    });
    if (!todo) {
      todo = doneTodos.find((item) => {
        return item._id === id;
      });
    }
    if (Upd) {
      setTitle(todo.title);
      setDescription(todo.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, []);

  const handleAddTodo = async (e, id) => {
    let todo;
    e.preventDefault();
    let meth;
    if (Upd) {
      meth = "PUT";
      todo = {
        _id: id,
        title,
        description,
      };
    } else if (!Upd) {
      todo = {
        title,
        description,
      };
      meth = "POST";
    }
    try {
      const res = await fetch("https://mern-todo-kanban-production.up.railway.app/todos", {
        method: meth,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });
      console.log(res);
      if (res.ok) {
        const data = await res.json();
        if(meth === "PUT") {
          toast.success("Todo Updated")
        } else if (meth === "POST") {
          toast.success("Todo Created")
        }
        console.log(data);
        let notdone = data.filter((item) => {
          return item.isDone === false;
        });
        let done = data.filter((item) => {
          return item.isDone === true;
        });
        console.log(notdone, "asdf");
        setNotDoneTodos([...notdone]);
        setDoneTodos([...done]);
        setAddModel(false);
        setUpd(false)
        console.log("Todo Created");
      } else {
        console.log("Server Error While Adding Todo");
      }
    } catch (error) {
      console.log(`Error adding todo: ${error}`);
    }
  };
  return (
    <div className="flex inset-0 m-auto fixed">
      <div
        onClick={() => {
          setAddModel(false);
          setUpd(false);
        }}
        className="w-screen bg-black bg-opacity-70 h-screen absolute"
      ></div>
      <div className="max-w-[600px] inset-0 m-auto z-10 h-fit w-full bg-white py-[32px] px-[20px] rounded-[12px]">
        <h1 className="mx-auto w-fit font-bold text-[30px] text-[#312E81]">
          {Upd ? "Update Todo" : "Add Todo"}
        </h1>
        <form onSubmit={(e) => handleAddTodo(e, id)}>
          <input
            type="text"
            value={title}
            className="text-[14px] mt-[8px] text-gray-600 focus:border-indigo-700 focus:outline-none leading-[20px] min-h-[40px] rounded-[4px] w-full border-[1px] pl-[12px] border-solid border-[#D1D5DB]"
            placeholder="Title"
            required
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="text-[14px] mt-[8px] py-[8px] text-gray-600 resize-none focus:border-indigo-700 focus:outline-none min-h-[200px] leading-[20px] rounded-[4px] w-full border-[1px] pl-[12px] border-solid border-[#D1D5DB]"
            placeholder="Description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex justify-between items-center">
            {!Upd && <Button text={"Add"} />}
            {Upd && <Button text={"Update"} />}
            <button
              onClick={() => {
                setAddModel(false);
                setUpd(false);
              }}
              className="py-2 hover:bg-opacity-90 transition duration-500 ease-out px-10 border-[1px] text-white rounded-[6px] border-solid border-black bg-[#2B187D]"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
