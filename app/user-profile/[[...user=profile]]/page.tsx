"use client";

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/app/store/store";
import { useSession } from "next-auth/react";

const UserProfile = () => {
  //update is for editing profile
  const { data: session, update } = useSession();
  const router = useRouter();
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     router.push("/signin");
  //   }
  // }, [isAuthenticated, router]);

  // if (!user) return null;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      {isAuthenticated ? (
        <>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </>
      ) : (
        <>
          <p>
            <strong>Name:</strong> {session?.user?.name}
          </p>
          <p>
            <strong>Email:</strong> {session?.user?.email}
          </p>
        </>
      )}

      {/* <h2>Edit Profile</h2>

      <button onClick={() => update({ name: "Krishna" })}>Edit Name</button>
      <button onClick={() => update()}>Edit</button> */}
    </div>
  );
};

export default UserProfile;
