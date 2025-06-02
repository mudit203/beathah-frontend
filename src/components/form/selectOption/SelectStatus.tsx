'use client';
import { useContext } from "react";
import { Select } from "@windmill/react-ui";
//internal import
import OrderServices from "@/services/OrderServices";
import { notifySuccess, notifyError } from "@/utils/toast";
import { SidebarContext } from "@/context/SidebarContext";

// Type definitions
interface Order {
  status?: 'Delivered' | 'Pending' | 'Processing' | 'Cancel';
  // Add other order properties as needed
  [key: string]: any;
}

interface SelectStatusProps {
  id: string | number;
  order: Order;
}

interface SidebarContextType {
  setIsUpdate: (value: boolean) => void;
  // Add other context properties as needed
}

const SelectStatus: React.FC<SelectStatusProps> = ({ id, order }) => {
  // console.log('id',id ,'order',order)
  const { setIsUpdate } = useContext(SidebarContext) as SidebarContextType;

  const handleChangeStatus = (id: string | number, status: string): void => {
    // return notifyError("This option disabled for this option!");
    OrderServices.updateOrder(id, { status: status })
      .then((res: any) => {
        notifySuccess(res.message);
        setIsUpdate(true);
      })
      .catch((err: any) => notifyError(err.message));
  };

  return (
    <>
      <Select
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => 
          handleChangeStatus(id, e.target.value)
        }
        className="h-8"
      >
        <option value="status" defaultValue hidden>
          {order?.status}
        </option>
        <option defaultValue={order?.status === "Delivered"} value="Delivered">
          Delivered
        </option>
        <option defaultValue={order?.status === "Pending"} value="Pending">
          Pending
        </option>
        <option
          defaultValue={order?.status === "Processing"}
          value="Processing"
        >
          Processing
        </option>
        <option defaultValue={order?.status === "Cancel"} value="Cancel">
          Cancel
        </option>
      </Select>
    </>
  );
};

export default SelectStatus;