const fs = require("fs");
const request = require('request');

module.exports = {
  watchVideo: (req, res, next) => {
    try {
      /* stream video file from cloud storage */
      const publicLink = 'https://s3.ap-south-1.amazonaws.com/kishanintervid/ISHARE+TERE+Song+-+Guru+Randhawa%2C+Dhvani+Bhanushali+-+DirectorGifty+-+Bhushan+Kumar.mp4';
      request({
        url: publicLink,
        method: 'HEAD'
      }, (err, response, body) => {
        res.writeHead('200', {
          'Accept-Ranges': response.headers["accept-ranges"],
          'content-type': response.headers["content-type"],
          'content-length': response.headers["content-length"]
        });
        request(publicLink).pipe(res);
      });

      /* stream video file from local storage */
      // const path = './video/video.mp4';
      // const fileSize = fs.statSync(path).size;
      // const headerRange = req.headers.range;
      // if (headerRange) {
      //   const positions = headerRange.replace(/bytes=/, '').split('-');
      //   const start = parseInt(positions[0], 10);
      //   const end = positions[1] ? parseInt(positions[1], 10) : fileSize - 1;
      //   const chunksize = (end - start) + 1;
      //   const readstream = fs.createReadStream(path, { start, end });
      //   res.writeHead('206', {'Content-Range': `bytes ${start}-${end}/${fileSize}`, 'Accept-Ranges': 'bytes', 'Content-Length': chunksize, 'Content-Type': 'video/mp4'});
      //   readstream.on('open', () => {
      //     readstream.pipe(res);
      //   });
      //   readstream.on('error', (err) => {
      //     next(err);
      //   })
      // } 
    } catch (error) {
      console.log(error);
    }
  },

  viewVideo: (req, res, next) => {
    res.render('video', {
      title: "watch video"
    });
  },

  watchAds: (req, res, next) => {
    const path = './video/ads.mp4';
    const fileSize = fs.statSync(path).size;
    const headerRange = req.headers.range;
    if (headerRange) {
      const positions = headerRange.replace(/bytes=/, '').split('-');
      const start = parseInt(positions[0], 10);
      const end = positions[1] ? parseInt(positions[1], 10) : fileSize - 1;
      const chunksize = (end - start) + 1;
      const readstream = fs.createReadStream(path, {
        start,
        end
      });
      res.writeHead('206', {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4'
      });
      readstream.on('open', () => {
        readstream.pipe(res);
      });
      readstream.on('error', (err) => {
        next(err);
      })
    }
  },
}