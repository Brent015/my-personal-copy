import { FC, ReactNode } from "react";

const SearchLayout: FC<{
  header: ReactNode;
  content: ReactNode;
  footer: ReactNode;
  bgColor: string;
}> = ({ header, content, footer, bgColor = "grayscale-700" }) => {
  return (
    <div className={`flex flex-col bg-[${bgColor}] min-h-[calc(100vh_-_65px)]`}>
      {header}
      <div className="p-4 flex-1 max-h-[calc(100vh_-_214px)] overflow-auto">
        {content}
      </div>
      <div>{footer}</div>
    </div>
  );
};

export default SearchLayout;
