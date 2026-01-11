---
tags:
  - Docker
  - Programming
---

## Docker: Commands Cheat Sheet

#### Docker Container Management Commands
| Command | What It Does |
| :---| :--- |
| `docker ps` | List running containers |
| `docker ps -a` | List all containers |
| `docker run <image>` | Start a new container from image |
| `docker run -d <image>` | Start a new container in detached mode |
| `docker run 'it <image> /bin/bash` | Start a new container with interactive terminal |
| `docker exec -it <container> /bin/bash` | Run a command in a running container |
| `docker start <container>` | Start a stopped container |
| `docker stop <container>` | Stop a running container |
| `docker restart <container>` | Restart a container |
| `docker rm <container>` | Remove a container |
| `docker logs <container>` | View a container's logs |
| `docker inspect <container>` | Display a container's detailed info |

#### Docker Image Management Commands
| Command | What It Does |
| :---| :--- |
| `docker images` | List all Docker images |
| `docker pull <image>` | Download and image from Docker Hub |
| `docket build -t <name>` | Build an Image from a Dockerfile |
| `docker rmi <image>` | Remove an image |
| `docker inspect <image>` | Display an image's detailed info |
| `docker history <image>` | Show an image's history |

#### Docker Network and Volume Commands
| Command | What It Does |
| :---| :--- |
| `docker network ls` | List all networks |
| `docker network create <name>` | Create a network |
| `docker volume ls` | List all volumes |
| `docker volume create <name>` | Create a volume |


#### Docker Misc Commands
| Command | What It Does |
| :---| :--- |
| `docker info` | Dispaly system-wide info |
| `docker version` | Show version |
| `docker stats` | Display resource usage stats |
| `docker login ` | Login to Docker Hub |
| `docker logout` | Logout of Docker Hub |
