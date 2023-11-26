import pic1 from '@/assets/imgs/pic1.jpg';
import pic2 from '@/assets/imgs/pic2.jpg';
import pic3 from '@/assets/imgs/pic3.jpg';
import pic4 from '@/assets/imgs/pic4.jpg';
import pic5 from '@/assets/imgs/pic5.jpg';
import pic6 from '@/assets/imgs/pic6.jpg';
import pic7 from '@/assets/imgs/pic7.jpg';

interface Images {
    [key: string]: string;
}

const images: Images = { pic1, pic2, pic3, pic4, pic5, pic6, pic7 };

function toBase64(key: string, url: string) {
    let dataURL = url;
    const img = new Image();
    img.src = url;
    img.onload = () => {
        const canvas = document.createElement('canvas');
        const [width, height] = [img.width, img.height]
        canvas.width = width;
        canvas.height = height;
        canvas.getContext('2d')?.drawImage(img, 0, 0, width, height);
        dataURL = canvas.toDataURL('image/jpeg');
        images[key] = dataURL;
    }
}

for (let key in images) {
    toBase64(key, images[key]);
}

export default images;
