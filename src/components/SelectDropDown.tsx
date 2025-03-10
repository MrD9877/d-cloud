import { StoreState } from "@/redux/Silce";
import { setView } from "@/utility/reduxFn";
import React from "react";
import { useSelector } from "react-redux";

const items = [4, 6, 8, 12, 16];
export default function SelectDropDown() {
  const { view } = useSelector((state: StoreState) => state);

  return (
    <select onChange={(e) => setView(Number(e.target.value))} name={`Load:${view}`} id="cars">
      {items.map((item) => {
        return (
          <option key={item} value={item}>
            Load:{item}
          </option>
        );
      })}
    </select>
  );
}
