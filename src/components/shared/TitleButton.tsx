import { Link } from "react-router-dom";

interface TitleButtonProps {
  title: string;
  path: string;
  buttonTitle: string;
}

export default function TitleButton({
  title,
  path,
  buttonTitle,
}: TitleButtonProps) {
  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-4xl font-bold text-slate-600">{title}</h2>
        <Link
          className="rounded-md bg-indigo-600 p-3 text-sm text-white font-bold shadow-sm hover:bg-indigo-500 transition-all duration-200 ease-in-out"
          to={path}
        >
          {buttonTitle}
        </Link>
      </div>
    </div>
  );
}
