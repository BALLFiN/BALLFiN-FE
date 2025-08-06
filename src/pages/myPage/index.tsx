import ProfileCard from '@/components/auth/myPage/main/ProfileCard';

export default function MyPage() {
  return (
    <div className="grid grid-cols-1 gap-4">
      <ProfileCard /> {/* 전체 너비 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* <FavoriteCharts />
        <FavoriteNews /> */}
      </div>
    </div>
  );
}
