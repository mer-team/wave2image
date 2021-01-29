## wave2image

This microservice is responsible for generating waveform images based on the downloaded audio files.<br>
The video ID is provided by the RabbitMQ in the `musicFeatures` queue list.

### Docker Params
| Arg | Default | Description |
| --- | --- | --- |
| URL | localhost | URL to check |
| HOST | localhost | RabbitMQ host |
| USER | merUser | HTTP basic auth username  |
| PASS | passwordMER | HTTP basic auth password |
| PORT | 5672 | RabbitMQ Port |
| MNG_PORT | 15672 | RabbitMQ Management Port |
| TIME | 10 | Timeout to check if the service is up |

### Volumes
| Container Path | Description |
| --- | --- |
| `/Audios` | Folder where the downloaded audio files are accessed |
| `/Soundwaves` | Folder where the generated waveform images are saved |

Based on [GitHub - hyunwoo/generate-sound-waveform](https://github.com/hyunwoo/generate-sound-waveform)