"use client";
import { signOut } from "@/actions/auth";
import React, { useState } from "react";

const Logout = () => {
  const [loading, setLoading] = useState(false);

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await signOut();
    setLoading(false);
  };

  return (
    <div>
      <button
        onClick={handleLogout}
        type="submit"
        className="px-4 py-1 rounded border border-black "
      >
        SignOut
      </button>
    </div>
  );
};

export default Logout;
