package com.example.chat.controller;

import com.example.chat.entity.ChatMessageEntity;
import com.example.chat.service.ChatMessageService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class ChatRestController {

    private final ChatMessageService service;

    public ChatRestController(ChatMessageService service) {
        this.service = service;
    }

    @GetMapping
    public List<ChatMessageEntity> getRecentMessages() {
        return service.recentMessages();
    }
}
