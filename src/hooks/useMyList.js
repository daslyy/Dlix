import { useContext } from "react";
import { MyListContext } from "../context/myListStore";

export default function useMyList() {
  const context = useContext(MyListContext);

  if (!context) {
    throw new Error("useMyList must be used within a MyListProvider");
  }

  return context;
}
