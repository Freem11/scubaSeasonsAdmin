
import { useContext, useEffect, useState } from "react";

import { SelectedTripRequestContext } from "../../contexts/tripRequestEvals/selectedTripRequestContext";
import { deleteItinerary, getItineraryByIdRequest, updateItinerary } from "../../apicalls/supabaseCalls/itinerarySupabaseCalls";
import { TripRequest } from "../../entities/tripRequest";
import {  approvedItineraryRequest, deleteItineraryRequest, getAllItineraryRequest } from "../../apicalls/supabaseCalls/itineraryRequestSupabaseCalls";
import { TripRequestsContext } from "../../contexts/tripRequestEvals/tripRequestContext";
import { UserProfileContext } from "../../contexts/userProfileContext";
import TripRequestEvalView from "./view";
import { Form } from "./form";

export default function TripRequestEval() {
    const { selectedTripRequest, setSelectedTripRequest } = useContext(SelectedTripRequestContext)
    const { setTripRequests} = useContext(TripRequestsContext)
    const {profile} = useContext(UserProfileContext)
    const [oldTripValues, setOldTripValues] = useState<TripRequest | null>(null)

    const validateTripRequest = async (id: number | undefined, formData: Form) => {
        await updateItinerary({
            id: formData.id || id,
            startDate: formData.startDate,
            endDate: formData.endDate,
            tripName: formData.tripName,
            siteList: formData.siteList,
            description: formData.description,
            price: formData.price,
            BookingPage: formData.BookingPage,
            created_at: new Date(),
            deleted_at: null,
            requestType: formData.requestType,
            OriginalItineraryID: formData.OriginalItineraryID
        });

        await approvedItineraryRequest(id || formData.id as number, profile?.UserID);

        if (id || formData.id){
            await deleteItineraryRequest(id || formData.id as number);
            await deleteItinerary(formData);
        }
        const updatedTripRequests = await getAllItineraryRequest();
        setTripRequests(updatedTripRequests.data);
        setSelectedTripRequest(null);
    }

    const rejectTripRequest = async (id: number | undefined) => {
        if (id) {
            await deleteItineraryRequest(id);
            const updatedTripRequests = await getAllItineraryRequest();
            setTripRequests(updatedTripRequests.data);
        }
    }

    useEffect(() => {
        getOldTripRequest(selectedTripRequest?.OriginalItineraryID);
    },[selectedTripRequest]);

    const getOldTripRequest = async (id: number | undefined) => {
        if(id){
            const data = await getItineraryByIdRequest(id);
            setOldTripValues(data[0]);
        }
    }

    useEffect(() => {
        return () => {
            setSelectedTripRequest(null)
        }
    }, [setSelectedTripRequest]);

    return (
        <TripRequestEvalView
            validateTripRequest={validateTripRequest}
            rejectTripRequest={rejectTripRequest}
            record={selectedTripRequest}
            updatedValues={{
                id: selectedTripRequest?.id,
                requestType: selectedTripRequest?.requestType,
                startDate: selectedTripRequest?.startDate,
                endDate: selectedTripRequest?.endDate,
                tripName: selectedTripRequest?.tripName,
                siteList: selectedTripRequest?.siteList,
                description: selectedTripRequest?.description,
                price: selectedTripRequest?.price,
                BookingPage: selectedTripRequest?.BookingPage,
                OriginalItineraryID: selectedTripRequest?.OriginalItineraryID
            }}
            oldValues={{
                id: oldTripValues?.id,
                startDate: oldTripValues?.startDate,
                endDate: oldTripValues?.endDate,
                tripName: oldTripValues?.tripName,
                siteList: oldTripValues?.siteList,
                description: oldTripValues?.description,
                price: oldTripValues?.price,
                BookingPage: oldTripValues?.BookingPage,
                OriginalItineraryID: oldTripValues?.OriginalItineraryID,
                requestType: oldTripValues?.requestType
            }}
        />
    )
}