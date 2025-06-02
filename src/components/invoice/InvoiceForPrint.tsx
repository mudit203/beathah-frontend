'use client';

import {
  ModalBody,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
} from "@windmill/react-ui";
import dayjs from "dayjs";
import { Fragment, RefObject } from "react";
import { useTranslation } from "react-i18next";

// Type definitions
interface CartItem {
  title: string;
  quantity: number;
  price: number;
}

interface PaymentDetails {
  selectPaymentOption_Card?: string;
  paymentAmount_Card?: string | number;
  selectPaymentOption_Cash?: string;
  paymentAmount_Cash?: string | number;
  selectPaymentOption_Credit?: string;
  paymentAmount_Credit?: string | number;
}

interface InvoiceData {
  cart: CartItem[];
  paymentMethod: string;
  paymentDetails?: PaymentDetails;
  shippingOption?: string;
  invoice: string;
  subTotal: string | number;
  shippingCost?: string | number;
  discount?: string | number;
  total: string | number;
}

interface GlobalSetting {
  logo?: string;
  company_name?: string;
  address?: string;
  contact?: string;
  web_site?: string;
  email?: string;
  vat_number?: string;
  default_currency?: string;
}

interface InvoiceForPrintProps {
  data: InvoiceData | InvoiceData[];
  printRef: RefObject<HTMLDivElement>;
  globalSetting?: GlobalSetting;
}

const InvoiceForPrint: React.FC<InvoiceForPrintProps> = ({ 
  data, 
  printRef, 
  globalSetting 
}) => {
  const { t } = useTranslation();

  const currency: string = globalSetting?.default_currency || "$";

  return (
    <div ref={printRef} className="p-4">
      {Array.isArray(data) ? (
        data?.map((or: InvoiceData, i: number) => (
          <div className="mb-8" key={i + 1}>
            {globalSetting?.logo && (
              <img
                className="flex mx-auto"
                src={globalSetting?.logo}
                alt=""
                width={50}
              />
            )}

            <div className="my-1">
              <div className="flex justify-center">
                <h1 className="font-bold text-xl">
                  {globalSetting?.company_name}
                </h1>
              </div>

              <ModalBody className="flex flex-col justify-center text-center">
                <span className="flex-row">{globalSetting?.address}</span>

                <span className="flex justify-center">
                  {globalSetting?.contact}
                </span>

                {globalSetting?.web_site}
                <br />
                {globalSetting?.email}
              </ModalBody>
            </div>

            <TableContainer className="my-4 rounded-b-lg">
              <Table>
                <TableHeader>
                  <tr>
                    <TableCell className="bg-white">
                      <span className="text-xs capitalize text-gray-700">
                        {t("Item")}
                      </span>
                    </TableCell>
                    <TableCell className="text-xs bg-white capitalize text-center text-gray-700">
                      {t("QTY")}
                    </TableCell>
                    <TableCell className="text-xs bg-white capitalize text-right text-gray-700">
                      {t("Amount")}
                    </TableCell>
                  </tr>
                </TableHeader>
                <TableBody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 text-serif text-sm">
                  {or?.cart?.map((item: CartItem, i: number) => (
                    <TableRow
                      key={i}
                      className="dark:border-gray-700 dark:text-gray-400 bill"
                    >
                      <TableCell className="py-1">
                        <span className="font-normal text-gray-600 bill">
                          {" "}
                          {item.title?.substring(0, 15)}
                        </span>
                      </TableCell>
                      <TableCell className="text-center py-1">
                        <span className="font-bold text-center bill">
                          {" "}
                          {item.quantity}{" "}
                        </span>
                      </TableCell>

                      <TableCell className="text-right py-1">
                        <span className="text-right font-bold text-gray-700 bill">
                          {" "}
                          {currency}
                          {(item.price * item.quantity).toFixed(2)}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <ModalBody>
              <div className="flex justify-between -mt-3 mr-1 mb-4">
                <div className="mt-2">
                  {or?.paymentMethod === "Combined" ? (
                    <p className="bill">
                      <span className="mb-1 font-semibold bill font-serif text-xs text-gray-700 dark:text-gray-500 block">
                        {t("Paymentmethod")} :{" "}
                        <span className="text-gray-600 bill">
                          {or.paymentMethod}
                        </span>
                      </span>
                      {or?.paymentDetails?.selectPaymentOption_Card !==
                        undefined && (
                        <span className="text-xs bill">
                          {or?.paymentDetails?.selectPaymentOption_Card}:{" "}
                          <span className="font-semibold text-gray-900">
                            {" "}
                            {currency}
                            {parseFloat(
                              String(or?.paymentDetails?.paymentAmount_Card)
                            ).toFixed(2)}
                          </span>
                        </span>
                      )}
                      <br />
                      {or?.paymentDetails?.selectPaymentOption_Cash !==
                        undefined && (
                        <span className="text-xs bill">
                          {or?.paymentDetails?.selectPaymentOption_Cash}:{" "}
                          <span className="font-semibold text-gray-900">
                            {currency}
                            {parseFloat(
                              String(or?.paymentDetails?.paymentAmount_Cash)
                            ).toFixed(2)}
                          </span>
                        </span>
                      )}
                      <br />
                      {or?.paymentDetails?.selectPaymentOption_Credit !==
                        undefined && (
                        <span className="text-xs bill">
                          {or?.paymentDetails?.selectPaymentOption_Credit}:{" "}
                          <span className="font-semibold text-gray-900">
                            {currency}
                            {parseFloat(
                              String(or?.paymentDetails?.paymentAmount_Credit)
                            ).toFixed(2)}
                          </span>
                        </span>
                      )}
                    </p>
                  ) : (
                    <p className="bill">
                      <span className="font-semibold bill font-serif text-xs text-gray-600 dark:text-gray-500 block">
                        {t("Paymentmethod")} :{" "}
                        <span className="text-gray-700 bill">
                          {or.paymentMethod}
                        </span>
                      </span>
                    </p>
                  )}

                  <div className="text-xs bill">
                    {or?.shippingOption && (
                      <>
                        <span className="text-gray-600">
                          {t("ShippingMethodLower")} :
                          <span className="font-semibold text-gray-900">
                            {or?.shippingOption}
                          </span>
                        </span>
                        <br />
                      </>
                    )}
                    <span className="text-gray-600">
                      {t("NoofItems")} :{" "}
                      <span className="font-semibold text-gray-900">
                        {or?.cart?.length}
                      </span>{" "}
                    </span>{" "}
                    <br />
                    <span className="text-gray-600">
                      {t("BillNo")} :{" "}
                      <span className="font-semibold text-gray-900">
                        {" "}
                        {or?.invoice}
                      </span>{" "}
                    </span>{" "}
                    <br />
                    <br />
                    {globalSetting?.vat_number && (
                      <>
                        <span className="text-gray-600">
                          {t("VATNumber")}:{" "}
                          <span className="font-semibold text-gray-900">
                            {" "}
                            {globalSetting?.vat_number}
                          </span>{" "}
                        </span>
                        <br />
                      </>
                    )}
                    <span className="text-gray-600">
                      {t("Date")} :{" "}
                      <span className="font-semibold text-gray-700">
                        {" "}
                        {/* {dayjs(new Date()).format('MMMM D, YYYY h:mm A')} */}
                        {dayjs(new Date()).format("MM/D/YYYY")}
                      </span>{" "}
                    </span>
                  </div>
                </div>

                <div className="mt-2">
                  <h5 className="flex justify-between font-medium text-xs ">
                    <span>{t("GrossTotal")} :</span>{" "}
                    <span className="font-semibold ">
                      {currency}
                      {parseFloat(String(or?.subTotal)).toFixed(2)}
                    </span>
                  </h5>

                  {Number(or?.shippingCost) > 0 && (
                    <h5 className="flex justify-between font-medium text-xs">
                      <span> {t("ShippingCostLower")} :</span>{" "}
                      <span className="font-semibold ">
                        {currency}
                        {parseFloat(String(or?.shippingCost)).toFixed(2)}
                      </span>
                    </h5>
                  )}
                  {Number(or?.discount) > 0 && (
                    <h5 className="flex justify-between font-medium text-xs">
                      <span> {t("DiscountLower")} :</span>{" "}
                      <span className="font-semibold">
                        {currency}
                        {parseFloat(String(or?.discount)).toFixed(2)}
                      </span>
                    </h5>
                  )}
                  <h3 className="flex justify-between font-medium text-xs border-t border-black mt-2">
                    <span> {t("Total")} : </span>
                    <span className="font-semibold ">
                      {currency}
                      {parseFloat(String(or?.total)).toFixed(2)}
                    </span>
                  </h3>
                </div>
              </div>
            </ModalBody>

            <h2 className="mb-2 text-center font-medium text-sm">
              {t("ThankYouMsg")}
            </h2>
          </div>
        ))
      ) : (
        <Fragment>
          {globalSetting?.logo && (
            <img
              className="flex mx-auto"
              src={globalSetting?.logo}
              alt=""
              width={50}
            />
          )}

          <div className="my-1">
            <div className="flex justify-center">
              <h1 className="font-bold text-xl">
                {globalSetting?.company_name}
              </h1>
            </div>

            <ModalBody className="flex flex-col justify-center text-center">
              <span className="flex-row">{globalSetting?.address}</span>

              <span className="flex justify-center">
                {globalSetting?.contact}
              </span>

              {globalSetting?.web_site}
              <br />
              {globalSetting?.email}
            </ModalBody>
          </div>

          <TableContainer className="my-4 rounded-b-lg">
            <Table>
              <TableHeader>
                <tr>
                  <TableCell className="bg-white">
                    <span className="text-xs capitalize text-gray-700">
                      {t("Item")}
                    </span>
                  </TableCell>
                  <TableCell className="text-xs bg-white capitalize text-center text-gray-700">
                    {t("QTY")}
                  </TableCell>
                  <TableCell className="text-xs bg-white capitalize text-right text-gray-700">
                    {t("Amount")}
                  </TableCell>
                </tr>
              </TableHeader>
              <TableBody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 text-serif text-sm">
                {data?.cart?.map((item: CartItem, i: number) => (
                  <TableRow
                    key={i}
                    className="dark:border-gray-700 dark:text-gray-400 bill"
                  >
                    <TableCell className="py-1">
                      <span className="font-normal text-gray-600 bill">
                        {" "}
                        {item.title?.substring(0, 15)}
                      </span>
                    </TableCell>
                    <TableCell className="text-center py-1">
                      <span className="font-bold text-center bill">
                        {" "}
                        {item.quantity}{" "}
                      </span>
                    </TableCell>

                    <TableCell className="text-right py-1">
                      <span className="text-right font-bold text-gray-700 bill">
                        {" "}
                        {currency}
                        {(item.price * item.quantity).toFixed(2)}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <ModalBody>
            <div className="flex justify-between -mt-3 mr-1 mb-4">
              <div className="mt-2">
                {data?.paymentMethod === "Combined" ? (
                  <p className="bill">
                    <span className="mb-1 font-semibold bill font-serif text-xs text-gray-700 dark:text-gray-500 block">
                      {t("Paymentmethod")} :{" "}
                      <span className="text-gray-600 bill">
                        {data.paymentMethod}
                      </span>
                    </span>
                    {data?.paymentDetails?.selectPaymentOption_Card !==
                      undefined && (
                      <span className="text-xs bill">
                        {data?.paymentDetails?.selectPaymentOption_Card}:{" "}
                        <span className="font-semibold text-gray-900">
                          {" "}
                          {currency}
                          {parseFloat(
                            String(data?.paymentDetails?.paymentAmount_Card)
                          ).toFixed(2)}
                        </span>
                      </span>
                    )}
                    <br />
                    {data?.paymentDetails?.selectPaymentOption_Cash !==
                      undefined && (
                      <span className="text-xs bill">
                        {data?.paymentDetails?.selectPaymentOption_Cash}:{" "}
                        <span className="font-semibold text-gray-900">
                          {currency}
                          {parseFloat(
                            String(data?.paymentDetails?.paymentAmount_Cash)
                          ).toFixed(2)}
                        </span>
                      </span>
                    )}
                    <br />
                    {data?.paymentDetails?.selectPaymentOption_Credit !==
                      undefined && (
                      <span className="text-xs bill">
                        {data?.paymentDetails?.selectPaymentOption_Credit}:{" "}
                        <span className="font-semibold text-gray-900">
                          {currency}
                          {parseFloat(
                            String(data?.paymentDetails?.paymentAmount_Credit)
                          ).toFixed(2)}
                        </span>
                      </span>
                    )}
                  </p>
                ) : (
                  <p className="bill">
                    <span className="font-semibold bill font-serif text-xs text-gray-600 dark:text-gray-500 block">
                      {t("Paymentmethod")} :{" "}
                      <span className="text-gray-700 bill">
                        {data.paymentMethod}
                      </span>
                    </span>
                  </p>
                )}

                <div className="text-xs bill">
                  {data?.shippingOption && (
                    <>
                      <span className="text-gray-600">
                        {t("ShippingMethodLower")} :
                        <span className="font-semibold text-gray-900">
                          {data?.shippingOption}
                        </span>
                      </span>
                      <br />
                    </>
                  )}
                  <span className="text-gray-600">
                    {t("NoofItems")} :{" "}
                    <span className="font-semibold text-gray-900">
                      {data?.cart?.length}
                    </span>{" "}
                  </span>{" "}
                  <br />
                  <span className="text-gray-600">
                    {t("BillNo")} :{" "}
                    <span className="font-semibold text-gray-900">
                      {" "}
                      {data?.invoice}
                    </span>{" "}
                  </span>{" "}
                  <br />
                  <br />
                  {globalSetting?.vat_number && (
                    <>
                      <span className="text-gray-600">
                        {t("VATNumber")}:{" "}
                        <span className="font-semibold text-gray-900">
                          {" "}
                          {globalSetting?.vat_number}
                        </span>{" "}
                      </span>
                      <br />
                    </>
                  )}
                  <span className="text-gray-600">
                    {t("Date")} :{" "}
                    <span className="font-semibold text-gray-700">
                      {" "}
                      {/* {dayjs(new Date()).format('MMMM D, YYYY h:mm A')} */}
                      {dayjs(new Date()).format("MM/D/YYYY")}
                    </span>{" "}
                  </span>
                </div>
              </div>

              <div className="mt-2">
                <h5 className="flex justify-between font-medium text-xs ">
                  <span>{t("GrossTotal")} :</span>{" "}
                  <span className="font-semibold ">
                    {currency}
                    {parseFloat(String(data?.subTotal)).toFixed(2)}
                  </span>
                </h5>

                {Number(data?.shippingCost) > 0 && (
                  <h5 className="flex justify-between font-medium text-xs">
                    <span> {t("ShippingCostLower")} :</span>{" "}
                    <span className="font-semibold ">
                      {currency}
                      {parseFloat(String(data?.shippingCost)).toFixed(2)}
                    </span>
                  </h5>
                )}
                {Number(data?.discount) > 0 && (
                  <h5 className="flex justify-between font-medium text-xs">
                    <span> {t("DiscountLower")} :</span>{" "}
                    <span className="font-semibold">
                      {currency}
                      {parseFloat(String(data?.discount)).toFixed(2)}
                    </span>
                  </h5>
                )}
                <h3 className="flex justify-between font-medium text-xs border-t border-black mt-2">
                  <span> {t("Total")} : </span>
                  <span className="font-semibold ">
                    {currency}
                    {parseFloat(String(data?.total)).toFixed(2)}
                  </span>
                </h3>
              </div>
            </div>
          </ModalBody>

          <h2 className="mb-2 text-center font-medium text-sm">
            {t("ThankYouMsg")}
          </h2>
        </Fragment>
      )}
    </div>
  );
};

export default InvoiceForPrint;