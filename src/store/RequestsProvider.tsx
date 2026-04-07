import React, { useContext, useCallback } from "react";
import {
  postRequest,
  getUserRequests,
  getAllRequestsAdmin,
  setRequestStatus,
} from "../api/api";
import requestItem from "../models/request";
import UserContext from "./userProvider";

type requestContextObject = {
  addRequest: (item: requestItem) => void;
  updateRequest: (data: any) => void;
  getCurrentUserRequests: (
    type?: string | null,
  ) => Promise<requestItem[] | undefined>;
  generalGetRequestsAdmin: (params?: any) => Promise<requestItem[] | undefined>;
};

const RequestContext = React.createContext<requestContextObject>({
  addRequest: (item: requestItem) => {},
  updateRequest: (data: any) => {},
  getCurrentUserRequests: async (type?: string | null) => [],
  generalGetRequestsAdmin: async (params?: any) => [],
});

export const RequestsProvider: React.FC<{ children: React.ReactNode }> = (
  props,
) => {
  const userCtx = useContext(UserContext);

  const getUserRequestsHandler = useCallback(async () => {
    let headers = {
      headers: {
        Authorization: "Bearer " + userCtx.user?.auth,
      },
    };
    try {
      const { data } = await getUserRequests(headers);
      let requestsList: requestItem[] = [];
      if (data.length !== 0) {
        requestsList = data.map((request: any) => {
          return {
            title: request.title,
            type: request.type,
            description: request.description,
            status: request.status,
            creatorName: request.creatore.userName,
            createdAt: new Date(request.createdAt).toLocaleDateString(),
            examinerName: request.examiner?.userName
              ? request.examiner.userName
              : null,
            declineReason: request.declineReason ? request.declineReason : null,
            id: request._id,
          };
        });
      }
      return requestsList;
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  }, [userCtx.user]);

  const addRequestHandler = async (newItem: requestItem) => {
    let headers = {
      headers: {
        Authorization: "Bearer " + userCtx.user?.auth,
      },
    };
    try {
      const response = await postRequest(newItem, headers);
      if (response.status !== 201) {
        throw new Error();
      }
      alert("הבקשה נוצרה בהצלחה!")
    } catch (error) {
      console.error("Error posting request:", error);
    }
  };

  const updateRequestStatusHandler = async (updateRequestData: any) => {
    // possiable updateRequestData = {
    //       requestId: props.request.id,
    //       status: "סורבה",
    //       declineReason: declinceRef.current?.value,
    //     };

    let headers = {
      headers: {
        Authorization: "Bearer " + userCtx.user?.auth,
      },
      params: {
        requestId: updateRequestData.requestId,
      },
    };

    try {
      const response = await setRequestStatus(updateRequestData, headers);
      if (response.status !== 200) {
        throw new Error();
      }
    } catch (error) {
      console.error("Error updating request:", error);
    }
  };

  const getRequestsGeneralHandler = async (paramsInput?: any) => {
    let headers = {
      headers: {
        Authorization: "Bearer " + userCtx.user?.auth,
      },
      params: paramsInput ? paramsInput : undefined,
      //possiable params: {
      //   status: params.status,
      //   type: params.inputType,
      //   limit: params.limit,
      //   skip: params.skip,
      //   startSerchDate: params.startSerchDate,
      //   endSerchDate: params.endSerchDate,
      // },
    };

    try {
      const { data } = await getAllRequestsAdmin(headers);
      let requestsList: requestItem[] = [];

      if (data.length !== 0) {
        requestsList = data.map((request: any) => {
          return {
            title: request.title,
            type: request.type,
            description: request.description,
            status: request.status,
            creatorName: request.creatore.userName,
            createdAt: new Date(request.createdAt).toLocaleDateString(),
            id: request._id,
            examinerName: request.examiner?.userName
              ? request.examiner.userName
              : null,
            declineReason: request.declineReason ? request.declineReason : null,
          };
        });
      }
      return requestsList;
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  const requestContext: requestContextObject = {
    addRequest: addRequestHandler,
    updateRequest: updateRequestStatusHandler,
    getCurrentUserRequests: getUserRequestsHandler,
    generalGetRequestsAdmin: getRequestsGeneralHandler,
  };

  return (
    <RequestContext.Provider value={requestContext}>
      {props.children}
    </RequestContext.Provider>
  );
};

export default RequestContext;
