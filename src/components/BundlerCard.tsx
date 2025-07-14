import React from "react";
import { BundlerType } from "./BundlerPopup";
import { Share2, Trash2 } from "lucide-react";
import DeletePromtCard from "./DeletePromtCard";
import { useRouter } from "next/navigation";
import { getDate } from "@/utility/convertTime";

export default function BundlerCard({ item, initData, setSelect, select, setTriggerId, triggerShareRef }: { triggerShareRef: React.RefObject<HTMLButtonElement | null>; item: BundlerType; initData: () => Promise<void>; setSelect: React.Dispatch<React.SetStateAction<string[]>>; select: string[]; setTriggerId: React.Dispatch<React.SetStateAction<string | undefined>> }) {
  const router = useRouter();

  const openBundler = (id: string) => {
    router.push(`/bundle?bundlerId=${id}`);
  };

  const handleCheckboxChange = (id: string) => {
    setSelect(
      (prev) =>
        prev.includes(id)
          ? prev.filter((item) => item !== id) // remove if already selected
          : [...prev, id] // add if not selected
    );
  };

  return (
    <>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="w-4 p-4">
          <span className="flex items-center ">
            <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" checked={select.includes(item.bundlerId)} onChange={() => handleCheckboxChange(item.bundlerId)} />
            <label htmlFor="checkbox-table-search-1" className="sr-only">
              checkbox
            </label>
          </span>
        </td>
        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white hover:text-blue-600" onClick={() => openBundler(item.bundlerId)}>
          {item.name}
        </th>
        <td className="px-6 py-4" onClick={() => openBundler(item.bundlerId)}>
          {getDate(item.createdAt)}
        </td>
        <td className="flex items-center px-6 py-4 gap-4">
          <button
            onClick={() => {
              setTriggerId(item.bundlerId);
              triggerShareRef.current?.click();
            }}
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            <Share2 width={20} height={20} />
          </button>
          <DeletePromtCard bundlerId={item.bundlerId} initData={initData}>
            <span className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3">
              <Trash2 width={20} height={20} />
            </span>
          </DeletePromtCard>
        </td>
      </tr>
    </>
  );
}
