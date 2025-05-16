import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ScrollBar } from "../../../ui/scroll-area";
import { Skeleton } from "../../../ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../ui/table";

export interface User {
  id: string;
  fullName: string | null;
  userName: string;
  email: string;
  role: "USER" | "ADMIN" | string; // Assuming possible roles
  profilePicture: string | null;
  coverPicture: string | null;
  userStatus: "ACTIVE" | "INACTIVE" | "BANNED" | string; // Possible statuses
  isOnline: boolean;
  isDeleted: boolean;
  otp: string | null;
  otpExpiry: string | null;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export function UserAndTable({
  users,
  loading,
}: {
  users: User[];
  loading: boolean;
}) {
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="rounded-lg">
      <ScrollArea>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="px-4 py-5 text-sm lg:text-base text-primary_highlighted rounded-l-xl">
                User
              </TableHead>
              <TableHead className="px-4 py-5 text-sm md:text-base text-primary_highlighted">
                Username
              </TableHead>
              <TableHead className="px-4 py-5 text-sm md:text-base text-primary_highlighted">
                Status
              </TableHead>
              <TableHead className="px-4 py-5 text-sm md:text-base text-primary_highlighted">
                Role
              </TableHead>
              <TableHead className="px-4 py-5 text-sm md:text-base text-primary_highlighted rounded-r-xl">
                Joined Date
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                className="hover:bg-black/20 text-sm md:text-base"
              >
                <TableCell className="font-medium py-6">
                  <div className="flex items-center gap-6">
                    {user.profilePicture ? (
                      <img
                        src={user.profilePicture}
                        alt={user.userName}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
                        <span className="text-white text-lg">
                          {user.userName.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <span>{user.email}</span>
                  </div>
                </TableCell>
                <TableCell>{user.userName}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      user.userStatus === "ACTIVE"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {user.userStatus}
                  </span>
                </TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  {new Date(user.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
