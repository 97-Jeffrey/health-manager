import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const MainLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100 w-screen">
      <Sidebar />
      <main className="flex-1 p-6 w-full">
        <div className="w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;