import { MessageCircle, UserCheck } from "lucide-react";


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../ui/dropdown-menu";
import { Link } from "react-router-dom";


const staffMembers = [
  {
    id: 1,
    name: "CGM Brans",
    avatar: "/placeholder.svg",
    initials: "CGM",
    socials: {
      twitter: "https://twitter.com/cgmbrans",
      facebook: "https://facebook.com/cgmbrans",
      instagram: "https://instagram.com/cgmbrans",
      linkedin: "https://linkedin.com/in/cgmbrans",
    },
  },
  {
    id: 2,
    name: "CGM Brans",
    avatar: "/placeholder.svg",
    initials: "CGM",
    socials: {
      twitter: "https://twitter.com/cgmbrans",
      facebook: "https://facebook.com/cgmbrans",
      instagram: "https://instagram.com/cgmbrans",
      linkedin: "https://linkedin.com/in/cgmbrans",
    },
  },
  {
    id: 3,
    name: "CGM Brans",
    avatar: "/placeholder.svg",
    initials: "CGM",
    socials: {
      twitter: "https://twitter.com/cgmbrans",
      facebook: "https://facebook.com/cgmbrans",
      instagram: "https://instagram.com/cgmbrans",
      linkedin: "https://linkedin.com/in/cgmbrans",
    },
  },
  {
    id: 4,
    name: "CGM Brans",
    avatar: "/placeholder.svg",
    initials: "CGM",
    socials: {
      twitter: "https://twitter.com/cgmbrans",
      facebook: "https://facebook.com/cgmbrans",
      instagram: "https://instagram.com/cgmbrans",
      linkedin: "https://linkedin.com/in/cgmbrans",
    },
  },
  {
    id: 5,
    name: "CGM Brans",
    avatar: "/placeholder.svg",
    initials: "CGM",
    socials: {
      twitter: "https://twitter.com/cgmbrans",
      facebook: "https://facebook.com/cgmbrans",
      instagram: "https://instagram.com/cgmbrans",
      linkedin: "https://linkedin.com/in/cgmbrans",
    },
  },
  {
    id: 6,
    name: "CGM Brans",
    avatar: "/placeholder.svg",
    initials: "CGM",
    socials: {
      twitter: "https://twitter.com/cgmbrans",
      facebook: "https://facebook.com/cgmbrans",
      instagram: "https://instagram.com/cgmbrans",
      linkedin: "https://linkedin.com/in/cgmbrans",
    },
  },
];

const Admin = () => {
  return (
    <div className="section-gap space-y-20">
      <div className=" px-5 xl:px-0">
        {" "}
        <div className="container  bg-[#1D1D1D] text-white mx-auto rounded-lg border border-gray-300/40">
          <div className="py-10 lg:p-6 space-y-6 font-normal text-sm lg:text-lg">
            <div className="flex gap-3">
              <MessageCircle className="h-6 w-6 flex-shrink-0 text-zinc-400" />
              <p className="text-zinc-200">
                Match related issues must be handled through your match chat.
                Your match chat can be found in your match details page or by
                clicking the chat icon located in the top right and select
                &quot;My Matches&quot;
              </p>
            </div>

            <div className="flex gap-3">
              <UserCheck className="h-6 w-6 flex-shrink-0 text-zinc-400" />
              <p className="text-zinc-200">
                Staff gamertags are not a form of Contact/Live Support, and are
                only intended to be used for verification of staff identity in
                the event of a no show direct message via console. All questions
                and comments sent to staff gamertags will not be read or replied
                too.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Table  */}
      <div className="bg-[#1D1D1D] ">
        <div className="container mx-auto px-5 xl:px-0 py-12">
          <h2 className="text-2xl font-extrabold text-white mb-8">
            Staff Member
          </h2>
          <div className="space-y-4">
            {staffMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between py-4 border-b border-white/20"
              >
                <div className="flex items-center gap-6">
                  <div className="h-12 w-12 bg-zinc-900">
                    <div className="bg-zinc-900 text-zinc-400">
                      {member.initials}
                    </div>
                  </div>
                  <span className="text-white font-medium">{member.name}</span>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    {/* <button>Contact</button> */}
                    <div className="relative w-fit  border border-transparent bg-gradient-to-r from-[#B463FF] to-[#369CFF] [background-clip:padding-box] p-[1px]  flex justify-center items-center rounded-md">
                      <button className="bg-black flex items-center justify-center p-2 active:scale-95 transition-all duration-300 px-10 rounded-md">
                        Contact
                      </button>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48 bg-zinc-900 border-zinc-800">
                    {member.socials.twitter && (
                      <DropdownMenuItem
                        className="text-white hover:bg-zinc-800 cursor-pointer"
                        rel="noopener noreferrer"
                      >
                        <Link to={member.socials.twitter}>
                          <span>Twitter</span>
                        </Link>
                      </DropdownMenuItem>
                    )}
                    {member.socials.facebook && (
                      <DropdownMenuItem
                        className="text-white hover:bg-zinc-800 cursor-pointer"
                        rel="noopener noreferrer"
                      >
                        <Link to={member.socials.facebook}>
                          {" "}
                          <span>Facebook</span>
                        </Link>
                      </DropdownMenuItem>
                    )}
                    {member.socials.instagram && (
                      <DropdownMenuItem
                        className="text-white hover:bg-zinc-800 cursor-pointer"
                        rel="noopener noreferrer"
                      >
                        <Link to={member.socials.instagram}>
                          <span>Instagram</span>
                        </Link>
                      </DropdownMenuItem>
                    )}
                    {member.socials.linkedin && (
                      <DropdownMenuItem
                        className="text-white hover:bg-zinc-800 cursor-pointer"
                        rel="noopener noreferrer"
                      >
                        <Link to={member.socials.linkedin}>
                          <span>LinkedIn</span>
                        </Link>
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
