export default function ProfilePage() {
  return (
    <div className="w-full  h-screen flex flex-col items-center py-8 ">
      <div className="w-4xl h-64  border border-gray-300  rounded-2xl shadow-md bg-white ">
        <div className="py-6 px-8 h-full w-full flex-col  flex ">
          <div className="flex justify-start h-16">
            <div></div>
            <p>프로필카드</p>
            {/* h1 사이즈 추가해야될듯 안먹네 */}
          </div>
          <div className="flex  flex-col justify-around h-full w-full">
            <div className="flex justify-between">
              <div className="w-28 text-center">
                <h3>닉네임</h3>
              </div>
              <div> 홍길동</div>
            </div>
            <div className="flex justify-between">
              <div className="w-28 text-center">
                <h3>이메일</h3>
              </div>
              <div> hong@exapmle.com</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
