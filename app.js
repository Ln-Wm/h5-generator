let app = require('./bin/app');
let figlet = require('figlet');

app.set('port', 8000);
let server = app.listen(app.get('port'), ()=> {
    figlet('h5-generator', (err, data)=> {
        if (err) {
           console.log('Something went wrong...');
           console.dir(err);
           return;
        }
        console.log(`\n${data}`)
        console.log(`\n\nServer listening on port ${server.address().port}`);
    });
});
module.exports=server;
