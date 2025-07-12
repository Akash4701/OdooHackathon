interface FormData {
  name?: string;
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export const authHandler = async (
  type: "register" | "login",
  formData: FormData
): Promise<AuthResponse> => {
  // Basic validation
  if (!formData.email || !formData.password) {
    throw new Error("Email and password are required.");
  }
  if (type === "register" && !formData.name) {
    throw new Error("Name is required for registration.");
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    throw new Error("Invalid email format.");
  }
  if (formData.password.length < 6) {
    throw new Error("Password must be at least 6 characters.");
  }

  const url = `http://localhost:4000/api/v1/auth/${type}`;
  const payload =
    type === "register"
      ? { name: formData.name, email: formData.email, password: formData.password }
      : { email: formData.email, password: formData.password };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to authenticate");
    }

    const data: AuthResponse = await res.json();
    console.log(`${type} successful:`, data);

    return data;
  } catch (err: any) {
    console.error(`${type} failed:`, err.message);
    throw err;
  }
};
