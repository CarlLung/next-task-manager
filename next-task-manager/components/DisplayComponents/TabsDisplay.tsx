import { filterName, filterMap } from "../../functions/filters";
import { TabButton } from "../ButtonComponents/TabButton";

export interface TabDisplayProps {
  selectedTab: string;
  handleSelectedTab: (name: keyof typeof filterMap) => void;
}

export const TabsDisplay = ({
  selectedTab,
  handleSelectedTab,
}: TabDisplayProps) => {
  return (
    <>
      <a className="flex flex-row mt-2 items-center w-full px-3 text-red-600 fill-red-600 height: 7px">
        <svg
          className="w-8 h-8 shrink"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
        </svg>
        <span className="ml-3 text-md font-bold shrink">Todoist-Clone</span>
      </a>

      <ul className="h-full mt-3 items-center border-t border-gray-600 overflow-y-scroll ">
        {filterName.map((name) => (
          <li
            key={name}
            className="hover:bg-gray-700 text-gray-400 fill-gray-400 hover:fill-red-600 hover:text-zinc-100 cursor-pointer py-1 pl-2"
          >
            <TabButton
              handleSelectedTab={handleSelectedTab}
              name={name}
              isClicked={name === selectedTab}
            />
          </li>
        ))}
      </ul>
    </>
  );
};
