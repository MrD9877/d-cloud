import React from "react";

const items = [4, 6, 8, 12, 16];
export default function SelectDropDown({ view, setView }: { view: number; setView: React.Dispatch<React.SetStateAction<number>> }) {
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
