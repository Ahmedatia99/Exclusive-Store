import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import RegistrationInput from "./RegistrationInput";
import { loginService } from "@/services/authService";
import { useAuth } from "@/hooks/useAuth";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

const LoginForm: React.FC = () => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await loginService(formData);

      const userObj = data?.data?.user ?? data?.data ?? data;
      login(userObj);
      window.dispatchEvent(
          new CustomEvent("valaha:identify", {
            detail: {
              businessCustomerId: userObj.businessCustomerId,
              name: userObj.fullName,
              email: userObj.email,
            },
          })
        );
      toast.success("login successful", {
        style: {
          background: "#10b981",
          color: "#fff",
          border: "1px solid #10b981",
        },
      });
      navigate("/");
    } catch {
      toast.error("login failed", {
        style: {
          background: "#dc2626",
          color: "#fff",
          border: "1px solid #dc2626",
        },
      });
    }
  };

  return (
    <section className="lg:w-[60%] sm:w-[60%] w-[100%] mx-auto p-6">
      <Toaster position="bottom-right" />
      <h1 className="sm:text-4xl text-3xl font-bold">
        {t("loginToExclusive")}
      </h1>
      <p className="text-gray-600 mt-5 mb-6">{t("enterDetailsBelow")}</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <RegistrationInput
          type="text"
          name="email"
          label="email"
          placeholder={t("Enter your email or phone")}
          value={formData.email}
          onChange={handleChange}
        />

        <RegistrationInput
          type="password"
          name="password"
          label="password"
          placeholder={t("Enter your Password")}
          value={formData.password}
          onChange={handleChange}
        />

        <Button type="submit" className="w-full mb-3">
          {t("login")}
        </Button>

        <Link to="/forgot-password" className="text-[#DB4444] font-medium mt-5">
          {t("forgetPassword")}
        </Link>
      </form>
    </section>
  );
};

export default LoginForm;
