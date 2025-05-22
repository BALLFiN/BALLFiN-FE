import { User } from 'lucide-react';

export default function MyPageSidebar() {
  return (
    <div className="bg-white shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
            <User size={32} className="text-gray-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">홍길동</h1>
            <p className="text-gray-600">hong@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
