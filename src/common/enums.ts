export enum RoleCode {
  FrontDesk = "frontDesk",
  Admin = "admin",
  SuperAdmin = "superAdmin",
}

export enum ValidationSource {
  BODY = "body",
  HEADER = "headers",
  QUERY = "query",
  PARAM = "params",
}

export enum Status {
  Active = "active",
  InActive = "inActive",
}

export enum TransactionTypes {
  Expense = "expense",
  FacilityFee = "facility_fee",
}

export enum ResponseStatus {
  Failed = "failed",
  Success = "success",
}

export enum StatusCode {
  Unauthorized = 403,
  Created = 201,
  Ok = 200,
  BadRequest = 400,
}

export enum AptTypes {
  OneBedroomApt = "one_bedroom",
  TwoBedroomApt = "two_edrooms",
  ThreeBedroomApt = "three_edrooms",
  FourBedroomApt = "four_edrooms",
}

export enum RentTypes {
  Airbnb = "airbnb",
  Rent = "rent",
  Lease = "lease",
}

export enum ResponseType {
  Welcome = "welcome",
  WelcomeBack = "welcome_back",
  NumberReq = "number_request",
  NameReq = "name_request",
  Services = "services",
  ThankYou = "thank_you",
}

export enum WalletType {
  CreditCard = "creditcard",
  PettyCash = "petty_cash",
  FuelCard = "fuel_card",
  Salary = "salary",
}
