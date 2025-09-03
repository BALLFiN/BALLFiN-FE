interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

interface RegisterResponse {
  message: string;
  // 필요한 경우 응답 타입 추가
}

export const register = async (
  data: RegisterRequest
): Promise<RegisterResponse> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "회원가입에 실패했습니다.");
    }

    return response.json();
  } catch (error) {
    console.error("회원가입 에러:", error);
    throw error;
  }
};
