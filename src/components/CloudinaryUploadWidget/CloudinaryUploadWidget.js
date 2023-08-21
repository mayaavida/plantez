import react, { useEffect, useRef } from 'react';

function CloudinaryUploadWidget() {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: 'a4lmb63a',
            uploadPreset: 'uokwyxqd'
            
        }, function(error, result) {
            console.log(result);
        });
    }, [])
    return (
        <button onClick={() => widgetRef.current.open()}>
            Upload Button
        </button>
    )
};

export default CloudinaryUploadWidget;