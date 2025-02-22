export type TripRequest = {
    id: number
    BookingPage?: string
    description: string
    price: string
    requestType: string
    shopId: number
    siteList: number[]
    tripName: string
    created_at: string
    startDate?: string
    endDate?: string
    OriginalItineraryID?: number
  };