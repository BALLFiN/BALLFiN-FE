import { Outlet } from 'react-router-dom';
import MyPageSidebar from './sideBar';

export default function MyPageLayout() {
  return (
    <div className="min-h-screen flex ">
      <MyPageSidebar />
      <main className=" w-full bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
}
