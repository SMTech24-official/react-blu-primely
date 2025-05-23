import logOutIcon from "@/assets/logout/fi_992680.png"
import useAuthUser from "../../hooks/useGetMe";
const LogOutModal = () => {

    const { handleLogout } = useAuthUser();



    return (
        <div className="flex flex-col items-center w-full">
            <div className="mb-5">
                <img src={logOutIcon} alt="" />
            </div>
            <p className="text-xl">Oh No! You are leaving</p>
            <p className="text-xl">Are you Sure?</p>
            <div className="grid grid-cols-2 w-full mt-12">
                <button className="hover:bg-gray-700 py-2 rounded-lg hover:text-primary_highlighted">
                    No
                </button>
                <button onClick={handleLogout} className="hover:bg-gray-700 py-2 rounded-lg hover:text-primary_highlighted">
                    Yes
                </button>
            </div>
        </div>
    );
};

export default LogOutModal;