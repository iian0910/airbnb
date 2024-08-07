'use client'

import { AiOutlineMenu } from "react-icons/ai"
import { Avatar } from "../Avatar"
import { useState } from "react"
import { MenuItem } from "./MenuItem"
import { useRegisterModal } from "@/app/hooks/useRegisterModal"
import { useLogInModal } from "@/app/hooks/useLogInModal"
import { signOut } from "next-auth/react"

import { SafeUser } from "@/app/types"

interface UserMenuProps {
  currentUser?: SafeUser | null
}

export const UserMenu: React.FC<UserMenuProps> = ({currentUser}) => {
  const registerModal = useRegisterModal()
  const logInModal = useLogInModal()
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="relative">
      <div className="
        flex
        flex-row
        items-center
        gap-3
      ">
        <div
          onClick={() => {}}
          className="
            hidden
            md:block
            text-sm
            font-semibold
            py-3
            px-4
            rounded-full
            hover:bg-neutral-100
            transition
            cursor-pointer
          "
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className="
            p-4
            md:py-1
            md:px-2
            border-[1px]
            border-neutral-200
            flex
            flex-row
            items-center
            gap-3
            rounded-full
            cursor-pointer
            hover:shadow-md
            transition
          "
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image}/>
          </div>
        </div>
      </div>
      {/* 側邊攔 */}
      {isOpen && (
        <div
          className="
            absolute
            rounded-1
            shadow-md
            w-[40vw]
            md:w-3/4
            bg-white
            overflow-hidden
            right-0
            top-12
            text-sm
          "
        >
          <div className="flex flex-col cursor-pointer">
            {
              currentUser ? (
                <>
                  <MenuItem
                    onClick={() => {}}
                    label="My trips"
                  />
                  <MenuItem
                    onClick={() => {}}
                    label="My favorites"
                  />
                  <MenuItem
                    onClick={() => {}}
                    label="My reservations"
                  />
                  <MenuItem
                    onClick={() => {}}
                    label="My properties"
                  />
                  <MenuItem
                    onClick={() => {}}
                    label="Airbnb my home"
                  />
                  <hr />
                  <MenuItem
                    onClick={() => signOut()}
                    label="Logout"
                  />
                </>
              ) : (
                <>
                  <MenuItem
                    onClick={logInModal.onOpen}
                    label="Login"
                  />
                  <MenuItem
                    onClick={registerModal.onOpen}
                    label="SignUp"
                  />
                </>
              )
            }
            
          </div>
        </div>
      )}
    </div>
  )
}