/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Confetti from "react-confetti";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetTournamentByIdQuery } from "../../redux/apis/tournament/TournamentApi";
import NoDataAvailable from "../shared/noData/NoDataAvailableTwo";
import TournamentBanner from "./TournamentBanner/TournamentBanner";
import TournamentDetailsTab from "./TournamentDetailsTab/TournamentDetailsTab";
import Loading from "../others/Loading";
import { useInitiatePaymentMutation } from "../../redux/apis/payment/PaymentApi";
import { MainModal } from "../Modal/MainModal";
import EnrollWithClan from "./TournamentDetailsTab/enrollwithClan/EnrollWithClan";
import { toast } from "sonner";
import useAuthUser from "../../hooks/useGetMe";
// import { useWindowSize } from 'react-use'

const TournamentDetailsPage = () => {
  const location = useLocation();
  const path = location.pathname;

  const { user } = useAuthUser()
  const [showConfetti, setShowConfetti] = useState(false);
  // const { width, height } = useWindowSize();
  const slug = path?.split("/")[2];
  const { data: GameData, isLoading } = useGetTournamentByIdQuery(slug);
  // Assuming the slug is the tournament ID
  const [initiatePayment] = useInitiatePaymentMutation();

  const navigate = useNavigate();
  // Assuming the last part is the tournament ID
  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const [clanModal, setClanModal] = useState(false);

  const currentDate = new Date();
  const startDate = GameData?.data?.startDate
    ? new Date(GameData.data.startDate)
    : null;

  const handleEnroll = async () => {
    if ((GameData?.data?.teamSize as number) >= 2) {
      setClanModal(true);
    } else {
      try {
        const res = await initiatePayment({
          paymentData: {
            tournamentId: GameData?.data?.id as string,
          },
        });
        if ("data" in res && (res.data as any)?.success) {
          console.log("Enrollment successful:", res.data);
          // Assuming the response contains a URL to redirect to
          setShowConfetti((prev: any) => !prev);
          await new Promise((resolve) => setTimeout(resolve, 5000));
          handleNavigate(`/payment?clientSecret=${res.data.data.clientSecret}&userId=${user.id}`);
        } else {
          toast.error("Enrollment failed. Please try again.");
        }
      } catch (error) {
        console.error("Unexpected error:", error);
        // Handle unexpected errors
      }
      // Uncomment the line below to toggle confetti visibility
    }
  };

  // Determine registration status: true if startDate is in the future, false otherwise
  const registrationStatus = startDate ? startDate > currentDate : false;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="overflow-hidden relative">
      {GameData ? (
        <div>
          <TournamentBanner
            bannerImage={GameData?.data?.image as string}
            title={GameData?.data?.title ?? " Game Title"}
            subtitle={GameData?.data?.subtitle ?? "Game subtitle"}
            gameName={GameData?.data?.gameName ?? "Game Name"}
            tournamentType="COMMUNITY TOURNAMENT"
            platform={GameData?.data?.gamePlatform ?? "GAme Platform"}
            startDate={
              GameData?.data?.startDate
                ? new Date(GameData?.data?.startDate).toDateString()
                : "Unknown Date"
            }
            registrationStatus={registrationStatus}
            enrollmentStatus={
              GameData?.data?.maxTeams === GameData?.data?.participants.length
            }
            entryFee={GameData?.data?.entryFee ?? 0}
            teamSize={GameData?.data?.teamSize ?? "Team Size"}
            maxTeams={GameData?.data?.maxTeams ?? 0}
            enrolledTeams={GameData?.data?.participants.length ?? 0}
            skillLevel={GameData?.data?.skillLevel ?? "Skill Level"}
            handleEnroll={handleEnroll}
          // setShowConfetti={setShowConfetti}
          />

          <TournamentDetailsTab
            rules={GameData?.data?.rules}
            participants={GameData?.data?.participants}
          />
        </div>
      ) : (
        <div className="w-full h-[50vh]">
          <NoDataAvailable text="Currently No Game Available" />
        </div>
      )}
      {showConfetti && (
        <Confetti recycle={false} width={window.innerWidth} height={1000} />
      )}
      <MainModal isOpen={clanModal} onClose={() => setClanModal(false)}>
        <EnrollWithClan
          setShowConfetti={setShowConfetti}
          tournamentId={GameData?.data?.id as string}
          setClanModal={setClanModal}
        />
      </MainModal>
    </div>
  );
};

export default TournamentDetailsPage;
