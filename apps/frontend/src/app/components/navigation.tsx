import { Link, Outlet } from '@tanstack/react-router';

function Navigation() {
  return (
    <div className="h-screen flex flex-col">
      <header className="h-16 bg-blue-600 text-white flex items-center px-4 shadow-md">
        <h1 className="text-xl font-semibold">Project Management</h1>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 bg-gray-100 p-4 border-r overflow-y-auto">
          <nav className="space-y-4">
            <Link
              to="/"
              className="[&.active]:font-bold block p-2 rounded-md hover:bg-gray-200"
            >
              Dashboard
            </Link>
            <Link
              to="/projects"
              className="[&.active]:font-bold block p-2 rounded-md hover:bg-gray-200"
            >
              Projects
            </Link>
            <Link
              to="/about"
              className="[&.active]:font-bold block p-2 rounded-md hover:bg-gray-200"
            >
              About
            </Link>
          </nav>
        </aside>
        <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Navigation;
