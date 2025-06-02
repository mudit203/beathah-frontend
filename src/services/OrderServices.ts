import requests from "./httpService";

const OrderServices = {
  getAllOrders: async ({
    body,
    headers,
    customerName,
    status,
    page = 1,
    limit = 8,
    day,
    // source,
    method,
    startDate,
    endDate,
    // download = "",
  }: any): Promise<any> => {
    const searchName = customerName !== null ? customerName : "";
    const searchStatus = status !== null ? status : "";
    const searchDay = day !== null ? day : "";
    // const searchSource = source !== null ? source : "";
    const searchMethod = method !== null ? method : "";
    const startD = startDate !== null ? startDate : "";
    const endD = endDate !== null ? endDate : "";

    return requests.get(
      `/orders?customerName=${searchName}&status=${searchStatus}&day=${searchDay}&page=${page}&limit=${limit}&startDate=${startD}&endDate=${endD}&method=${searchMethod}`,
      body,
      headers
    );
  },

  getAllOrdersTwo: async ({ invoice, body, headers }: any): Promise<any> => {
    const searchInvoice = invoice !== null ? invoice : "";
    return requests.get(`/orders/all?invoice=${searchInvoice}`, body, headers);
  },

  getRecentOrders: async ({
    page = 1,
    limit = 8,
    startDate = "1:00",
    endDate = "23:59",
  }: any): Promise<any> => {
    return requests.get(
      `/orders/recent?page=${page}&limit=${limit}&startDate=${startDate}&endDate=${endDate}`
    );
  },

  getOrderCustomer: async (id: any, body: any): Promise<any> => {
    return requests.get(`/orders/customer/${id}`, body);
  },

  getOrderById: async (id: any, body: any): Promise<any> => {
    return requests.get(`/orders/${id}`, body);
  },

  updateOrder: async (id: any, body: any, headers: any): Promise<any> => {
    return requests.put(`/orders/${id}`, body, headers);
  },

  deleteOrder: async (id: any): Promise<any> => {
    return requests.delete(`/orders/${id}`);
  },

  getDashboardOrdersData: async ({
    page = 1,
    limit = 8,
    endDate= "23:59",
  }: any): Promise<any> => {
    return requests.get(
      `/orders/dashboard?page=${page}&limit=${limit}&endDate=${endDate}`
    );
  },

  getDashboardAmount: async (): Promise<any> => {
    return requests.get("/orders/dashboard-amount");
  },

  getDashboardCount: async (): Promise<any> => {
    return requests.get("/orders/dashboard-count");
  },

  getDashboardRecentOrder: async ({ page = 1, limit = 8 }: any): Promise<any> => {
  return requests.get(
    `/orders/dashboard/recent-orders?page=${page}&limit=${limit}`
  );
},

  getBestSellerProductChart: async (): Promise<any> => {
    return requests.get("/orders/best-seller/chart");
  },

  //for sending email invoice to customer
  sendEmailInvoiceToCustomer: async (body: any): Promise<any> => {
    return requests.post("/order/customer/invoice", body);
  },
};

export default OrderServices;
