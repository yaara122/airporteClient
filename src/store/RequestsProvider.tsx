import React, { useContext, useEffect } from "react";
import requestItem from "../models/request";
import UserContext from "./userProvider";
import {
  postRequest,
  getUserRequests,
  getAllRequests,
  setRequestStatus,
} from "../api/api";

type requestContextObject = {
  userRequests: requestItem[] | null;
  openRequests: requestItem[] | null;
  addRequest: (item: requestItem) => void;
  updateRequest: (data: any) => void;
  getOpenRequests: (type?: string | null) => void;
  generalGetRequests: (data: any) => Promise<requestItem[] | undefined>;
};

const RequestContext = React.createContext<requestContextObject>({
  userRequests: null,
  openRequests: null,
  addRequest: (item: requestItem) => {},
  updateRequest: (data: any) => {},
  getOpenRequests: (type?: string | null) => {},
  generalGetRequests: async (data: any) => [],
});

export const RequestsProvider: React.FC<{ children: React.ReactNode }> = (
  props,
) => {
  const userCtx = useContext(UserContext);
  const [userRequests, setUserRequests] = React.useState<requestItem[] | null>(
    null,
  );
  const [openRequests, setOpenRequests] = React.useState<requestItem[] | null>(
    null,
  );

  // maybe do make it generral with params like in the server and itll reurn arry of requestItems...
  const getUserRequestsHandler = async () => {
    let token = {
      headers: {
        Authorization: "Bearer " + userCtx.user?.auth,
      },
    };
    try {
      const { data } = await getUserRequests(token);

      if (data.length !== 0) {
        let requestsList: requestItem[] = data.map((request: any) => {
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
        setUserRequests(requestsList);
      }
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  const getOpenRequestsHandler = async (inputType?: string | null) => {
    let token = {
      headers: {
        Authorization: "Bearer " + userCtx.user?.auth,
      },
      params: {
        status: "בהמתנה",
        type: inputType,
      },
    };
    try {
      const { data } = await getAllRequests(token);
      let requestsList: requestItem[] | null = null;

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
      setOpenRequests(requestsList);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  useEffect(() => {
    if (userCtx.user) {
      getUserRequestsHandler();
      if (userCtx.user?.role === "admin") {
        getOpenRequestsHandler();
      }
    }
  }, [userCtx.user?.auth]);

  const addRequestHandler = async (item: requestItem) => {
    console.log("in add request");
    let token = {
      headers: {
        Authorization: "Bearer " + userCtx.user?.auth,
      },
    };

    try {
      const response = await postRequest(item, token);
      console.log(response);
      if (response.status === 201) {
        getUserRequestsHandler();
        if (userCtx.user?.role === "admin") {
          getOpenRequestsHandler();
        }
      }
    } catch (error) {
      console.error("Error posting request:", error);
    }
  };

  const updateRequestStatusHandler = async (data: any) => {
    let token = {
      headers: {
        Authorization: "Bearer " + userCtx.user?.auth,
      },
      params: {
        requestId: data.requestId,
      },
    };

    try {
      const response = await setRequestStatus(data, token);
      if (response.status === 200) {
        getUserRequestsHandler();
        if (userCtx.user?.role === "admin") {
          getOpenRequestsHandler();
        }
      }
    } catch (error) {
      console.error("Error updating request:", error);
    }
  };

  const getRequestsGeneralHandler = async (params: any) => {
    let token = {
      headers: {
        Authorization: "Bearer " + userCtx.user?.auth,
      },
      params: {
        status: params.status,
        type: params.inputType,
        limit: params.limit,
        skip: params.skip,
        startSerchDate: params.startSerchDate,
        endSerchDate: params.endSerchDate,
      },
    };

    console.log(token);

    try {
      const { data } = await getAllRequests(token);
      console.log(data)
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
      // else{
      //   requestsList = []
      // }
      return requestsList;
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  const requestContext: requestContextObject = {
    userRequests: userRequests,
    openRequests: openRequests,
    addRequest: addRequestHandler,
    updateRequest: updateRequestStatusHandler,
    getOpenRequests: getOpenRequestsHandler,
    generalGetRequests: getRequestsGeneralHandler,
  };

  return (
    <RequestContext.Provider value={requestContext}>
      {props.children}
    </RequestContext.Provider>
  );
};

export default RequestContext;
