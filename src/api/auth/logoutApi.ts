interface LogoutResponse {
  message: string;
}

export const logout = async (): Promise<LogoutResponse> => {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) {
      throw new Error("로그인 상태가 아닙니다.");
    }

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/auth/logout`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "로그아웃에 실패했습니다.");
    }

    const data: LogoutResponse = await response.json();
    localStorage.removeItem("access_token");
    return data;
  } catch (error) {
    console.error("로그아웃 에러:", error);
    throw error;
  }
};
