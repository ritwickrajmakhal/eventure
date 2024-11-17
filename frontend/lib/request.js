"use server";

const request = async (endPoint, options = {}) => {
  const {
    method = "GET", // Default to GET if not provided
    headers = {},
    body = null,
  } = options;

  // Default headers only for JSON requests
  const defaultHeaders =
    body instanceof FormData
      ? {}
      : {
          "Content-Type": "application/json",
        };

  try {
    const response = await fetch(`${process.env.API_URL}${endPoint}`, {
      method,
      headers: { ...defaultHeaders, ...headers },
      body:
        body instanceof FormData ? body : body ? JSON.stringify(body) : null,
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result?.error?.message ||
          `Request failed with status ${response.status}`
      );
    }

    return { data: result.data, status: response.status, result };
  } catch (error) {
    return {
      error: {
        message: error.message,
        status: error.status || "unknown",
      },
    };
  }
};

export default request;
