import { Dispatch, SetStateAction } from 'react';

interface TabProps {
  title: string;
  active: boolean;
  onTap: () => void;
}

const Tab = ({ title, active, onTap }: TabProps) => {
  return (
    <li
      className={`z-30 flex-auto text-center ${
        active ? 'bg-white rounded-lg' : 'transparent'
      }`}
    >
      <button
        className="z-30 flex items-center justify-center w-full px-0 py-1 mb-0 transition-all ease-in-out border-0 rounded-lg cursor-pointer text-slate-700 bg-inherit"
        data-tab-target=""
        role="tab"
        aria-selected={active}
        onClick={onTap}
      >
        <span className="ml-1">{title}</span>
      </button>
    </li>
  );
};

interface TabsProps {
  activeTab: string; // Add the prop for activeTab
  setTab: Dispatch<SetStateAction<string>>;
}

const Tabs = ({ activeTab, setTab }: TabsProps) => {
  return (
    <div className="w-full mx-auto">
      <div className="relative right-0">
        <ul
          className="relative flex flex-wrap p-1 gap-1 list-none rounded-xl bg-gray-200"
          data-tabs="tabs"
          role="list"
        >
          <Tab
            title="Posts"
            active={activeTab === 'Posts'}
            onTap={() => {
              setTab('Posts');
            }}
          />
          <Tab
            title="Stories"
            active={activeTab === 'Stories'}
            onTap={() => {
              setTab('Stories');
            }}
          />
        </ul>
      </div>
    </div>
  );
};

export default Tabs;
