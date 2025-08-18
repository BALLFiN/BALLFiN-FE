// 즐겨찾기 목록 조회
export const getFavorites = async (): Promise<string[]> => {
  try {
    const response = await fetch("/user/favorites", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

// 즐겨찾기 추가
export const addFavorite = async (tickerOrCompany: string): Promise<string> => {
  try {
    const response = await fetch("/user/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ticker_or_company: tickerOrCompany,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

// 즐겨찾기 제거
export const removeFavorite = async (
  tickerOrCompany: string
): Promise<string> => {
  try {
    const response = await fetch("/user/favorites", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ticker_or_company: tickerOrCompany,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
