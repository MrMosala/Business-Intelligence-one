import { useState, useCallback, useEffect } from 'react';
import { uploadFiles, unarchiveInsight as unarchiveInsight_api, getInsights, getInsight, getTodaysInsights, getPreviousInsights, processFile, getArchivedInsights, getArchivedInsight } from '../utils/api';
import { File as Files, Insight, UploadResult, FileResult } from '@/types/datatypes';
import { ApiError } from '../utils/api';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';


export function useInsightUpload(insightId: string | undefined = undefined, archivedInsightId: string | undefined = undefined) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [uploadResult, setUploadResult] = useState<UploadResult | null>(null);
    const [todaysInsights, setTodaysInsights] = useState<Insight | null>(null);
    const [previousInsights, setPreviousInsights] = useState<Insight[]>([]);
    const [insights, setInsights] = useState<Insight[]>([]);
    const [archivedInsights, setArchivedInsights] = useState<Insight[]>([]);
    const [currentInsight, setCurrentInsight] = useState<Insight | null>(null);
    const [createInsight, setCreateInsight] = useState(false);
    const [archivedInsight, setArchivedInsight] = useState<Insight | null>(null);
    const router = useRouter();

    const resetError = useCallback(() => {
        setError(null);
    }, []);

    const handleApiError = useCallback((error: unknown) => {
        if (error instanceof ApiError) {
            if (error.message.includes('No insights found for today')) {
                 
            } else {
            Swal.fire({
                title: 'Error',
                text: error.message,
                icon: 'error',
                confirmButtonColor: '#ff5722',
            });
            }
           // setError(error.message);
        } else if (error instanceof Error) {
            Swal.fire({
                title: 'Error',
                text: error.message,
                icon: 'error',
                confirmButtonColor: '#ff5722',
            });
           // setError(error.message);
        } else {
            Swal.fire({
                title: 'Error',
                text: 'An unknown error occurred',
                icon: 'error',
                confirmButtonColor: '#ff5722',
            });
            setError('An unknown error occurred');
        }
        setIsLoading(false);
        console.error(error);
    }, []);

    const fetchTodaysInsights = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const fetchedInsights = await getTodaysInsights();
            setTodaysInsights(fetchedInsights);
        } catch (err) {
            handleApiError(err);
        } finally {
            setIsLoading(false);
        }
    }, [handleApiError]);

    const fetchPreviousInsights = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const fetchedInsights = await getPreviousInsights();
            setPreviousInsights(fetchedInsights);
        } catch (err) {
            handleApiError(err);
        } finally {
            setIsLoading(false);
        }
    }, [handleApiError]);

    const fetchArchivedInsights = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const fetchedInsights = await getArchivedInsights();
            setArchivedInsights(fetchedInsights);
        } catch (err) {
            handleApiError(err);
        } finally {
            setIsLoading(false);
        }
    }, [handleApiError]);

    const fetchArchivedInsight = useCallback(async (id: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const fetchedInsight = await getArchivedInsight(id);
            setArchivedInsight(fetchedInsight);
        } catch (err) {
            handleApiError(err);
        } finally {
            setIsLoading(false);
        }
    }, [handleApiError]);


    const unarchiveInsight = useCallback(async (id: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await unarchiveInsight_api(id);
            if (result?.message) {
                await fetchArchivedInsights();
                await fetchPreviousInsights();
                router.push(`/insights/${id}`);
            }
        } catch (err) {
            handleApiError(err);
        } finally {
            setIsLoading(false);
        }
    }, [fetchArchivedInsights, fetchPreviousInsights, handleApiError]);

    const fetchInsight = useCallback(async (id: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const fetchedInsight = await getInsight(id);
            setCurrentInsight(fetchedInsight);
        } catch (err) {
            handleApiError(err);
        } finally {
            setIsLoading(false);
        }
    }, [handleApiError]);

    const uploadFilesForInsight = useCallback(async (files: File[]) => {
        setIsLoading(true);
        setError(null);
        debugger
        try {
            if (insightId) {
                const result = await uploadFiles(files, insightId, createInsight);
                setUploadResult(result);
                await fetchInsight(insightId);
            } else {
                const result = await uploadFiles(files, undefined, createInsight);
                setUploadResult(result);
                await fetchTodaysInsights();
            }

        } catch (err) {
            handleApiError(err);
        } finally {
            setIsLoading(false);
        }
    }, [fetchInsight, fetchTodaysInsights, handleApiError, insightId]);


    const processInsightFile = useCallback(async (fileId: string, insightId: string) => {
        setError(null);
        try {
            const result = await processFile(fileId, insightId);
            if (result?.message) {
                if (insightId) {
                    await fetchInsight(insightId);
                } else {
                    await fetchTodaysInsights();
                }
                await fetchTodaysInsights();
            }
        } catch (err) {
            handleApiError(err);
        }
    }, [fetchInsight, fetchTodaysInsights, handleApiError]);

    useEffect(() => {
        if (insightId) {
            fetchInsight(insightId)
        } else if (archivedInsightId) {
             
            fetchArchivedInsight(archivedInsightId)

            Swal.fire({
                title: 'Unarchive Insight?',
                text: "Do you want to unarchive this insight?",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, unarchive it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    unarchiveInsight(archivedInsightId);
                }  
            });
        } else {
            fetchTodaysInsights();
        }

        fetchPreviousInsights();
        fetchArchivedInsights();
    }, [fetchInsight, fetchPreviousInsights, fetchTodaysInsights, insightId, archivedInsightId]);

    return {
        isLoading,
        error,
        uploadResult,
        insights,
        currentInsight,
        uploadFilesForInsight,
        fetchPreviousInsights,
        fetchTodaysInsights,
        previousInsights,
        todaysInsights,
        fetchInsight,
        processInsightFile,
        resetError,
        createInsight,
        setCreateInsight,
        archivedInsights,
        archivedInsight,
        unarchiveInsight,
        fetchArchivedInsight
    };
}