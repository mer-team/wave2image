const fs = require('fs'),
    lib = require('./generate-sound-waveform'),
    user = process.env.USER || 'guest',
    pass = process.env.PASS || 'guest',
    host = process.env.HOST || 'localhost',
    port = process.env.PORT || 5672;

var amqp = require('amqplib/callback_api');

extractImage = async (vID,ch) => {
    // generateSoundImage([SOUND FILE PATH], [WIDTH], [HEIGHT])
    lib.generateSoundImage('/Audios/'+vID+'.wav', 1250, 200, {
        stepMultiplier: 10, // Density of waveform [default : 4]
        lineColor: '#fff', // image line color [default : '#666']
        globalAplha: 0.8, // draw line global alpha value [default : 0.6]
        padding: 60, // padding height [default : 8]
        lineWidth : 1, // draw line width [default : 0.5]
        centerLine: false, // center guide line [default : true]
        centerLineColor: '#fff', // center guild line color [default : '#fff']
    })
    .then((stream) => {
        const out = fs.createWriteStream('/Soundwaves/'+vID+'.png');
        stream.pipe(out);
        out.on('finish', () => console.log('complete'));
    })
    .catch((err) => {
        console.log(err);
    });
}

/**
 * Inicializa a comunicacao com o server rabbitMQ
 */
startScript = async () => {
    console.log("Starting")
    amqp.connect(`amqp://${user}:${pass}@${host}/`, function(err, conn) {
    conn.createChannel(function(err, ch) {
        console.log("Connected")
        var q = 'soundWaves';
        ch.assertQueue(q, {durable: false});
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
        ch.consume(q, async function(msg) {
        console.log(" [x] Received %s", msg.content.toString());
        var vID = msg.content.toString();
        await extractImage(vID,ch).then();
        }, {noAck: true});
    });
    });
}

/**
 * Executa o método startScript
 */
startScript();