'use client';

import { Avatar, TableBody, TableCell, TableRow } from "@windmill/react-ui";
import { useState } from "react";
import { FiZoomIn } from "react-icons/fi";

//internal import

import Status from "@/components/table/Status";
import useUtilsFunction from "@/hooks/useUtilsFunction";
import MainDrawer from "@/components/drawer/MainDrawer";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import Tooltip from "@/components/tooltip/Tooltip";
import StaffDrawer from "@/components/drawer/StaffDrawer";
import DeleteModal from "@/components/modal/DeleteModal";
import EditDeleteButton from "@/components/table/EditDeleteButton";
import ActiveInActiveButton from "@/components/table/ActiveInActiveButton";
import AccessListModal from "@/components/modal/AccessListModal";

// TypeScript interface for staff
interface Staff {
  _id: string;
  password?: string;
  name: string;
  image: string;
  email: string;
  phone: string;
  role: string;
  joiningData: string;
  createdAt?: string;
  updatedAt?: string;
  status?: string;
  [key: string]: any; // for any additional dynamic fields
}

interface StaffTableProps {
  staffs: Staff[];
  lang: string;
}

const StaffTable: React.FC<StaffTableProps> = ({ staffs, lang }) => {
  const {
    title,
    serviceId,
    handleModalOpen,
    handleUpdate,
  } = useToggleDrawer();

  const { showDateFormat, showingTranslateValue } = useUtilsFunction();
  // State for access list modal
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [isAccessModalOpen, setIsAccessModalOpen] = useState(false);

  // Function to open the access list modal
  const handleAccessModalOpen = (staff: Staff) => {
    setSelectedStaff(staff);
    setIsAccessModalOpen(true);
  };

  // Function to close the access list modal
  const handleAccessModalClose = () => {
    setSelectedStaff(null);
    setIsAccessModalOpen(false);
  };

  return (
    <>
      <DeleteModal id={serviceId} title={title} />
      {/* Access List Modal */}
      {isAccessModalOpen && (
        <AccessListModal
          staff={selectedStaff as Staff}
          isOpen={isAccessModalOpen}
          onClose={handleAccessModalClose}
          showingTranslateValue={showingTranslateValue}
        />
      )}

      <MainDrawer>
        <StaffDrawer id={serviceId} />
      </MainDrawer>

      <TableBody>
        {staffs?.map((staff) => (
          <TableRow key={staff._id}>
            <TableCell>
              <div className="flex items-center">
                <Avatar
                  className="hidden mr-3 md:block bg-gray-50"
                  src={staff.image}
                  alt="staff"
                />
                <div>
                  <h2 className="text-sm font-medium">
                    {showingTranslateValue(staff?.name)}
                  </h2>
                </div>
              </div>
            </TableCell>

            <TableCell>
              <span className="text-sm">{staff.email}</span>{" "}
            </TableCell>
            <TableCell>
              <span className="text-sm ">{staff.phone}</span>
            </TableCell>

            <TableCell>
              <span className="text-sm">
                {/* {dayjs(staff.joiningData).format("DD/MM/YYYY")} */}
                {showDateFormat(staff.joiningData)}
              </span>
            </TableCell>
            <TableCell>
              <span className="text-sm font-semibold">{staff?.role}</span>
            </TableCell>
            <TableCell className="text-center text-xs">
              <Status status={staff.status} />
            </TableCell>

            <TableCell className="text-center">
              <ActiveInActiveButton
                id={staff?._id}
                staff={staff}
                option="staff"
                status={staff.status}
              />
            </TableCell>

            <TableCell>
              <div className="flex justify-between items-center">
                <button
                  onClick={() => handleAccessModalOpen(staff)}
                  className="text-gray-400"
                >
                  <Tooltip
                    id="view"
                    Icon={FiZoomIn}
                    title="View Access Route"
                    bgColor="#059669"
                  />
                </button>
                <EditDeleteButton
                  id={staff._id}
                  handleUpdate={handleUpdate}
                  handleModalOpen={handleModalOpen}
                  title={showingTranslateValue(staff?.name)}
                  isCheck={[]}
                  product={undefined}
                  parent={undefined}
                  children={undefined}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default StaffTable;
