import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
export default function CreateForm() {
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [categories, setCategories] = useState([]);
  let [newCategories, setNewCategories] = useState("");
  let [errors, setErrors] = useState([]);
  let navigate = useNavigate();
  let { id } = useParams();
  let addCategories = () => {
    if (newCategories && categories.includes(newCategories)) {
      setNewCategories("");
      return;
    }

    setCategories((prev) => [...prev, newCategories]);
    setNewCategories("");
  };

  useEffect(() => {
    let editFetch = async () => {
      if (id) {
        let res = await axios.get("http://localhost:4002/api/books/" + id, { withCredentials: true });
        if (res.status === 200) {
          setTitle(res.data.title);
          setDescription(res.data.description);
          setCategories(res.data.categories);
        }
      }
    };
    editFetch();
  }, [id]);

  let submitBook = async (e) => {
    try {
      e.preventDefault();

      let book = {
        title,
        description,
        categories,
      };

      let res;
      if (id) {
        res = await axios.patch("http://localhost:4002/api/books/" + id, book, { withCredentials: true });
      } else {
        res = await axios.post("http://localhost:4002/api/books", book, {
          withCredentials: true,
        });
      }
      if (res.status === 200) {
        navigate("/");
      }
    } catch (e) {
      setErrors(Object.keys(e.response.data.errors));
    }
  };

  return (
    <div className=" w-full max-w-md mx-auto ">
      <form action="" className="p-4 border border-gray-400 rounded-md space-y-3 " onSubmit={submitBook}>
        <h2 className="text-center font-medium text-2xl">Book form</h2>
        <ul className="list-disc pl-5">
          {!!errors.length &&
            errors.map((error, i) => (
              <li key={i} className="text-red-500 italic text-sm ">
                {error} is invalid
              </li>
            ))}
        </ul>
        <div>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="border block leading-tight w-full shadow mx-auto rounded-lg focus:outline-none p-2 "
            placeholder="Book title"
          />
        </div>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          name=""
          id=""
          rows="5"
          className="border block w-full shadow mx-auto rounded-lg focus:outline-none p-2 "
          placeholder="Book description"
        ></textarea>

        <div className=" ">
          <div className="flex items-center gap-2 pb-5 w-full ">
            <input
              value={newCategories}
              onChange={(e) => setNewCategories(e.target.value)}
              type="text"
              className="border w-full mx-auto shadow rounded-lg focus:outline-none p-2 "
              placeholder="Book categories"
            />

            <div onClick={addCategories}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>
          </div>

          <div>
            {!!categories.length &&
              categories.map((category, i) => (
                <span key={i} className="px-2 py-1  rounded-md text-sm text-white m-1 bg-blue-500">
                  {category}
                </span>
              ))}
          </div>
        </div>
        <button type="submit" className="p-2 bg-blue-500 rounded-md text-white w-full ">
          Add book
        </button>
      </form>
    </div>
  );
}
