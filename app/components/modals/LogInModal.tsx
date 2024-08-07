'use client';

import { signIn } from "next-auth/react";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import {
  FieldValues,
  SubmitHandler,
  useForm
} from "react-hook-form";
import { useRegisterModal } from "@/app/hooks/useRegisterModal";
import { useLogInModal } from "@/app/hooks/useLogInModal";
import { Modal } from "./Modal";
import { Heading } from "../Heading";
import { Input } from "../input/Input";
import toast from "react-hot-toast";
import { Button } from "../Button";
import { useRouter } from "next/navigation";

export const LogInModal = () => {
  const router = useRouter()
  const registerModal = useRegisterModal()
  const logInModal = useLogInModal()
  const [isLoading, setIsLoading] = useState(false)

  // Form Control 內容
  const {
    register,
    handleSubmit,
    formState: {
      errors,
    }
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)

    signIn('credentials', {
      ...data,
      redirect: false
    })
    .then((callback) => {
      setIsLoading(false)

      if (callback?.ok) {
        toast.success('Login Success!!')
        router.refresh()
        logInModal.onClose()
      }

      if (callback?.error) {
        toast.error(callback.error)
      }
    })
  }

  const bodyContent = (
    <div
      className="flex flex-col gap-4"
    >
      <Heading
        title="Welcome back"
        subtitle="Login to your account!"
        center
      />
      <Input
        id="email"
        label="Email"
        type="email"
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        register={register}
        errors={errors}
        required
      />
    </div>
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex flex-row items-center justify-center gap-2">
          <div>
            Already have an account?
          </div>
          <div
            onClick={logInModal.onClose}
            className="
              text-neutral-800
              cursor-pointer
              hover:underline
            "
          >
            Log in
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={logInModal.isOpen}
      title="LogIn"
      actionLabel="SUBMIT"
      onClose={logInModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}