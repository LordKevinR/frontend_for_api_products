import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <header className="bg-slate-800 ">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white">Products Dashboard</h1>
        </div>
      </header>

      <main className="bg-white w-[95%] p-10 my-16 shadow-lg rounded-lg max-w-7xl mx-auto">
        <Outlet />
      </main>
    </>
  );
}
