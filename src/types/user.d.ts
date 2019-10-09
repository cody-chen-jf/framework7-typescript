interface User {
  id: number,
  submissionDate: number,
  formType: string,
  formTypeCode: string,
  formNumber: string,
  formStatus: string,
  mobileFormStatusDesc: string,
  formStatusCode: string,
  requestDesc: string,
  applicantID: string,
  applicantDisplayName: string,
  createdBy: string,
  createdByDisplayName: string,
  creator: string,
  createdDate: number,
  assetType: string
  totalAmntUSD: number,
  finconStatus: null,
  mobileFinconStatus: string,
  nextHandler: string,
  preApprover: string,
  approvalHistory: string,
  approvalList: string,
  finconType: string,
  disposalType: string,
  expectedApproveDate: string,
  charterType: string,
  trade: string,
  charterPeriod: string,
  budgetedType: string
}

export interface UserData extends ListQuery {
  content: Array<User>
}
