package com.example.chat.service;

import com.example.chat.entity.ChatMessageEntity;
import com.example.chat.model.ChatMessage;
import com.example.chat.model.MessageType;
import com.example.chat.repository.ChatMessageRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ChatMessageService {

    private final ChatMessageRepository repository;

    public ChatMessageService(ChatMessageRepository repository) {
        this.repository = repository;
    }

    public ChatMessageEntity save(ChatMessage message) {
        MessageType type = message.getType() == null ? MessageType.CHAT : message.getType();

        ChatMessageEntity entity = new ChatMessageEntity(
                message.getSender().trim(),
                message.getContent().trim(),
                type,
                LocalDateTime.now()
        );

        return repository.save(entity);
    }

    public List<ChatMessageEntity> recentMessages() {
        return repository.findTop50ByOrderByTimestampDesc()
                .stream()
                .sorted(java.util.Comparator.comparing(ChatMessageEntity::getTimestamp))
                .toList();
    }
}
