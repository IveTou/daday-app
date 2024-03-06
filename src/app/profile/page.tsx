'use client';

import { useEffect, useState } from "react";
import { getUser } from "./actions";

//import { useUser } from '@auth0/nextjs-auth0/client';

type ProfileData = {
  id: string
  name: string
  email: string
  address: string | null
  phone: string | null
  role: string
}

export default function ProfileClient() {
  const [user, setUser] = useState<ProfileData>()
  const [error, setError] = useState<string>('')
  //const { user, error, isLoading } = useUser();

  useEffect(() => {
    const getData = async () => {
      const { data, error, errorMessage } = await getUser()

      if(error) {
        setError(errorMessage)
      }

      if(data) setUser(data)
    }

    getData()
  }, [])


  if (error) return <div>{error}</div>;

  return (
    user && (
      <div>
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
}
