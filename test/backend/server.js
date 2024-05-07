const express = require("express");
const {spawn, exec} = require("child_process");
const multer = require('multer');
const cors = require("cors");
const PORT = process.env.PORT || 3001;

const app = express();
const corsOrigin = 'http://localhost:3000';
app.use(cors({
    origin:[corsOrigin],
    methods:['GET','POST'],
    credentials: true 
  })); 

app.get("/api/createWorker", (req, res) => {
    // proc = spawn('python3', ['-u', 'C:\\Users\\E08802\\PycharmProjects\\selniumSignin\\main.py'], {
    //     detached: true,
    // });
    proc = exec('python3 '+req.query.filePath);
    console.log("CreateWorker hit ", req.query.filePath);
    proc.stdout.on('data', data => {
        console.log(data);
        res.send({'data':data});
    });
    // res.send({'message':'works'});
    // res.json({ message: "Hello from server!" });
});


const imageUploadPath = 'C:\\Users\\E08802\\PycharmProjects\\ImageTextParser\\.venv';

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, imageUploadPath)
  },
  filename: function(req, file, cb) {
    // cb(null, `${file.fieldname}_dateVal_${Date.now()}_${file.originalname}`)
    cb(null, `${file.originalname}`)
  }
})

const imageUpload = multer({storage: storage})
app.post('/image-upload', imageUpload.array("my-image-file"), (req, res) => {
    console.log('POST request received to /image-upload.');
    //ADD REQ.BODY FOR TEST VALUE
    console.log('Axios POST body: ', req.body);
   
    res.send('POST request recieved on server to /image-upload.');
});
  
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});