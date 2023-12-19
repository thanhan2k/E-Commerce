import React, { memo } from "react";
import icons from "ultils/icons";

const { MdEmail } = icons;
const Footer = () => {
  return (
    <div className="w-full ">
      <div className="h-[103px] w-full bg-main flex items-center justify-center">
        <div className="w-main flex items-center justify-between">
          <div className="flex flex-col flex-1">
            <span className="text-[20px] text-gray-100">SIGN UP TO NEWSLETTER</span>
            <small className="text-[13px] #f5dfff">
              Subscribe now and receive weekly newsletter!
            </small>
          </div>
          <div className="flex-1 flex items-center">
            <input
              className="p-4 pr-0 rounded-l-full w-full bg-[#f5dfff] outline-none #00000 placeholder:text-sm placeholder:#00000 placeholder:italic placeholder:opacity-70"
              type="text"
              placeholder="Enter your email address"
            />
            <div className="h-[56px] w-[56px] bg-[#f5dfff] rounded-r-full flex items-center justify-center #00000">
              <MdEmail size={18} />
            </div>
          </div>
        </div>
      </div>
      <div className="h-[407px] w-full bg-gray-900 flex items-center justify-center text-white text-[13px]">
        <div className="w-main flex">
          <div className="flex-2 flex flex-col gap-2">
            <h3 className="mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]">
              ABOUT US
            </h3>
            <span>
              <span>Address: </span>
              <span className="opacity-70">Linh Trung, Thu Duc, TP.HCM</span>
            </span>
            <span>
              <span>Phone: </span>
              <span className="opacity-70">1900 1999</span>
            </span>
            <span>
              <span>Mail: </span>
              <span className="opacity-70">yasparis@gmail.com</span>
            </span>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <h3 className="mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]">
              INFORMATION
            </h3>
            <span>Typography</span>
            <span>Gallery</span>
            <span>Store Location</span>
            <span>Today's Deals</span>
            <span>Contacts</span>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <h3 className="mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]">
              WHO WE ARE
            </h3>
            <span>Help</span>
            <span>Free Shipping</span>
            <span>FAQs</span>
            <span>Return & Exchange</span>
            <span>Testimonials</span>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <h3 className="mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]">
              #DIGITALWORLDSTORE
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Footer);
