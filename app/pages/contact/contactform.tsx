import React from "react";
import address from "../../../public/svgs/whitelocation.svg";
import contact from "../../../public/images/contact.png";
import Image from "next/image";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";

const validationSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone is required"),
  subject: Yup.string().required("Subject is required"),
});

const initialValues = {
  firstName: "",
  email: "",
  phone: "",
  subject: "",
};

const ContactForm = () => {
  const heads = ["Office", "Studio", "Shop"];
  const addressText =
    "205 North Michigan Avenue, Suite 810 Chicago, 60601, USA Phone: (123) 456-7890 Email: contact@Evara.com";
  const buttonText = "view map";

  const handleSubmit = (
    values: typeof initialValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    toast.success("Message sent successfully!");
    console.log("Form submitted with values:", values);
    resetForm();
  };

  return (
    <div>
      <div className="grid md:grid-cols-3 grid-cols-1">
        {heads.map((head, index) => (
          <div className="flex flex-col text-start justify-start" key={index}>
            <p className="text-[24px] font-quick-bold-700 text-shopbtn md:pt-0 pt-3 ">
              {head}
            </p>
            <p className="text-[14px] font-lato-regular-400 text-bgbrown pt-[18px]">
              {addressText}
            </p>
            <div className="pt-[24px]">
              <button
                className="text-white text-[12px] font-quick-bold-700 
                flex items-center gap-[5px] bg-shopbtn rounded-[4px] py-[12px] px-[10px]"
              >
                <Image src={address} alt="address" width={20} height={20} />
                {buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="lg:flex gap-[62px] pt-[60px]">
        <div className="flex-1">
          <p className="text-[20px] font-quick-bold-700 text-shopbtn">
            Contact form
          </p>
          <p className="md:text-[40px] text-[32px] font-quick-bold-700 text-regalblue py-[10px]">
            Drop Us a Line
          </p>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form>
                <div className="md:flex gap-[24px] max-w-[894px]">
                  <div className="w-full space-y-1">
                    <label
                      htmlFor="firstName"
                      className="block text-regalblue text-[16px] font-quick-semibold-600"
                    >
                      First Name<span className="text-red-600">*</span>
                    </label>

                    <Field
                      name="firstName"
                      type="text"
                      placeholder="First Name"
                      className="md:py-[22px] py-[18px] pl-[21px] w-full focus:outline-none border border-bordercolor rounded-[10px]"
                    />
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="text-red-500 pt-1 text-[12px]"
                    />
                  </div>

                  <div className="w-full space-y-1 md:mt-0 mt-[20px]">
                    <label
                      htmlFor="email"
                      className="block text-regalblue text-[16px] font-quick-semibold-600"
                    >
                      Email<span className="text-red-600">*</span>
                    </label>

                    <Field
                      name="email"
                      type="email"
                      placeholder="Your Email"
                      className="md:py-[22px] py-[18px] pl-[21px] w-full focus:outline-none border border-bordercolor rounded-[10px]"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 pt-1 text-[12px]"
                    />
                  </div>
                </div>

                <div className="md:flex gap-[24px] max-w-[894px] pt-[20px]">
                  <div className="w-full space-y-1">
                    <label
                      htmlFor="phone"
                      className="block text-regalblue text-[16px] font-quick-semibold-600"
                    >
                      Phone<span className="text-red-600">*</span>
                    </label>
                    <Field
                      name="phone"
                      type="tel"
                      placeholder="Your Phone"
                      className="md:py-[22px] py-[18px] pl-[21px] w-full focus:outline-none border border-bordercolor rounded-[10px]"
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="text-red-500 pt-1 text-[12px]"
                    />
                  </div>
                  <div className="w-full space-y-1 md:mt-0 mt-[20px]">
                    <label
                      htmlFor="subject"
                      className="block text-regalblue text-[16px] font-quick-semibold-600"
                    >
                      Subject<span className="text-red-600">*</span>
                    </label>
                    <Field
                      name="subject"
                      type="text"
                      placeholder="Subject"
                      className="md:py-[22px] py-[18px] pl-[21px] w-full focus:outline-none border border-bordercolor rounded-[10px]"
                    />
                    <ErrorMessage
                      name="subject"
                      component="div"
                      className="text-red-500 pt-1 text-[12px]"
                    />
                  </div>
                </div>

                <div className="pt-[20px]">
                  <Field
                    name="message"
                    as="textarea"
                    placeholder="Enter Query"
                    className="focus:outline-none w-full h-[100px] p-[21px] border border-bordercolor rounded-[10px]"
                  />
                </div>

                <div className="pt-[37px]">
                  <button
                    type="submit"
                    className="text-[17px] font-quick-medium-500 text-white bg-regalblue
                lg:px-[39px] lg:py-[21px] px-[20px] py-[12px] rounded-[10px]"
                  >
                    Send message
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        <div>
          <Image
            src={contact}
            alt="image"
            width={20}
            height={20}
            unoptimized
            className="w-full object-cover rounded-[15px] lg:block hidden"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
