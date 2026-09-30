# Real-Time Chat Application

A real-time chat application built with **Java, Spring Boot, WebSocket/STOMP, Spring Data JPA and H2**.

The project demonstrates an end-to-end backend flow where a browser establishes a persistent WebSocket connection with the Spring Boot server, messages are processed by the service layer, persisted in H2, and broadcast to connected clients.

## Features

- Real-time bidirectional messaging using WebSocket
- STOMP messaging protocol
- Join/leave chat events
- Message persistence using H2 + Spring Data JPA
- REST endpoint for recent chat history
- Input validation
- Simple browser-based chat client
- H2 database console
- Layered architecture: Controller → Service → Repository

## Architecture

```text
                    Browser Client
                         |
                  WebSocket / STOMP
                         |
                         v
              +----------------------+
              |    Spring Boot App   |
              |                      |
              | WebSocket Controller |
              |          |           |
              |          v           |
              |     Service Layer    |
              |          |           |
              |          v           |
              |    JPA Repository    |
              +----------|-----------+
                         |
                         v
                    H2 Database
```

## Tech Stack

- Java 21
- Spring Boot 3.5.6
- Spring Web
- Spring WebSocket
- STOMP
- Spring Data JPA
- H2 Database
- Maven
- HTML/CSS/JavaScript

## How to Run

### Prerequisites

- JDK 21+
- Maven 3.9+

Run:

```bash
mvn spring-boot:run
```

Then open:

```text
http://localhost:8080
```

Open the page in two browser tabs/windows, enter different usernames, connect both, and send messages.

## Important Endpoints

### WebSocket

```text
/ws
```

STOMP application destination:

```text
/app/chat.send
```

Public topic:

```text
/topic/public
```

### REST

Get recent messages:

```text
GET /api/messages
```

### H2 Console

```text
http://localhost:8080/h2-console
```

JDBC URL:

```text
jdbc:h2:file:./data/chatdb
```

Username:

```text
sa
```

Password:

```text
```

## Why WebSocket?

Traditional HTTP follows a request-response model. A chat application using only repeated HTTP requests would require polling to check for new messages.

WebSocket maintains a persistent connection and supports bidirectional communication. This allows the server to push a new chat message to connected clients immediately.

STOMP is used on top of WebSocket to provide a simple messaging model with destinations such as `/app/chat.send` and `/topic/public`.

## Project Structure

```text
src/main/java/com/example/chat
├── config
│   └── WebSocketConfig.java
├── controller
│   ├── ChatRestController.java
│   └── ChatWebSocketController.java
├── entity
│   └── ChatMessageEntity.java
├── model
│   ├── ChatMessage.java
│   └── MessageType.java
├── repository
│   └── ChatMessageRepository.java
├── service
│   └── ChatMessageService.java
└── ChatApplication.java
```

## Possible Future Improvements

- JWT-based authentication
- Private one-to-one conversations
- Chat rooms
- Online/offline presence
- Message read status
- Pagination for chat history
- PostgreSQL/MySQL instead of H2
- Docker deployment
- Redis-backed messaging for horizontal scaling
- Automated tests
- Rate limiting

## Resume Description

> Developed a real-time chat application using Java and Spring Boot with WebSocket/STOMP for bidirectional messaging, Spring Data JPA for message persistence, and H2 for database storage; implemented REST APIs, validation, and a browser-based client for end-to-end real-time communication.

## License

This project is intended for learning and portfolio purposes.
