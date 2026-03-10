import React, { useContext, useEffect, useState } from "react";
import requestItem from "../models/request";
import UserContext from "./userProvider";
import { postRequest, getRequests } from "../api/api";

type requestContextObject = {
  requests: requestItem[] | null;
  addRequest: (item: requestItem) => void;
  editRequest: (id: string) => void;
};

const RequestContext = React.createContext<requestContextObject>({
  requests: null,
  addRequest: (item: requestItem) => {},
  editRequest: (id: string) => {},
});

export const RequestsProvider: React.FC<{ children: React.ReactNode }> = (
  props,
) => {
  const userCtx = useContext(UserContext);
  const [requests, setRequests] = React.useState<requestItem[] | null>(null);

  const getRequestsHandler = async () => {
    // make it more generic with options to get by user, examiner etc.
    try {
      const { data } = await getRequests();

      if (data.length !== 0) {
        let requestsList: requestItem[] = data.map((request: any) => {
          return {
            title: request.title,
            type: request.type,
            description: request.description,
            status: request.status,
            creatorName: request.creatore.userName,
          };
        });
        setRequests(requestsList);
      }
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  useEffect(() => {
    getRequestsHandler();
  }, []);

  const addRequestHandler = async (item: requestItem) => {
    let token = {
      headers: {
        Authorization: "Bearer " + userCtx.user?.auth,
      },
    };

    try {
      const response = await postRequest(item, token);
      if (response.status === 201) {
        getRequestsHandler();
      }
    } catch (error) {
      console.error("Error posting request:", error);
    }
  };

  const editRequestHandler = (id: string) => {};

  const requestContext: requestContextObject = {
    requests: requests,
    addRequest: addRequestHandler,
    editRequest: editRequestHandler,
  };

  return (
    <RequestContext.Provider value={requestContext}>
      {props.children}
    </RequestContext.Provider>
  );
};

export default RequestContext;
