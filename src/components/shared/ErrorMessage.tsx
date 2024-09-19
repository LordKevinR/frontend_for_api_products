import { PropsWithChildren } from "react";

export default function ErrorMessage({ children }: PropsWithChildren) {
  return (
    <div className="bg-red-50 p-4 mt-5 rounded-lg">
      <p className="text-red-700 text-sm font-bold">{children}</p>
    </div>
  );
}
