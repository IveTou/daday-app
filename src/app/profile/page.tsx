'use client';

import { useEffect } from "react";
import Link from "next/link"
import { useDispatch, useSelector } from "@/lib/redux/store"
import { setProfile } from "@/lib/redux/slices/profileSlice"

export default function ProfileClient() {
  const dispatch = useDispatch()
  const { profile } = useSelector((state) => state.profile)

  useEffect(() => {
    dispatch(setProfile())
  }, [])

  if(!profile.id) {
    return (
      <>
        <h2>User not found</h2>
        <Link href='/profile/create'>Create yours!</Link>
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
