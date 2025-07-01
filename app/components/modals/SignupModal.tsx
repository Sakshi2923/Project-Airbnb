'use client';
import Modal from "./Modal";
import { useState } from "react";
import useSignupModal from "@/app/hooks/useSignupModal";
import CustomButton from "../forms/CustomButton";
import { authService } from "@/app/services/authService";

const SignupModal = () => {
  const signupModal = useSignupModal();

  // State for form fields and error
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState('');

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== repeatPassword) {
      setError('Passwords do not match');
      return;
    }
    // You can add more fields as needed (e.g., name, is_landlord)
    const success = await authService.register({ name: email, email, password, is_landlord: false });
    if (success) {
      signupModal.close();
      // Optionally, show a success message or log the user in automatically
    } else {
      setError('Registration failed. Please try again.');
    }
  };

  const content = (
    <>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          placeholder="your e-mail address"
          type="email"
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
        <input
          placeholder="Repeat password"
          type="password"
          className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
          value={repeatPassword}
          onChange={e => setRepeatPassword(e.target.value)}
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
      isOpen={signupModal.isOpen}
      close={signupModal.close}
      label="Sign up"
      content={content}
    />
  );
};

export default SignupModal;