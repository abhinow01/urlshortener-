const shortid = require('shortid');
const Url = require('../models/urlModel');

const shortenUrl = async (req, res) => {
  try {
  const { originalUrl } = req.body;
  
  if(!originalUrl){
    return res.status(400).json({error:'original url is required'});
  }

  let url = await Url.findOne({originalUrl});

     if(!url){
  
    const shortUrl =  shortid.generate();
    url =  await Url.create({originalUrl , shortUrl });
     

     }
     res.status(200).json(createdUrl);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
    console.log(error);
  }
};

const expandUrl = async (req, res) => {
  const { shortUrl } = req.params;

  try {
    const url = await Url.findOne({ shortUrl });
    if (url) {
      res.redirect(url.originalUrl);
    } else {
      res.status(404).json({ message: 'URL not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

module.exports = {
  shortenUrl,
  expandUrl,
};
