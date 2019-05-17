var https = require('https');

export default params => {
  console.log(params);
  return new Promise(function(resolve, reject) {
    // To Do Move paramaters to settings
    var options = {
      method: 'POST',
      hostname: 'preprod.aadhaarapi.com',
      path: '/verify-dl',
      headers: {
        'Content-Type': 'application/json',
        qt_api_key: 'bb130eda-510a-4a4b-9913-bf60ab725018',
        qt_agency_id: 'cc1b47d1-4341-4a1b-8b55-a20efa70a523'
      }
    };

    var req = https.request(options, function(res) {
      var chunks = [];

      res.on('data', function(chunk) {
        chunks.push(chunk);
      });

      res.on('end', function() {
        var body = Buffer.concat(chunks);
        resolve(JSON.parse(body));
      });

      res.on('error', function(error) {
        console.error(error);
        reject(error);
      });
    });

    // To Do Remove static variables
    var postData =
      '{\n    "dl_no":"DL-0420110149646",\n    "dob":"09-02-1976",\n    "consent":"Y",\n    "consent_text":"01234567890123456789"\n} ';

    req.write(postData);

    req.end();
  });
};
