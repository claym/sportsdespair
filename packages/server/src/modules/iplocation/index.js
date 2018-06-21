import ipstack from 'ipstack';
import reqip from 'request-ip';
import Feature from '../connector';

export default new Feature({
  middleware: app => {
    app.use(reqip.mw());
    app.use('/iplocation', (req, res) => {
      var ip = !req.clientId ? '104.12.248.78' : req.clientId;
      console.log('IP: ' + ip);
      ipstack(ip, process.env.IPSTACK_TOKEN, (err, response) => {
        res.send(response);
      });
    });
  }
});
