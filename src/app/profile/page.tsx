'use client';

import { useEffect } from "react";
import { useDispatch, useSelector } from "@/shared/lib/redux/store"
import { setProfile } from "@/shared/lib/redux/slices/profileSlice"
import CreateProfile from "@/components/Forms/CreateProfile";
import { createProfile } from "./actions";
import Modal from "@/components/Modal";
import { useModal } from "@refinedev/core";

export default function Profile() {
  const dispatch = useDispatch()
  const { profile } = useSelector((state) => state.profile)
  const { show, close, visible } = useModal()

  useEffect(() => {
    dispatch(setProfile())
  }, [])

  if(!profile) {
    return (
      <>
        <h2>User not found</h2>
        <button onClick={show}>open</button>
        <Modal visible={visible} close={close}>
          <CreateProfile action={createProfile} />
        </Modal>
      </>
    )
  }

  return (
    <div>
      <h2>{profile.name}</h2>
      <p>{profile.email}</p>
    </div>
  )
}
