
import React, { useState } from 'react';
import axios from 'axios';


const IMAGE_UPLOAD_URL = "https://o42pxi2cvxow5wbrqck7msmnsa0xlduk.lambda-url.ap-northeast-2.on.aws/";
const [imageBinary, setImageBinary] = useState<string|ArrayBuffer|null>(null);
const [imageUrls, setImageUrls] = useState<string[]>([]);
const useImageConvert = ( images:string[] ) => {
    const imageConvertTobinary = (blobUrl:Blob) => {
      const fileRef = new FileReader();
      const testData = fileRef.readAsDataURL(blobUrl);
      try {
        fileRef.onload = () =>{
        const testData = fileRef.result;
        setImageBinary(testData);
        }
      } catch (error) {
        console.error(error)
      }
      return (imageBinary);
    }
  
    const postUploadImage = async (image:string) =>{
      try {
        const imageUrl = await fetch (image);
         const blobUrl = await imageUrl.blob();
         const dataBin = imageConvertTobinary(blobUrl);
         if (!dataBin)
          return ;
          const date = Date.now();
          const blobId = blobUrl._data.blobId;
          const response = await axios.post(IMAGE_UPLOAD_URL, {
          image: dataBin.slice(23),
          imageId: blobId,
          userId: 231412341243123234
          })
          const responseObj = JSON.parse(response.request._response);
          setImageUrls((urls)=> [...urls, responseObj.url])
          return (responseObj.url);
      } catch (error) {
        console.error("UploadFail:", error)
      }
    }
    if (!images)
      return [];
    for (let i = 0; i < images.length; ++i) {
      const dataUrl = postUploadImage(images[i]);
    }
    return (
      imageUrls ? imageUrls : [] 
      )
  }
export default useImageConvert;