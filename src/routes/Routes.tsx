// routes.ts
import NewPasswordForm from "../components/authComponents/change-password/Change-password";
import ForgetPasswordPage from "../components/authComponents/forget-password/ForgetPasswordCom";
import OtpVerification from "../components/authComponents/otp/OtpComponents";
import SignInForm from "../components/authComponents/signIn/SignIn";
import SignupForm from "../components/authComponents/signUp/SignUp";
import Leaderboards from "../components/leaderboards/Leaderboards/Leaderboards";
import NotFound from "../components/others/NotFound";
import AboutPage from "../components/pages/aboutUs/AboutUsPage";
import ChatPage from "../components/pages/chat/ChatPahe";
import ClanDetails from "../components/pages/ClanDetails/ClanDetails";
import FeaturedTournament from "../components/pages/featured-tournament/FeaturedTournament";
import Invitations from "../components/pages/invitations/Invitations";
import Profile from "../components/pages/profile/Profile";
import SupportPage from "../components/pages/support/SupportPage";
import TournamentsPage from "../components/pages/tournaments/TournmentsPages";
import TournamentDetailsPage from "../components/TournamentDetails/TournamentDetailsPage";
import ScrollToTop from "../hooks/ScrollTop";
import AuthLayout from "../pages/AuthLayout";
import Home from "../pages/Home/Home";
import HomeLayout from "../pages/homeLayout";
import { Layout } from "../components/dashboard/Layout";
import { SidebarProvider } from "../components/ui/sidebar";
import DashBoardPage from "../components/dashboard/dashboard/DashBoardPAge";
import UnderConstruction from "../components/others/UnderConstruction";

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
      { path: "/aboutUs", element: <ScrollToTop pathname="/aboutUs"><AboutPage /></ScrollToTop> },
      { path: "/support", element: <ScrollToTop pathname="/support"><SupportPage /></ScrollToTop> },
      { path: "/leaderboards", element: <ScrollToTop pathname="/leaderboards"><Leaderboards /> </ScrollToTop> },
      { path: "/tournaments", element: <ScrollToTop pathname="/tournaments"><TournamentsPage /></ScrollToTop> },
      {
        path: "/featured-tournament/:name", element: <ScrollToTop pathname={"/featured-tournament/:name"}><FeaturedTournament /></ScrollToTop>,
      },
      {
        path: "/tournament-details/:id", element: <ScrollToTop pathname={"/tournament-details/:id"}><TournamentDetailsPage /></ScrollToTop>,
      },
      {
        path: "/clan-details/:id", element: <ScrollToTop pathname={"/clan-details/:id"}><ClanDetails /></ScrollToTop>,
      },
      {
        path: "/profile", element: <ScrollToTop pathname={"/profile"}><Profile /></ScrollToTop>,
      },
      {
        path: "/chat", element: <ScrollToTop pathname={"/profile"}><ChatPage /></ScrollToTop>,
      },
      {
        path: "/invitations", element: <ScrollToTop pathname={"/profile"}><Invitations /></ScrollToTop>,
      }
    ],
  },
  {
    path: "/signin",
    element: <AuthLayout ><SignInForm /></AuthLayout>,
  },
  {
    path: "/signUp",
    element: <AuthLayout ><SignupForm /> </AuthLayout>,
  },
  {
    path: "/otp",
    element: <AuthLayout ><OtpVerification /> </AuthLayout>,
  },
  {
    path: "/forget-password",
    element: <AuthLayout ><ForgetPasswordPage /> </AuthLayout>,
  },
  {
    path: "/change-password",
    element: <AuthLayout ><NewPasswordForm /> </AuthLayout>,
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/dashboard",
    element: <SidebarProvider><Layout /></SidebarProvider>,
    children: [
      { path: "/dashboard", element: <ScrollToTop pathname="/dashboard"><DashBoardPage /></ScrollToTop> },
      { path: "/dashboard/tournaments", element: <ScrollToTop pathname="/dashboard/tournaments"><UnderConstruction /></ScrollToTop> },
      { path: "/dashboard/fixture", element: <ScrollToTop pathname="/dashboard/fixture"><UnderConstruction /></ScrollToTop> },
      { path: "/dashboard/leaderBoards", element: <ScrollToTop pathname="/dashboard/leaderBoards"><UnderConstruction /></ScrollToTop> },
      { path: "/dashboard/award", element: <ScrollToTop pathname="/dashboard/award"><UnderConstruction /></ScrollToTop> },
      { path: "/dashboard/payment", element: <ScrollToTop pathname="/dashboard/payment"><UnderConstruction /></ScrollToTop> },

      { path: "/dashboard/user-clan", element: <ScrollToTop pathname="/dashboard/user-clan"><AboutPage /></ScrollToTop> },
    ],
  },
];
