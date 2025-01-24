
export const VERIFY = "VERIFY";
export const RESET_PASSWORD = "RESET_PASSWORD";
export const SIGN_IN_SUCCESS_MESSAGE = "Signed in successfully";
export const USER_DOES_NOT_EXIST = "User does not exist";
export const USER_ALREADY_EXISTS = "User already exists";
export const INVALID_CREDENTIALS = "Invalid Credentials";
export const UNKNOW_ERROR = "Unknown error occurred";

export const navLinks = [
  {
    id: "0",
    title: "Ecommerce",
    url: "/",
    subLinks: [
      {
        id: "2",
        title: "Resume Builder",
        url: "/",
      },
      {
        id: "0",
        title: "Resume Templates",
        url: "/resume/all-templates",
      },
      {
        id: "3",
        title: "How to Write a Resume",
        url: "/resume/how-to-write-a-resume",
      },
    ],
  },
];

export const mobileNavLinks = [
  {
    id: "0",
    title: "Resume Builder",
    url: "/",
  },
];

export const footerLinks = [
  {
    id: "0",
    title: "Resume",
    subLinks: [
      {
        id: "2",
        title: "Resume Builder",
        uri: "/",
      },
      {
        id: "0",
        title: "Resume Templates",
        uri: "/resume/all-templates",
      },
      {
        id: "3",
        title: "How to Write a Resume",
        uri: "/resume/how-to-write-a-resume",
      },
    ],
  },
  {
    id: "1",
    title: "Cover Letter",
    subLinks: [
      {
        id: "2",
        title: "Cover Letter Builder",
        uri: "/cover-letter/builder",
      },
      {
        id: "0",
        title: "Cover Letter Templates",
        uri: "/cover-letter/all-templates",
      },
      {
        id: "3",
        title: "How to Write a Cover Letter",
        uri: "/cover-letter/how-to-write-a-cover-letter",
      },
    ],
  },
  {
    id: "3",
    title: "Resources",
    subLinks: [
      {
        id: "0",
        title: "Blogs",
        uri: "/blogs",
      },
      {
        id: "1",
        title: "FAQ",
        uri: "/faq",
      },
      {
        id: "2",
        title: "Contact",
        uri: "/contact",
      },
      {
        id: "3",
        title: "About",
        uri: "/about",
      },
    ],
  },
  {
    id: "4",
    title: "Legal",
    subLinks: [
      {
        id: "0",
        title: "Privacy Policy",
        uri: "/privacy-policy",
      },
      {
        id: "1",
        title: "Terms of Service",
        uri: "/terms-of-service",
      },
      {
        id: "2",
        title: "Cookie Policy",
        uri: "/cookie-policy",
      },
    ],
  },
];

export type userInfoType = {
  username: string;
  email: string;
  isAdmin: boolean;
  isVerified: boolean;
  userId: string;
};

export type GlobalContextType = {
  isUserLoggedIn: boolean;
  user: userInfoType | null;
  setIsUserLoggedIn: (isLoggedIn: boolean) => void;
  setUser: (user: userInfoType) => void;
};

export const initialUserInfo: userInfoType = {
  username: "",
  email: "",
  isAdmin: false,
  isVerified: false,
  userId: "",
};

export const initialGlobalContext: GlobalContextType = {
  isUserLoggedIn: false,
  user: initialUserInfo,
  setIsUserLoggedIn: () => {},
  setUser: () => {},
};

export interface formDataTypes {
  username?: string;
  email: string;
  password: string;
}

export type ReviewType = {
  name: string;
  rating: number;
  comment: string;
};
