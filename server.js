const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/render', (req, res) => {
  const { audio, image, subtitles, output } = req.body;

  if (!audio || !image || !output) {
    return res.status(400).json({ error: 'Missing required fields: audio, image, output' });
  }

  const audioPath = `/mnt/files/${audio}`;
  const imagePath = `/mnt/files/${image}`;
  const subtitlePath = subtitles ? `/mnt/files/${subtitles}` : null;
  const outputPath = `/mnt/files/${output}`;

  const ffmpegCmd = subtitlePath
    ? `ffmpeg -loop 1 -i ${imagePath} -i ${audioPath} -vf "subtitles=${subtitlePath}" -shortest -y ${outputPath}`
    : `ffmpeg -loop 1 -i ${imagePath} -i ${audioPath} -shortest -y ${outputPath}`;

  console.log('Executing:', ffmpegCmd);

  exec(ffmpegCmd, (err, stdout, stderr) => {
    if (err) {
      console.error('FFmpeg Error:', stderr);
      return res.status(500).json({ error: 'FFmpeg failed', details: stderr });
    }
    console.log('Video created:', outputPath);
    res.json({ success: true, output: `/videos/${output}` });
  });
});

app.use('/videos', express.static('/mnt/files'));

app.listen(PORT, () => {
  console.log(`Render server running on port ${PORT}`);
});
