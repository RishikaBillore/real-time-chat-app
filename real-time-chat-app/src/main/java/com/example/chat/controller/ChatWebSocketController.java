package com.example.chat.controller;

import com.example.chat.entity.ChatMessageEntity;
import com.example.chat.model.ChatMessage;
import com.example.chat.service.ChatMessageService;
import jakarta.validation.Valid;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class ChatWebSocketController {

    private final ChatMessageService service;

    public ChatWebSocketController(ChatMessageService service) {
        this.service = service;
    }

    @MessageMapping("/chat.send")
    @SendTo("/topic/public")
    public ChatMessageEntity sendMessage(@Valid ChatMessage message) {
        return service.save(message);
    }
}
