import { Message } from '@/types/chat';

export const callFunction = (functionCall: string): Message => {
    const returnFunctionData: { [key: string]: string } = {
        "getDepartureAirlineOptions": "American Airlines - Time: 8:10am  Price: $1250, flight id: AA123\\n" +
            "American Airlines - Time: 5:25pm  Price: $830, flight id: A458\\n" +
            "Delta - Time: 3:30pm  Price: $700, flight id: D398\\n",
        "chooseDepartureFlight": "Flight AA123: 8:10am - $1250.\\n",
        "getReturnAirlineOptions": "JetBlue - Time: 10:20am  Price: $1400, flight id: JB345\\n" +
            "Spirit Airlines - Time: 7:30pm  Price: $950, flight id: SP678\\n" +
            "Alaska Airlines - Time: 4:45pm  Price: $800, flight id: AK890\\n",
        "chooseReturnFlight": "Flight JB345:  2:00pm - $800.\\n",
        "retrieveRestaurantOptions": "McDonalds - Rating: 4.5 stars, Price: $10,\\n" +
            "Burger King - Rating: 4.0 stars, Price: $8,\\n" +
            "Wendy's - Rating: 4.0 stars, Price: $9,\\n",
        "chooseRestaurant": "Restaurant: McDonalds: 12:00am, Price: $10,\\n",
        "retrieveRentalCarOptions": "Enterprise - Rating: 4.5 stars, Price: $700,\\n" +
            "Hertz - Rating: 4.0 stars, Price: $650,\\n" +
            "Avis - Rating: 4.0 stars, Price: $600,\\n",
        "chooseRentalCar": "Rental Car: Enterprise, Rating: 4.5 stars, Price: $700,\\n",
        "retrieveActivityOptions": "Hiking - Rating: 4.5 stars, Price: $20,\\n" +
            "Museum - Rating: 4.0 stars, Price: $15,\\n" +
            "Beach - Rating: 4.0 stars, Price: Free,\\n",
        "chooseActivity": "Activity: Hiking: 10:00am, Price: $20, \\n",
        "getHotelOptions": "\\n" +
            "Marriott - Rating: 4.0 stars, Price: $1400,\\n" +
            "Holiday Inn - Rating: 4.0 stars, Price: $1200,\\n",
        "chooseHotel": "Hotel: Hilton, Rating: 4.5 stars, Price: $1500,\\n",
    };
    return { role: 'function', name: functionCall, content: returnFunctionData[functionCall] };
}
