import { useRef, useState } from "react";
import BundlerCard from "./BundlerCard";
import ShareKey from "./ShareKey";

export type BundlerType = {
  name: string;
  createdAt: number;
  bundlerId: string;
};

type BundlerCardType = {
  card: BundlerType[];
  select: string[];
  setSelect: React.Dispatch<React.SetStateAction<string[]>>;
  initData: () => Promise<void>;
};

export default function BundlerPopup({ card, select, setSelect, initData }: BundlerCardType) {
  const triggerShareRef = useRef<HTMLButtonElement>(null);
  const [triggeredId, setTriggerId] = useState<string>();

  const addAll = (bundlers: BundlerType[]) => {
    const ids = bundlers.map((item) => item.bundlerId);
    setSelect(ids);
  };
  const removeAll = () => {
    setSelect([]);
  };

  const handleAllChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      addAll(card);
    } else {
      removeAll();
    }
  };

  return (
    <div className="relative w-fit  shadow-md sm:rounded-lg">
      <ShareKey triggerShareRef={triggerShareRef} bundlerId={triggeredId} />

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="p-4">
              <span className="flex items-center">
                <input checked={select.length === card.length} onChange={handleAllChecked} id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="checkbox-all-search" className="sr-only">
                  checkbox
                </label>
              </span>
            </th>
            <th scope="col" className="px-6 py-3">
              Bundler name
            </th>
            <th scope="col" className="px-6 py-3">
              Creation date
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {card.map((item, index) => {
            return <BundlerCard triggerShareRef={triggerShareRef} item={item} setSelect={setSelect} select={select} key={index} initData={initData} setTriggerId={setTriggerId} />;
          })}
        </tbody>
      </table>
    </div>
  );
}
