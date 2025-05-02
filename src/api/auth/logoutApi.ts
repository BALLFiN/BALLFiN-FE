interface LogoutResponse {
  message: string;
}

export const logout = async (): Promise<void> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/auth/logout`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("access_token") || "",
        },
      }
    );

    if (!response.ok) {
      throw new Error("로그아웃에 실패했습니다.");
    }

    const data: LogoutResponse = await response.json();
    localStorage.removeItem("access_token");
  } catch (error) {
    throw error;
  }
};
