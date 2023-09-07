import { FC, useState, ReactElement, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

import { useTranslation } from 'next-i18next';

import { getEndpoint } from '@/utils/app/api';
import toast from 'react-hot-toast';
import {
    Card,
    CardContent,
    CardFooter,
} from "@/shadecn/components/ui/card";

interface ItineraryModalProps {
    show: boolean;
    handleClose: () => void;
}

export const ItineraryModal: FC<ItineraryModalProps> = ({ show, handleClose }) => {

    const convertToJsonArray = (input: string): string => {
        const jsonArray = input.split('}{').join('},{');
        return `[${jsonArray}]`;
    }

    const { t } = useTranslation('itinerary');

    const [activitiesElement, setActivitiesElement] = useState<ReactElement | null>(null);


    useEffect(() => {
        if (!show) return;
        const query = "27a28d73-7cdf-4a94-a2e6-34879ee2d0e6";
        const endpoint = getEndpoint(null, 'activities');

        fetch(`${endpoint}?itineraryId=${encodeURIComponent(query)}`, {
            method: 'GET',
        }).then(response => {
            if (!response.ok) {
                toast.error(response.statusText);
                return;
            }
            const data = response.body;
            if (!data) {
                return;
            }

            let done = false;
            const reader = data.getReader();
            function processText({ value, done: doneReading }: ReadableStreamReadResult<Uint8Array>) {
                done = doneReading;

                const decoder = new TextDecoder();
                let decodedText = decoder.decode(value);
                const json = JSON.parse(convertToJsonArray(decodedText));

                if (json.length > 0) {
                    const activities: string[] = json[0].activities;
                    const cost: number = json[0].totalCost;
                    localStorage.setItem('tripPayload', decodedText);
                    setActivitiesElement(
                        <Card className="rounded-2xl bg-transparent">
                            <CardContent>
                                <div className="pl-2 pt-2 text-sm text-black dark:text-neutral-200">
                                    {activities.map((activity, index) => (
                                        <p key={index}>{activity}<br /></p>
                                    ))}
                                </div>
                            </CardContent>

                            <CardFooter>
                                <div className="text-lg pl-2 pb-4 font-bold text-black dark:text-neutral-200">
                                    <p> {t('Total Cost: ')}$ {cost}</p>
                                </div>
                            </CardFooter>
                        </Card>
                    );
                }
                if (!done) {
                    reader.read().then(processText);
                }
            }
            reader.read().then(processText);
        });
    }, [show]);

    if (!show) return (<></>);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="fixed inset-0 z-10 overflow-hidden">
                <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                    <div
                        className="hidden sm:inline-block sm:h-screen sm:align-middle"
                        aria-hidden="true"
                    />

                    <div
                        className="dark:border-netural-400 inline-block max-h-[400px] transform overflow-y-auto rounded-lg border border-gray-300 bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all dark:bg-[#202123] sm:my-8 sm:max-h-[600px] sm:w-full sm:max-w-lg sm:p-6 sm:align-middle"
                        role="dialog"
                    >
                        <div className="text-lg pb-4 font-bold text-black dark:text-neutral-200">
                            {t('Your Greece Itinerary')}
                        </div>

                        {activitiesElement}

                        <button
                            type="button"
                            className="px-4 py-2 mt-6 border rounded-lg shadow border-neutral-500 text-neutral-900 hover:bg-neutral-100 focus:outline-none dark:border-neutral-800 dark:border-opacity-50 dark:bg-white dark:text-black dark:hover:bg-neutral-300"
                            onClick={() => {
                                window.location.href = "/manage";
                                handleClose();
                            }}
                        >
                            {t('Book')}
                        </button>
                        <span className='pr-2'></span>

                        <button
                            type="button"
                            className="px-4 py-2 mt-6 border rounded-lg shadow border-neutral-500 text-neutral-900 hover:bg-neutral-100 focus:outline-none dark:border-neutral-800 dark:border-opacity-50 dark:bg-white dark:text-black dark:hover:bg-neutral-300"
                            onClick={() => {
                                handleClose();
                            }}
                        >
                            {t('Dismiss')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ItineraryModal;
