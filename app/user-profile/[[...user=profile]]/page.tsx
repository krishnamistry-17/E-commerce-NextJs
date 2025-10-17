"use client";

import { RootState } from "@/app/store/store";
import mixpanelInstance from "@/lib/mixPanel";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    mixpanelInstance.init();
    mixpanelInstance.identify(user?._id || "");
  }, [mixpanelInstance]);

  return (
    <div className="p-4 text-md space-y-4">
      <h1>User Profile</h1>
      <p>Email:{user?.email}</p>
    </div>
  );
};

export default UserProfile;
