const express = require("express");
const fs = require("fs");

module.exports = {
  watchVideo: (req, res, next) => {
    const path = './video/video.mp4';
    const fileSize = fs.statSync(path).size;
    const headerRange = req.headers.range;
    if (headerRange) {
      const positions = headerRange.replace(/bytes=/, '').split('-');
      const start = parseInt(positions[0], 10);
      const end = positions[1] ? parseInt(positions[1], 10) : fileSize - 1;
      const chunksize = (end - start) + 1;
      const readstream = fs.createReadStream(path, { start, end });
      readstream.on('open', () => {
        res.writeHead('206', {'Content-Range': `bytes ${start}-${end}/${fileSize}`, 'Accept-Ranges': 'bytes', 'Content-Length': chunksize, 'Content-Type': 'video/mp4'});
        readstream.pipe(res);
      });
      readstream.on('error', (err) => {
        next(err);
      })
    }
  },

  viewVideo: (req, res, next) => {
    res.render('video', { title: "watch video" });
  }
}