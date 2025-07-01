'use client';
import Modal from "./Modal";
import { useState } from "react";
import useLoginModal from "@/app/hooks/useLoginModal";
import CustomButton from "../forms/CustomButton";
import { authService } from "@/app/services/authService";

const LoginModal = () => {
  const LoginModal = useLoginModal();

  // State for form fields and error
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = await authService.login({ email, password });
    if (success) {
      LoginModal.close();
      // Optionally, refresh the page or update UI here
    } else {
      setError('Invalid email or password');
    }
  };

  const content = (
    <>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          placeholder="your e-mail address or username"
          type="text"
          className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          placeholder="your password"
          type="password"
          className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        {error && (
          <div className="p-5 bg-rose-500 text-white rounded-xl opacity-80">
            {error}
          </div>
        )}

        <CustomButton
          label="Submit"
          type="submit"
        />
      </form>
    </>
  );

  return (
    <Modal
      isOpen={LoginModal.isOpen}
      close={LoginModal.close}
      label="Log in"
      content={content}
    />
  );
};

export default LoginModal;