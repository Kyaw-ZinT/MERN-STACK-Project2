import React, { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import Pagination from "../components/Pagination";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Home() {
  let [books, setBooks] = useState([]);
  let [links, setLinks] = useState(null);
  let navigate = useNavigate();

  let location = useLocation();
  let searchQuary = new URLSearchParams(location.search);
  let page = searchQuary.get("page");
  page = parseInt(page) ? parseInt(page) : 1;

  useEffect(() => {
    let bookFetch = async () => {
      let response = await axios("http://localhost:4002/api/books?page=" + page, { withCredentials: true });
      if (response.status === 200) {
        let data = response.data;
        setBooks(data.data);
        setLinks(data.links);
      }
    };
    bookFetch();
  }, [page]);

  let handleDelete = (_id) => {
    if (books.length === 1 && page > 1) {
      navigate("/?page=" + (page - 1));
    }
    setBooks((prevBooks) => prevBooks.filter((book) => book._id !== _id));
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-3 ">
        {!!books.length && books.map((book) => <BookCard key={book._id} book={book} onDelete={handleDelete} />)}
      </div>
      {!!links && <Pagination links={links} page={page || 1} />}{" "}
    </>
  );
}
