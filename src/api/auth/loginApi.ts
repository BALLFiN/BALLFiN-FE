interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  name: string;
}

interface VerifyResponse {
  message: string;
}

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("이메일 또는 비밀번호가 올바르지 않습니다.");
      }
      if (response.status === 422) {
        throw new Error("입력값이 올바르지 않습니다.");
      }
      throw new Error("로그인에 실패했습니다.");
    }

    return response.json();
  } catch (error) {
    console.error("로그인 에러:", error);
    throw error;
  }
};

export const verifyAuth = async (): Promise<VerifyResponse> => {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) {
      throw new Error("로그인이 필요합니다.");
    }

    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/check`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user_name");
        throw new Error("로그인이 만료되었습니다. 다시 로그인해주세요.");
      }
      throw new Error("인증 확인에 실패했습니다.");
    }

    return response.json();
  } catch (error) {
    console.error("인증 확인 에러:", error);
    throw error;
  }
};
