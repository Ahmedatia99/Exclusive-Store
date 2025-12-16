import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import RegistrationInput from "./RegistrationInput";
import { useAuth } from "@/hooks/useAuth";
import { signupService } from "@/services/authService";

const SignUpForm = () => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const payload = {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
      };
      const data = await signupService(payload);
      login(data.data.user);
      navigate("/");
    } catch (err: any) {
      setError("Signup failed");
    }
  };

  return (
    <section className="lg:w-[80%] sm:w-[60%] w-[100%] mx-auto p-6">
      <h1 className="text-3xl md:text-4xl font-bold">{t("createAccount")}</h1>
      <p className="text-gray-500 font-semibold mt-5 mb-6">
        {t("enterDetailsBelow")}
      </p>

      <form onSubmit={handleSubmit} className="space-y-7">
        <RegistrationInput
          type="text"
          name="fullName"
          label="yourName"
          placeholder={t("Enter your name")}
          value={formData.fullName}
          onChange={handleChange}
        />

        <RegistrationInput
          type="text"
          name="email"
          label="email"
          placeholder={t("Enter your email")}
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

        <Button type="submit" className="w-full mb-5">
          {t("createAccount")}
        </Button>
      </form>

      <Button className="w-full mb-5">
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google logo"
          className="w-5 h-5 mr-3"
        />
        <span>{t("signUpWithGoogle")}</span>
      </Button>

      <p className="text-center text-gray-600 mt-6">
        {t("alreadyhaveaccount?")}{" "}
        <Link to="/login" className="text-black font-medium underline">
          {t("login")}
        </Link>
      </p>

      {error && (
        <p className="text-white mb-3 text-xl text-center w-full bg-red-500 py-5 rounded-lg">
          {error}
        </p>
      )}
    </section>
  );
};

export default SignUpForm;
