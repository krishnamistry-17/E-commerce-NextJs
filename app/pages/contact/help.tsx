import axiosInstance from "@/lib/axios";
import { Contact } from "@/types/product";
import React, { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";





const Help = () => {
  const [product, setProduct] = useState<Contact[]>([]);

  // Load Google Maps API
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get<Contact[]>("/contact");
        setProduct(res?.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-3">
        <div>
          {product?.map((item, index) => (
            <div key={index}>
              <p className="text-[24px] font-quick-bold-700 text-shopbtn">
                {item?.head}
              </p>
              <p className="xl:text-[48px] text-[32px] font-quick-bold-700 text-regalblue pt-[18px]">
                {item?.title}
              </p>
              <p className="text-[16px] font-lato-regular-400 text-bgbrown pt-[18px]">
                {item?.para1}
              </p>
              <p className="text-[16px] font-lato-regular-400 text-bgbrown pt-[18px]">
                {item?.para1}
              </p>
            </div>
          ))}
        </div>

        <div className="xl:pt-[90px] lg:pt-[30px]">
          {product?.map((item, index) => (
            <div className="flex flex-col " key={index}>
              {[item?.questions?.que1, item?.questions?.que3].map((src, i) => (
                <div key={i} className="pt-[24px]">
                  <p className="text-[20px] font-quick-bold-700 text-regalblue">
                    {src}
                  </p>
                  <p className="text-[16px] font-lato-regular-400 text-bgbrown pt-[20px]">
                    {item?.answers?.ans}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="xl:pt-[90px] lg:pt-[30px]">
          {product?.map((item, index) => (
            <div className="flex flex-col " key={index}>
              {[item?.questions?.que2, item?.questions?.que4].map((src, i) => (
                <div key={i} className="pt-[24px]">
                  <p className="text-[20px] font-quick-bold-700 text-regalblue">
                    {src}
                  </p>
                  <p className="text-[16px] font-lato-regular-400 text-bgbrown pt-[20px]">
                    {item?.answers?.ans}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-[40px]">
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "400px" }}
            center={
              product[0]?.lat && product[0]?.lng
                ? { lat: product[0].lat, lng: product[0].lng }
                : { lat: 20.593683, lng: 78.962883 }
            }
            zoom={5}
          >
            {product[0]?.lat && product[0]?.lng && (
              <Marker position={{ lat: product[0].lat, lng: product[0].lng }} />
            )}
          </GoogleMap>
        ) : (
          <p>Loading Map...</p>
        )}
      </div>
    </div>
  );
};

export default Help;
