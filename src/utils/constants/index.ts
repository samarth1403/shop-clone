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
    title: "My Orders",
    url: "/orders",
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
  id: number;
  name: string;
  email: string;
  role: string;
  avatar: string;
};

export type GlobalContextType = {
  isUserLoggedIn: boolean;
  user: userInfoType;
  setIsUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<userInfoType>>;
  cart: ProductInfoType[];
  setCart: React.Dispatch<React.SetStateAction<ProductInfoType[]>>;
  orders?: OrderInfoType[];
  setOrders?: React.Dispatch<React.SetStateAction<OrderInfoType[]>>;
  authLoading?: boolean;
  setAuthLoading ?: React.Dispatch<React.SetStateAction<boolean>>;
};

export type CategoryInfoType = {
  id: number;
  name: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
};

export type ProductInfoType = {
  id: number;
  title?: string;
  price: number;
  description: string;
  category: CategoryInfoType;
  images: string[];
};

export type OrderInfoType = {
  id: number;
  user: userInfoType;
  products: ProductInfoType[];
  total: number;
  createdAt: string;
  status: string;
};

export const initialUserInfo: userInfoType = {
  id: 0,
  name: "",
  email: "",
  role: "",
  avatar: "",
};

export const initialGlobalContext: GlobalContextType = {
  isUserLoggedIn: false,
  user: initialUserInfo,
  setIsUserLoggedIn: () => {},
  setUser: () => {},
  cart: [],
  setCart: () => {},
};

export interface formDataTypes {
  name?: string;
  email: string;
  password: string;
}

export type ReviewType = {
  name: string;
  rating: number;
  comment: string;
};

export const constants = {
  localStorageItems: {
    access_token: "access_token",
    refresh_token: "refresh_token",
    orders: "orders",
    user: "user",
    cart: "cart",
  },
  routes: {
    login: "/login",
    register: "/register",
    profile: "/profile",
    home: "/",
    cart: "/cart",
    checkout: "/checkout",
    orders: "/orders",
    products: "/products",
    productDetails: ":productId",
    orderPlaced: "/order-placed",
  },
  queryKeys: {
    getAllCategories: "getAllCategories",
    getAllProducts: "getAllProducts",
    getProductByCategoryId: "getProductByCategoryId",
  },
};
