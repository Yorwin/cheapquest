import { useCallback } from "react";

// Hook mejorado con mejor manejo de errores
export const useVideoFrame = () => {
    const extractVideoFrame = useCallback((videoSrc: string, timeInSeconds: number = 1): Promise<string> => {
        return new Promise((resolve, reject) => {
            const video = document.createElement('video');
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            // Configuración mejorada
            video.crossOrigin = 'anonymous';
            video.muted = true;
            video.preload = 'metadata'; // Solo metadatos, no todo el video

            let hasResolved = false; // Evitar múltiples resoluciones

            const cleanup = () => {
                video.removeEventListener('loadedmetadata', onLoadedMetadata);
                video.removeEventListener('seeked', onSeeked);
                video.removeEventListener('error', onError);
                video.removeEventListener('loadeddata', onLoadedData);
            };

            const onLoadedMetadata = () => {
                console.log('Metadatos cargados:', {
                    duration: video.duration,
                    videoWidth: video.videoWidth,
                    videoHeight: video.videoHeight
                });

                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;

                // Asegurar que el tiempo esté dentro de la duración
                const safeTime = Math.min(timeInSeconds, video.duration - 1);
                video.currentTime = Math.max(0, safeTime);
            };

            const onSeeked = () => {
                if (hasResolved) return;

                try {
                    ctx?.drawImage(video, 0, 0);
                    const dataURL = canvas.toDataURL('image/png');
                    hasResolved = true;
                    cleanup();
                    resolve(dataURL);
                } catch (error) {
                    console.error('Error al dibujar en canvas:', error);
                    cleanup();
                    reject(new Error('No se pudo capturar el frame'));
                }
            };

            const onError = (e: any) => {
                console.error('Error del video:', e);
                cleanup();
                reject(new Error(`Error cargando video: ${video.error?.message || 'Error desconocido'}`));
            };

            const onLoadedData = () => {
                console.log('Datos del video cargados');
            };

            // Event listeners
            video.addEventListener('loadedmetadata', onLoadedMetadata);
            video.addEventListener('seeked', onSeeked);
            video.addEventListener('error', onError);
            video.addEventListener('loadeddata', onLoadedData);

            // Timeout de seguridad
            setTimeout(() => {
                if (!hasResolved) {
                    cleanup();
                    reject(new Error('Timeout: El video tardó demasiado en cargar'));
                }
            }, 10000); // 10 segundos

            video.src = videoSrc;
            video.load();
        });
    }, []);

    return { extractVideoFrame };
};