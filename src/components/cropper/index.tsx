import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import './index.scss';
import { useEffect, useRef, useState } from 'react';
import Card from '../card';
import { uploadPhotos } from '@/src/request/api';
import { usePhotoStore } from '@/src/store/usePhotoStore';

interface ICropperProps {
    url: string;
    close: () => void;
}

function CropperModal(props: ICropperProps) {
    const { url, close } = props;
    const imgRef = useRef(null);
    const previewRef = useRef(null);
    const [cropper, setCropper] = useState<Cropper | null>(null);
    const { addPhoto } = usePhotoStore();


    const save = () => {
        const base64 = cropper!.getCroppedCanvas().toDataURL('image/jpg', 0.6);
        const username = localStorage.getItem('username');
        username && uploadPhotos({ username, base64 });
        addPhoto(base64);
        close();
    }

    useEffect(() => {
        const cropper = imgRef.current && previewRef.current &&
            new Cropper(imgRef.current, {
                viewMode: 1,
                preview: previewRef.current,
                background: false,
                modal: false,
                minCropBoxWidth: 100,
                minCropBoxHeight: 100,
                ready() {
                    setCropper(cropper);
                }
            });
    }, [])

    return (
        <Card title='Cropper' width={'80vw'} height={'90vh'} close={close}>
            <div className="cropper-wrapper">
                <div className="origin-img">
                    <img src={url} alt="" ref={imgRef} />
                </div>
                <div className="preview-img" ref={previewRef}></div>
            </div>
            <div className="save-btn" onClick={save}>SAVE</div>
        </Card>
    )
}

export default CropperModal;