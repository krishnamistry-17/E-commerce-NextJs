//app/component/signupbutton.tsx
"use client";

export default function SignupButton({
  isSubmitting,
}: {
  isSubmitting: boolean;
}) {
  return (
    <button
      type="submit"
      className="w-full bg-shopbtn text-white py-2 rounded text-[16px] font-quick-bold-700 hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={isSubmitting}
    >
      {isSubmitting ? "Signing Up..." : "Sign Up"}
    </button>
  );
}
