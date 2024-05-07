import './componentStyles.css';
import axios from 'axios';
//IMPORT USESTATE
import React, { useState, Dispatch, SetStateAction } from 'react';

interface pythonOutput {
    data: string;
}
interface imageLoaderProps {
    setText: Function;
}
export const ImageLoader = ({setText}: imageLoaderProps) => {
    const [image, setImage] = useState<FormData>();
    const [imagePath, setImagePath] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const getFileInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
      //NOTE THE ADDITION OF 'e' PARAMETER
       console.log('File info working!')
       if (!e.target.files) return;
       console.log(e.target.files[0]);
       const formData = new FormData(); 
       //FILE INFO NAME WILL BE "my-image-file"
       formData.append('my-image-file', e?.target?.files[0], e?.target?.files[0].name);
       setImagePath(e?.target?.files[0].name);
       setImage(formData);
   
    }

    
    const apiCall = () => {
        if(!image) return;
        axios.post('/image-upload', image)
        .then(res => {
          console.log('Axios response: ', res)
        })
        const wDir = "C:\\Users\\E08802\\PycharmProjects\\ImageTextParser\\.venv\\";
        const filePath = process.env.REACT_APP_PYTHON_SCRIPT_PATH + "PROGRAM.py " + process.env.REACT_APP_PYTHON_SCRIPT_PATH + imagePath;
        console.log(filePath);
        const response = fetch("/api/createWorker?filePath="+filePath).then((resp) => {
          console.log(resp);
          resp.json().then((data) => {
              console.log(data);
              setText(data);
              setIsLoading(false);
          });
        });
    }

   const processImage = (e: React.FormEvent<HTMLFormElement>) => {
        setIsLoading(true);
        setText("");
        e.preventDefault();
        apiCall();
    }

    return (
        <fieldset className="border rounded-3 p-3">
          <legend className="float-none w-auto px-3">Upload</legend>
          <form action="" className="input__image_" onSubmit={(e) => {
            processImage(e);
          }}>
            <div className="mb-3">
                {/* <label htmlFor='formFile' className="form-label" style={{textDecoration:"underline"}}>Upload Image</label> */}
                <input id="formFile" type="file" className="form-control" onChange={(e) => getFileInfo(e)}></input>
                <button disabled={isLoading} type="submit" id="processbtn" className="btn btn-outline-secondary">Process IMG</button>
                {isLoading && <span className="loader"></span>}
            </div>
          </form>
       </fieldset>
    )

}