// import { FormValidationRules } from "../../forms/form";

export interface Form {
  id?: number
  requestType?: string
  tripName?: string
  siteList?: number[]
  startDate?: string
  endDate?: string
  BookingPage?: string
  description?: string
  price?: string
  shopId?: number
  created_at?: string
  OriginalItineraryID?: number
}

