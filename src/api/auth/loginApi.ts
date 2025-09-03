interface LoginRequest {
  email: string;
  password: string;
}

interface User {
  _id: string;
  email: string;
  name: string;
  favorites: string[];
  created_at: string;
  last_login_at: string;
}

interface LoginResponse {
  access_token: string;
  user?: User;
}

interface ValidationError {
  loc: [string, number];
  msg: string;
  type: string;
}

interface ErrorResponse {
  detail: ValidationError[];
}

export const login = async (
  data: LoginRequest
): Promise<{ token: string; user?: User }> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      let errorMessage = "로그인에 실패했습니다.";
      try {
        const errorData = await response.json();
        if (errorData.detail) {
          errorMessage = errorData.detail;
        }
      } catch (e) {
        // 에러 응답 파싱 실패 시 기본 메시지 사용
      }

      if (response.status === 422) {
        const errorData: ErrorResponse = await response.json();
        throw new Error(
          errorData.detail[0]?.msg || "입력값이 올바르지 않습니다."
        );
      }

      throw new Error(errorMessage);
    }

    const responseData: LoginResponse = await response.json();
    const token = responseData.access_token.startsWith("Bearer ")
      ? responseData.access_token
      : `Bearer ${responseData.access_token}`;

    return {
      token,
      user: responseData.user,
    };
  } catch (error) {
    throw error;
  }
};

export const verifyAuth = async (): Promise<{
  message: string;
  user?: User;
}> => {
  try {
    let token = localStorage.getItem("access_token");
    if (!token) {
      throw new Error("로그인이 필요합니다.");
    }
    // Bearer 접두사 보장
    if (!token.startsWith("Bearer ")) {
      token = `Bearer ${token}`;
    }

    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/auth/check`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
      }
    );

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem("access_token");
        throw new Error("로그인이 만료되었습니다. 다시 로그인해주세요.");
      }
      throw new Error("인증 확인에 실패했습니다.");
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};
