'use client';

import { useEffect } from "react";
import { useDispatch, useSelector } from "@/lib/redux/store";
import { getProfile } from "@/lib/redux/slices/profileSlice";

export default function ProfileClient() {
  const dispatch = useDispatch()
  const { profile } = useSelector((state) => state.profile)

  useEffect(() => {
    dispatch(getProfile())
  }, [])

  return (
      <div>
        <h2>{profile.name}</h2>
        <p>{profile.email}</p>
      </div>
  )
}
