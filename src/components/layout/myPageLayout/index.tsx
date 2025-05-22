import { Outlet } from 'react-router-dom';
import MyPageSidebar from './sideBar';

export default function MyPageLayout() {
  return (
    <div className="min-h-screen">
      <MyPageSidebar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
