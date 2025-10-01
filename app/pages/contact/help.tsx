import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const Help = () => {
  // Load Google Maps API
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const questions = {
    que1: "01. Visit Feedback",
    que2: "02. Employer Services",
    que3: "03. Billing Inquiries",
    que4: "04. General Inquiries",
  };

  const answer =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.";

  return (
    <div>
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-3">
   
        <div>
          <p className="text-[24px] font-quick-bold-700 text-shopbtn">
            How can help you ?
          </p>
          <p className="xl:text-[48px] text-[32px] font-quick-bold-700 text-regalblue pt-[18px]">
            Let us know how we can help you
          </p>
          <p className="text-[16px] font-lato-regular-400 text-bgbrown pt-[18px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
          </p>
          <p className="text-[16px] font-lato-regular-400 text-bgbrown pt-[18px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
          </p>
        </div>

       
        <div className="xl:pt-[90px] lg:pt-[30px]">
          <div className="flex flex-col">
            <div className="pt-[24px]">
              <p className="text-[20px] font-quick-bold-700 text-regalblue">
                {questions.que1}
              </p>
              <p className="text-[16px] font-lato-regular-400 text-bgbrown pt-[20px]">
                {answer}
              </p>
            </div>
            <div className="pt-[24px]">
              <p className="text-[20px] font-quick-bold-700 text-regalblue">
                {questions.que3}
              </p>
              <p className="text-[16px] font-lato-regular-400 text-bgbrown pt-[20px]">
                {answer}
              </p>
            </div>
          </div>
        </div>

        <div className="xl:pt-[90px] lg:pt-[30px]">
          <div className="flex flex-col">
            <div className="pt-[24px]">
              <p className="text-[20px] font-quick-bold-700 text-regalblue">
                {questions.que2}
              </p>
              <p className="text-[16px] font-lato-regular-400 text-bgbrown pt-[20px]">
                {answer}
              </p>
            </div>
            <div className="pt-[24px]">
              <p className="text-[20px] font-quick-bold-700 text-regalblue">
                {questions.que4}
              </p>
              <p className="text-[16px] font-lato-regular-400 text-bgbrown pt-[20px]">
                {answer}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Google Map */}
      <div className="mt-[40px]">
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "400px" }}
            center={{ lat: 20.593683, lng: 78.962883 }} // Static center (India)
            zoom={5}
          >
            <Marker position={{ lat: 20.593683, lng: 78.962883 }} />
          </GoogleMap>
        ) : (
          <p>Loading Map...</p>
        )}
      </div>
    </div>
  );
};

export default Help;
