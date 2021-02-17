## wave2image

This microservice is responsible for generating waveform images based on the downloaded audio files.<br>
The video ID is provided by the RabbitMQ in the `musicFeatures` queue list.

### Docker Params
| Arg | Default | Description |
| --- | --- | --- |
| HOST | localhost | RabbitMQ host |
| USER | guest | HTTP basic auth username  |
| PASS | guest | HTTP basic auth password |
| PORT | 5672 | RabbitMQ Port |
| MNG_PORT | 15672 | RabbitMQ Management Port |
| TIME | 10 | Timeout to check if the service is up |

### Volumes
| Container Path | Description |
| --- | --- |
| `/Audios` | Folder where the downloaded audio files are accessed |
| `/Soundwaves` | Folder where the generated waveform images are saved |

### Run Local Microservice
Run Rabbit
```
docker run -d -e RABBITMQ_DEFAULT_USER=merUser -e RABBITMQ_DEFAULT_PASS=passwordMER -p 15672:15672 -p 5672:5672 rabbitmq:3-management-alpine
```

Build local `wave2image` from source
```
docker build -t localwave2image:latest .
```

Run local `wave2image`
```
docker run -e TIME=10 -e USER=merUser -e PASS=passwordMER -e HOST=localhost -e MNG_PORT=15672 --net=host -v "Audios":"/Audios" -v "Soundwaves:/Soundwaves" localwave2image:latest
```

Run official `wave2image` image locally
```
docker run -e TIME=10 -e USER=merUser -e PASS=passwordMER -e HOST=localhost -e MNG_PORT=15672 --net=host -v "Audios":"/Audios" -v "Soundwaves:/Soundwaves" merteam/wave2image:latest
```

Based on [GitHub - hyunwoo/generate-sound-waveform](https://github.com/hyunwoo/generate-sound-waveform)