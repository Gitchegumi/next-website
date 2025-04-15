"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from 'next/navigation';
import axios from "axios";
import { styled, alpha } from "@mui/material/styles";
import Link from "next/link";
import Image from "next/image";
import InputBase from "@mui/material/InputBase";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import SearchIcon from "@mui/icons-material/Search";

interface HeaderProps {
  contents: { [key: string]: any };
}

interface SearchResult {
  url: string;
  title: string;
  snippet: string;
}

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Header: React.FC<HeaderProps> = ({ contents }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const header = contents;
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(max-width: 720px)");
      if (mediaQuery.matches) {
        setOpenDropdown("join");
      }
    }
  }, []);

  const pages = [
    {
      id: "home",
      title: header["home"],
      url: "/",
    },
    {
      id: "who-we-are",
      title: header["who"],
      url: "/who-we-are",
    },
    {
      id: "what-we-do",
      title: header["what"],
      url: "/what-we-do",
    },
    {
      id: "join",
      title: header["join"],
      url: "/join",
      dropdown: [
        {
          id: "ai-technician",
          title: header["tech"],
          url: "/join/ai-technician",
          description:
            "36-month program combining 32-weeks of study at Carnegie Mellon University with a 24 month utilization in AI2C.",
        },
        {
          id: "ai-scholar",
          title: header["scholar"],
          url: "/join/ai-scholar",
          description:
            "Opportunities for officers to earn a Master's degree or Doctorate from Carnegie Mellon University",
        },
      ],
    },
    {
      id: "upskill",
      title: header["upskill"],
      url: "/upskill",
    },
    {
      id: "collaborate",
      title: header["collaborate"],
      url: "/collaborate",
    },
    {
      id: "resources",
      title: header["resources"],
      url: "/resources",
    },
    {
      id: "contact",
      title: header["contact"],
      url: "/contact",
    },
  ];

  const socialLinks = [
    {
      id: "facebook",
      icon: FacebookRoundedIcon,
      url: "https://www.facebook.com/",
    },
    {
      id: "X",
      icon: XIcon,
      url: "https://x.com/USArmyAI",
    },
    {
      id: "linkedin",
      icon: LinkedInIcon,
      url: "https://www.linkedin.com/company/usarmy-ai/",
    },
  ];

  const toggleDropdown = (id: string) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    const searchQuery = searchInputRef.current?.value
    console.log("Search query: ", searchQuery);
    if (searchQuery) {
      router.push(`/search?query=${searchQuery}`);
    }
    try {
      const response = await axios.get(
        `https://api.gsa.gov/technology/searchgov/v2/results/i14y`,
        {
          params: {
            affiliate: "ai2c",
            access_key: process.env.NEXT_PUBLIC_SEARCH_GOV_API_KEY,
            query: searchQuery,
          },
        }
      );
      console.log("Search results: ", response.data);
      setSearchResults(response.data.web.results);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
    searchInputRef.current?.blur();
  };

  return (
    <header className="w-full font-gi fixed top-0 left-0 z-50">
      <div className="bg-[#161515] py-[15px] px-0">
        <div className="max-w-full mx-auto consistent-margin">
          <div className="flex flex-col lg:flex-row lg:items-center justify-start">
            <div className="flex items-center mb-2.5 lg:mb-0 lg:mr-[20px]">
              <Image
                src="/assets/images/afc-logo.png"
                alt="AFC Logo"
                className="filter drop-shadow-[0_4px_4px_#fffefa] mr-2.5"
                width={64}
                height={64}
              />
              <Image
                src="/assets/images/ai2c-logo.png"
                alt="AI2C Logo"
                width={84}
                height={84}
              />
            </div>
            <div className="flex flex-col text-white m-0 text-base">
              <span>{header["title-1"]}</span>
              <span>{header["title-2"]}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#221F20] py-2.5 px-0">
        <div className="max-w-full mx-auto consistent-margin">
          <nav className="flex flex-wrap justify-start items-start lg:flex lg:flex-row lg:items-center">
            <div className="flex lg:hidden">
              <IconButton
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <MenuIcon className="text-[#9ca3af]" />
              </IconButton>
            </div>
            <div
              className={`${
                isMobileMenuOpen ? "block" : "hidden"
              } w-full lg:flex lg:w-auto`}
            >
              <div
                className={`${
                  isMobileMenuOpen ? "block" : "hidden"
                } text-[#9ca3af] mt-8 mb-8 ml-auto w-full md:hidden`}
              >
                <form onSubmit={handleSearch}>
                  <Search>
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                      placeholder="Search…"
                      inputProps={{ "aria-label": "search" }}
                      inputRef={searchInputRef}
                    />
                  </Search>
                </form>
                <div>
                  {searchResults.map((result, index) => (
                    <div key={index}>
                      <a href={result.url}>{result.title}</a>
                      <p>{result.snippet}</p>
                    </div>
                  ))}
                </div>
              </div>
              {pages.map((page) => (
                <div key={page.id} className="relative group">
                  <div className="flex items-center">
                    <Link
                      href={page.url}
                      className="text-white no-underline mr-8 my-[5px] text-[0.9rem] whitespace-nowrap focus:text-brand-yellow hover:text-brand-yellow"
                      onClick={closeMobileMenu}
                    >
                      {page.title}
                    </Link>
                    {page.dropdown && (
                      <div className="lg:hidden">
                        <IconButton onClick={() => toggleDropdown(page.id)}>
                          {openDropdown === page.id ? (
                            <ArrowDropUpIcon className="text-[#9ca3af]" />
                          ) : (
                            <ArrowDropDownIcon className="text-[#9ca3af]" />
                          )}
                        </IconButton>
                      </div>
                    )}
                  </div>
                  {page.dropdown && (
                    <div
                      className={`${
                        openDropdown === page.id ? "block" : "hidden"
                      } lg:absolute lg:top-full lg:left-0 lg:bg-brand-dark-bg lg:bg-opacity-80 lg:shadow-md lg:p-4 lg:min-w-[600px] lg:group-hover:block`}
                    >
                      <ul className="list-none p-0 m-0">
                        {page.dropdown.map((item, index) => (
                          <li key={item.id} className="py-2">
                            <Link
                              href={item.url}
                              className="no-underline ml-8 text-sm lg:font-bold lg:ml-0 text-white hover:text-brand-yellow lg:text-[#ffffffa6] lg:hover:text-white"
                              onClick={closeMobileMenu}
                            >
                              {item.title}
                            </Link>
                            <p
                              className={`${
                                openDropdown === page.id ? "hidden" : "block"
                              } lg:mb-2 lg:text-[0.875rem] lg:text-[#ffffffa6]`}
                            >
                              {item.description}
                            </p>
                            {index === 0 && (
                              <hr
                                className={`${
                                  openDropdown === page.id ? "hidden" : "block"
                                }`}
                              />
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
              {/* <div className="lg:hidden">
                {isMobileMenuOpen && (
                  <div className="flex flex-row items-center">
                    {socialLinks.map((social) => (
                      <Link
                        key={social.id}
                        href={social.url}
                        target="_blank"
                        passHref
                      >
                        <IconButton
                          rel="noopener noreferrer"
                          className="mx-0.5"
                          tabIndex={0}
                          onKeyUp={(e) => {
                            if (e.key === "Enter")
                              window.open(social.url, "_blank");
                          }}
                        >
                          <social.icon className="text-[#9ca3af] hover:text-brand-yellow" />
                        </IconButton>
                      </Link>
                    ))}
                  </div>
                )}
              </div> */}
            </div>
            {/* <div className="hidden ml-auto lg:flex items-center">
              {socialLinks.map((social) => (
                <Link
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  passHref
                >
                  <IconButton
                    rel="noopener noreferrer"
                    className="mx-0.5"
                    tabIndex={0}
                    onKeyUp={(e) => {
                      if (e.key === "Enter") window.open(social.url, "_blank");
                    }}
                  >
                    <social.icon className="text-[#9ca3af] hover:text-brand-yellow" />
                  </IconButton>
                </Link>
              ))}
            </div> */}
            <div className="text-[#9ca3af] ml-auto hidden md:block">
              <form onSubmit={handleSearch}>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                    inputRef={searchInputRef}
                  />
                </Search>
              </form>
              <div>
                {searchResults.map((result, index) => (
                  <div key={index}>
                    <a href={result.url}>{result.title}</a>
                    <p>{result.snippet}</p>
                  </div>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

const HeaderContainer: React.FC = () => {
  const [content, setContent] = useState<{ [key: string]: any } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch("/content/header/header.json");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setContent(data);
      } catch (error) {
        console.error("Error fetching content:", error);
        setError("Failed to load content");
      }
    };

    fetchContent();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!content) {
    return null;
  }

  return <Header contents={content} />;
};

export default HeaderContainer;
