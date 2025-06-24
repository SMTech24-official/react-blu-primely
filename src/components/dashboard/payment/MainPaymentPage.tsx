import { useState } from "react";
import { PaymentTable } from "./table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { DatePickerDemo } from "../../datePicker/Date";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { useGetAllPaymentsQuery } from "../../../redux/apis/payment/PaymentApi";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

const MainPaymentPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [date, setDate] = useState<Date>();
  const [transactionId, setTransactionId] = useState<string>("");

  const { data, isLoading, isError } = useGetAllPaymentsQuery({
    page: currentPage,
    limit: itemsPerPage,
  });

  // Transform API data to match your table format
  const transformedPayments =
    data?.data?.payments.map((payment) => ({
      date: payment.createdAt,
      transactionId: payment.id,
      tournamentName: payment.tournamentName || "",
      status: payment.status,
      amount: payment.amount,
    })) || [];

  // Pagination calculations
  const totalItems = data?.data.metaData.total || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Pagination handlers
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const halfVisible = Math.floor(maxVisiblePages / 2);
      let startPage = Math.max(1, currentPage - halfVisible);
      let endPage = Math.min(totalPages, currentPage + halfVisible);

      if (currentPage <= halfVisible) {
        endPage = maxVisiblePages;
      }

      if (currentPage > totalPages - halfVisible) {
        startPage = totalPages - maxVisiblePages + 1;
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  if (isLoading) return <div className="text-white">Loading payments...</div>;
  if (isError)
    return <div className="text-red-400">Error loading payments</div>;

  return (
    <div className="p-4 bg-card_bg rounded-lg">
      <div className="">
        <p className="font-semibold text-2xl uppercase text-white">
          Payment History
        </p>
        <div className="mt-4 grid grid-cols-3 gap-4">
          <Input
            placeholder="Transaction ID"
            className="w-full h-full border-none bg-gray-800 text-white placeholder-gray-400"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
          />

          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-full bg-gray-800 border-gray-700 text-white">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="all" className="text-white hover:bg-gray-700">
                All Statuses
              </SelectItem>
              <SelectItem
                value="PENDING"
                className="text-white hover:bg-gray-700"
              >
                Pending
              </SelectItem>
              <SelectItem
                value="COMPLETED"
                className="text-white hover:bg-gray-700"
              >
                Completed
              </SelectItem>
              <SelectItem
                value="FAILED"
                className="text-white hover:bg-gray-700"
              >
                Failed
              </SelectItem>
              <SelectItem
                value="REFUNDED"
                className="text-white hover:bg-gray-700"
              >
                Refunded
              </SelectItem>
            </SelectContent>
          </Select>

          <DatePickerDemo date={date} setDate={setDate} />
        </div>
      </div>

      <PaymentTable transactions={transformedPayments} />

      {/* Pagination Section */}
      <div className="mt-6 flex items-center justify-between">
        {/* Items per page and info */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">Rows per page:</span>
            <Select
              value={itemsPerPage.toString()}
              onValueChange={handleItemsPerPageChange}
            >
              <SelectTrigger className="w-20 bg-gray-800 border-gray-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="5" className="text-white hover:bg-gray-700">
                  5
                </SelectItem>
                <SelectItem value="10" className="text-white hover:bg-gray-700">
                  10
                </SelectItem>
                <SelectItem value="20" className="text-white hover:bg-gray-700">
                  20
                </SelectItem>
                <SelectItem value="50" className="text-white hover:bg-gray-700">
                  50
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <span className="text-sm text-gray-400">
            {totalItems > 0
              ? `${startItem}-${endItem} of ${totalItems}`
              : "0 of 0"}
          </span>
        </div>

        {/* Pagination controls */}
        <div className="flex items-center space-x-2">
          {/* First page */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700 disabled:opacity-50"
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>

          {/* Previous page */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700 disabled:opacity-50"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {/* Page numbers */}
          {getPageNumbers().map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => handlePageChange(page)}
              className={
                currentPage === page
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
              }
            >
              {page}
            </Button>
          ))}

          {/* Next page */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700 disabled:opacity-50"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Last page */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700 disabled:opacity-50"
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MainPaymentPage;
