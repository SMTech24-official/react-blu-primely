// routes.ts
import SignInForm from "../components/authComponents/signIn/SignIn";
import Leaderboards from "../components/leaderboards/Leaderboards/Leaderboards";
import AboutPage from "../components/pages/aboutUs/AboutUsPage";
import SupportPage from "../components/pages/support/SupportPage";
import TournamentsPage from "../components/pages/tournaments/TournmentsPages";
import Home from "../pages/Home/Home";
import HomeLayout from "../pages/homeLayout";

export const navItems = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Tournaments",
    link: "/tournaments",
  },
  {
    name: "Leaderboards",
    link: "/leaderboards",
  },
  {
    name: "About Us",
    link: "/aboutUs",
  },
  {
    name: "Support",
    link: "/support",
  },
];


// Define your routes
export const routes = [
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/aboutUs", element: <AboutPage /> },
      { path: "/support", element: <SupportPage /> },
      { path: "/leaderboards", element: <Leaderboards /> },
      { path: "/tournaments", element: <TournamentsPage /> },
    ],
  },
  {
    path: "/signin",
    element: <SignInForm />,
  },
];
