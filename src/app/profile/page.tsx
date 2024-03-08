'use client';

import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "@/lib/redux/store";
import { getProfile } from "@/lib/redux/slices/profileSlice";
import isEmpty from "@/helpers/isEmpty";
import Link from "next/link";

export default function ProfileClient() {
  const dispatch = useDispatch()
  const { profile } = useSelector((state) => state.profile)

  useEffect(() => {
    dispatch(getProfile())
  }, [])

  const isProfileEmpty = useMemo(() =>  isEmpty(profile, ['name', 'email']), [profile])

  if(isProfileEmpty) {
    return (
      <>
        <h2>User not found</h2>
        <Link href='/create'>Create yours!</Link>
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
