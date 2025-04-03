import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';


interface MainLayoutInterface{
  signOutApp: ()=> void
}

const MainLayout: React.FC<MainLayoutInterface> = ({ signOutApp }) => {
  return (
    <div className="flex min-h-screen bg-gray-100 w-screen">
      <Sidebar 
         signOutApp={signOutApp}
      />
      <main className="flex-1 p-6 w-full ml-[270px]">
        <div className="w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;