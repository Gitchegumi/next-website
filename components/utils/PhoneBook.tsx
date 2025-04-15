"use client";

import React, { useState } from "react";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import contacts from "@/public/content/contact/contacts.json";

interface Portfolio {
  name: string;
  email: string;
}

interface Department {
  department: string;
  contacts: string[];
  portfolios?: Portfolio[]; // Add this line to include portfolios
}

const PhoneBook: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleDropdown = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const mailIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#1c1b1f"
    >
      <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" />
    </svg>
  );

  return (
    <div className="w-full mx-auto">
      {contacts.map((department: Department, index: number) => (
        <div key={index}>
          <div
            className="flex justify-between items-center bg-gray-100 p-4 cursor-pointer"
            onClick={() => toggleDropdown(index)}
          >
            <span>{department.department}</span>
            {openIndex === index ? (
              <ExpandLessOutlinedIcon className="h-5 w-5" />
            ) : (
              <ExpandMoreOutlinedIcon className="h-5 w-5" />
            )}
          </div>
          {openIndex === index && (
            <div className="bg-white p-4">
              {department.contacts &&
                department.contacts.map((contact, contactIndex) => (
                  <div
                    key={contactIndex}
                    className="mb-2 flex items-center space-x-2"
                  >
                    {mailIcon}
                    <a
                      href={`mailto:${contact}`}
                      className="text-[#FF521C] hover:text-brand-yellow"
                    >
                      {contact}
                    </a>
                  </div>
                ))}
              {department.portfolios && department.portfolios.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {department.portfolios.map((portfolio, portfolioIndex) => (
                    <div key={portfolioIndex} className="mb-2">
                      <strong>{portfolio.name}</strong>
                      <div className="flex items-center space-x-2">
                        {mailIcon}
                        <a
                          href={`mailto:${portfolio.email}`}
                          className="text-[#FF521C] hover:text-brand-yellow"
                        >
                          {portfolio.email}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PhoneBook;
