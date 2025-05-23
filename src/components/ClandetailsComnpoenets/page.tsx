import banner from "@/assets/header/clan.jpg";
import { useParams } from "react-router-dom";
import { useGetClanByIdQuery } from "../../redux/apis/clan/ClanApi";
import ClanTab from "./ClanTab";
import { PageHeader } from "./PageHeader";

import { Clan } from "../../redux/types";






const ClanPage = () => {
    const { id } = useParams<{ id: string }>();
    const { data } = useGetClanByIdQuery(id || "")
    return (
        <div>
            <PageHeader subTitle={data?.data.mission as string} title={`Welcome to ${data?.data.name}`} backgroundImage={banner} />
            <div className="section-gap container">
                <ClanTab data={data?.data as Clan} />
            </div>
        </div>
    );
};

export default ClanPage;