/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type LollyInput = {
  colorTop: string,
  colorMiddle: string,
  colorBottom: string,
  recipient: string,
  message: string,
  sender: string,
  lollyPath: string,
};

export type CreateLollyMutationVariables = {
  lolly: LollyInput,
};

export type CreateLollyMutation = {
  createLolly:  {
    __typename: "Event",
    result: string,
  } | null,
};

export type DeleteLollyMutationVariables = {
  lollyId: string,
};

export type DeleteLollyMutation = {
  deleteLolly:  {
    __typename: "Event",
    result: string,
  } | null,
};

export type GetLolliesQuery = {
  getLollies:  Array< {
    __typename: "Lolly",
    id: string,
    colorTop: string,
    colorMiddle: string,
    colorBottom: string,
    recipient: string,
    message: string,
    sender: string,
    lollyPath: string,
  } > | null,
};
