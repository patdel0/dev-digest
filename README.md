## Getting started

### Requirements
**Docker**: A platform for automating application deployment, scaling, and
 management using containerization.

Download from [Docker's official website](
https://www.docker.com/products/docker-desktop).

**docker-compose**: A tool for defining and running multi-container Docker
 applications with YAML files, included in Docker Desktop for Windows and Mac,
 and installable on Linux.

More info on the [Docker Compose documentation](https://docs.docker.com/compose/).

 
Ensure `docker` and `docker-compose` are correctly installed and configured before setup and server script execution.

```
docker --version;
docker-compose --version;
```

### Quick Start Scripts
Scripts were created following the [Scripts to Rule Them All pattern](https://github.blog/2015-06-30-scripts-to-rule-them-all/).

**Setup** 
```sh
./script/setup
```

**Run Servers**
```sh
./script/server
```

The following services are expected to run:
- React: http://localhost:3000
- Django: http://localhost:7860
- Storybook: http://localhost:6006
