// Song: Cartoon - Howling (Ft. Asena)[NCS Release]
// Music provided by NoCopyrightSounds
// Free Download/Stream: http://ncs.io/Howling
// Watch: http://youtu.be/JiF3pbvR5G0

const fs = require('fs');
var amqp = require('amqplib/callback_api');

const config={
  protocol: 'amqp',
  hostname: 'localhost',
  port: 5672,
  username: 'merUser',
  password: 'passwordMER',
}

const GITHUB_WORKSPACE = process.env.GITHUB_WORKSPACE;
      qTest = "musicFeaturesTest",
      qMain = "musicFeatures",
      vID = "JiF3pbvR5G0",
      file = "JiF3pbvR5G0.png",
      link = "www.youtube.com/watch?v=JiF3pbvR5G0";

describe('Testing RabbitMQ', ()=>{
  it('Should connect to the RabbitMQ', (done)=>{
    amqp.connect(config, (err, conn)=>{
      if(err){
        console.log("Connection Error");
        return;
      }
      done();
      setTimeout(function() { conn.close();}, 500);
    });
  });

  it('Should send a music to download', (done)=>{
    amqp.connect(config, (err, conn)=>{
      if(err){
        console.log("Connection Error");
        return;
      }
      conn.createChannel((err, ch)=>{
        if(err){
          console.log("Error Creating Channel");
          return;
        }
        ch.assertQueue(qMain, { durable: false }); 
        ch.sendToQueue(qMain, Buffer.from(vID),
          function(err) {
            if(err) {
              console.log("Error sending the message: ",err);
              return;         
            } else {
              console.log("Message sent");
              done();
          }
        });
      });
      done();
      setTimeout(function() { conn.close();}, 500);
    });
  });


  it('Should create the RabbitMQ channel', (done)=>{
    amqp.connect(config, (err, conn)=>{
      if(err){
        console.log("Connection Error");
        return;
      }
      conn.createConfirmChannel((err, ch)=>{
        if(err){
          console.log("Error Creating Channel");
          return;
        }
        done();
        setTimeout(function() { conn.close();}, 500);
      });
    });
  });

  it('Should send a message to the RabbitMQ', (done)=>{
    amqp.connect(config, (err, conn)=>{
      if(err){
        console.log("Connection Error");
        return;
      }
      conn.createChannel((err, ch)=>{
        if(err){
          console.log("Error Creating Channel");
          return;
        }
        ch.assertQueue(qTest, { durable: false }); 
        ch.sendToQueue(qTest, Buffer.from(link), { persistent: false },
        function(err) {
          if(err) {
            console.log("Error sending the message: ",err);
            return;         
          } else {
            console.log("Message sent");
          }
        });
      });
      done();
      setTimeout(function() { conn.close();}, 500);  
    });
  });

  it("Should receive a message from the RabbitMQ", (done)=>{
    amqp.connect(config, (err, conn)=>{
      if(err){
        console.log("Connection Error");
        return;
      }
      conn.createChannel( (err, ch)=>{
        if(err){
          console.log("Error Creating Channel");
          return;
        }
        ch.assertQueue(qTest, { durable: false });
        ch.consume(qTest, function (msg) {
          if (msg.content.toString() == link){
            done();
            setTimeout(function() { conn.close();}, 500);
          } else {
            console.log("Unexpected message");
            return;
          }
        }, { noAck: true });
      });
    });
  });
});

describe('Testing the wave2image script', function() {
  it('Should convert the music soundwave to png', function(done) {
    setTimeout(function(){
      fs.access(`${GITHUB_WORKSPACE}/${file}`, fs.F_OK, (err) => {
        if (err) {
          console.error(err)
          console.log("File not found!");
          return
        }
        console.log("File found!");
        done();
      })}, 7000);
  });
});