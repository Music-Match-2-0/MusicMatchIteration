const path = require('path');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const crypto = require('crypto');
const sharp = require('sharp');

const { GetObjectCommand, getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

dotenv.config();

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;
const randomImageName = (bytes = 32)=> crypto.randomBytes(bytes).toString('hex');

const s3 = new S3Client({
  credentials:{
      accessKeyId: accessKey,
      secretAccessKey: secretAccessKey,
  },
  region: bucketRegion
})


//require controller
const controller = require('./Controllers/controller');

const PORT = 3000;


// ALSO for Websockets / Messaging
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get('/ws/', (req, res) => {
  return res.status(200).send('this still works basic get')
})

app.use('/build', express.static(path.join(__dirname, '../build')));


app.get('/api/userprofile', controller.findProfileAndMatches, (req, res) => {

  console.log(res.locals.pageinfo.userProfile);

  // console.log(`userProfile in server.js: ${res.locals.pageinfo.userProfile}`)
  
  res.status(200).json(res.locals.pageinfo);
});

app.post('/api/login/verify', 
  controller.verifyUser, 
  controller.createLoginCookie,
  (req, res) => {
  res.status(200).json(res.locals.profile);
})

app.post('/api/signup', 
  controller.createUser, 
  controller.createLoginCookie, 
  (req, res) => {
    console.log('REQ.BODY', req.body);
    console.log('REQ.FILE', req.file);
  res.status(200).json(res.locals.profile);
})


//image uploading middleware
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({storage:storage});

app.post('/api/image', upload.single('image'), async (req, res) => {
  console.log('req.body', req.body);
  console.log('req.file', req.file);

  if (!req.file) {
    return res.status(400).json({ error: 'No image file provided' });
  }

  try {
    const buffer = await sharp(req.file.buffer)
      .resize({ height: 250, width: 250, fit: 'contain' })
      .toBuffer();

    const imageName = randomImageName();
    console.log("Resolved credentials:", s3.config.credentials);


    const params = {
      Bucket: bucketName,
      Key: imageName,
      Body: buffer,
      ContentType: req.file.mimetype,
    };

    const command = new PutObjectCommand(params);
    const response = await s3.send(command);

    if (response.$metadata.httpStatusCode === 200) {

      const imageUrl = `https://${bucketName}.s3.amazonaws.com/${imageName}`;

      return res.status(200).json({ message: 'Image uploaded successfully', imageUrl });
    } else {
      return res.status(500).json({ error: 'Failed to upload image to S3' });
    }
  } catch (error) {
    console.error('Error uploading image to S3:', error);
    return res.status(500).json({ error: 'An error occurred while uploading the image' });
  }
});

app.get('/api/getImage/:imageName', async (req, res) => {
    const { GetObjectCommand, getSignedUrl } = require("@aws-sdk/s3-request-presigner");
    const imageName = req.params.imageName;

    const getObjectParams = {
      Bucket: bucketName,
      Key: imageName,
    };

    const getObjectCommand = new GetObjectCommand(getObjectParams);

    try {
      const signedUrl = await getSignedUrl(s3, getObjectCommand, { expiresIn: 3600 });
      res.json({ signedUrl });
    } catch (error) {
      console.error('Error generating presigned URL:', error);
      res.status(500).json({ error: 'An error occurred while generating the URL' });
    }
});



// ERROR HANDLING
app.use('*', (req, res, next) => {
    return next({
      log: 'Endpoint does not exist',
      status: 404,
      message: { err: 'Website does not exist! :(' },
    });
  });
  
  app.use((err, req, res, next) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
  });

  app.listen(PORT, () => {
  console.log('Server running on port', PORT);
});