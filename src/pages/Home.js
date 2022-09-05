import React, { useEffect } from "react";
import axios from "axios";

export default function Home() {
  useEffect(() => {
    axios
      .get("http://localhost:3000/posts")
      .then((res) => console.log(res.data));
  }, []);
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}
