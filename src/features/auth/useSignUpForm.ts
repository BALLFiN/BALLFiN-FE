import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../api/auth/signUpApi";

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
}

interface ToastState {
  show: boolean;
  message: string;
  type: "success" | "error";
}

export const useSignUpForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });
  const [toast, setToast] = useState<ToastState>({
    show: false,
    message: "",
    type: "success",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setToast({
        show: true,
        message: "비밀번호가 일치하지 않습니다.",
        type: "error",
      });
      return;
    }

    try {
      await register({
        email: formData.email,
        password: formData.password,
        name: formData.name,
      });

      setToast({
        show: true,
        message: "회원가입이 완료되었습니다.",
        type: "success",
      });

      // 회원가입 성공 후 로그인 페이지로 이동
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setToast({
        show: true,
        message: "회원가입에 실패했습니다.",
        type: "error",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const closeToast = () => {
    setToast((prev) => ({ ...prev, show: false }));
  };

  const navigateToLogin = () => {
    navigate("/login");
  };

  return {
    formData,
    showPassword,
    showConfirmPassword,
    toast,
    handleSubmit,
    handleChange,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    closeToast,
    navigateToLogin,
  };
};
