// routes.ts
import NewPasswordForm from "../components/authComponents/change-password/Change-password";
import ForgetPasswordPage from "../components/authComponents/forget-password/ForgetPasswordCom";
import OtpVerification from "../components/authComponents/otp/OtpComponents";
import SignInForm from "../components/authComponents/signIn/SignIn";
import SignupForm from "../components/authComponents/signUp/SignUp";
import CommunicationComponent from "../components/communication/MainCommunication";
import MainAward from "../components/dashboard/award/MainAward";
import TournamentForm from "../components/dashboard/dashboard/addTournments/AddTournaments";
import DashBoardPage from "../components/dashboard/dashboard/DashBoardPAge";
import LeaderTab from "../components/dashboard/dashboard/leaderBoard/LeaderBoard";
import DetailsPage from "../components/dashboard/dashboard/tournmentsDetails/DetailsPage";
import UserAndClanTab from "../components/dashboard/dashboard/userAndClan/UserAndClan";
import FixtureBracket from "../components/dashboard/fixture/FixtureBracket/Bracket";
import MainFixture from "../components/dashboard/fixture/MainFixture";
import { Layout } from "../components/dashboard/Layout";
import PaymentDetails from "../components/dashboard/payment/PaymentDetails";
import Leaderboards from "../components/leaderboards/Leaderboards/Leaderboards";
import NotFound from "../components/others/NotFound";
import TournamentDetailsPage from "../components/TournamentDetails/TournamentDetailsPage";
import { SidebarProvider } from "../components/ui/sidebar";
import ScrollToTop from "../hooks/ScrollTop";
import AboutPage from "../pages/aboutUs/AboutUsPage";
import Tournaments from "../pages/adTournaments/Tournaments";
import AuthLayout from "../pages/AuthLayout";
import ChatPage from "../pages/chat/ChatPahe";
import ClanDetails from "../pages/ClanDetails/ClanDetails";
import FeaturedTournament from "../pages/featured-tournament/FeaturedTournament";
import Home from "../pages/Home/Home";
import HomeLayout from "../pages/homeLayout";
import Invitations from "../pages/invitations/Invitations";
import Payment from "../pages/payment/payment";
import Profile from "../pages/profile/Profile";
import SupportPage from "../pages/support/SupportPage";
import TournamentsPage from "../pages/tournaments/TournmentsPages";

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
      { path: "/dashboard/tournaments", element: <ScrollToTop pathname="/dashboard/tournaments"><Tournaments /></ScrollToTop> },
      { path: "/dashboard/tournaments/:id", element: <ScrollToTop pathname="/dashboard/tournaments/:id"> <DetailsPage /> </ScrollToTop> },
      { path: "/dashboard/fixture", element: <ScrollToTop pathname="/dashboard/fixture"><MainFixture /></ScrollToTop> },
      { path: "/dashboard/fixture/:id", element: <ScrollToTop pathname="/dashboard/fixture/:id"> <FixtureBracket /> </ScrollToTop> },
      { path: "/dashboard/leaderBoards", element: <ScrollToTop pathname="/dashboard/leaderBoards"><LeaderTab /></ScrollToTop> },
      { path: "/dashboard/tournaments/addTournaments", element: <ScrollToTop pathname="/dashboard/tournaments/addTournaments"><TournamentForm /></ScrollToTop> },
      { path: "/dashboard/award", element: <ScrollToTop pathname="/dashboard/award"><MainAward /></ScrollToTop> },
      { path: "/dashboard/payment", element: <ScrollToTop pathname="/dashboard/payment"><Payment /></ScrollToTop> },
      { path: "/dashboard/payment/:id", element: <ScrollToTop pathname="/dashboard/payment"><PaymentDetails /></ScrollToTop> },

      { path: "/dashboard/user-clan", element: <ScrollToTop pathname="/dashboard/user-clan"><UserAndClanTab /></ScrollToTop> },
      { path: "/dashboard/chat", element: <ScrollToTop pathname="/dashboard/user-clan"><CommunicationComponent /></ScrollToTop> },
    ],
  },
];


