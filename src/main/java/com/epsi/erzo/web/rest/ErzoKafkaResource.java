package com.epsi.erzo.web.rest;

import com.epsi.erzo.service.ErzoKafkaProducer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/erzo-kafka")
public class ErzoKafkaResource {

    private final Logger log = LoggerFactory.getLogger(ErzoKafkaResource.class);

    private ErzoKafkaProducer kafkaProducer;

    public ErzoKafkaResource(ErzoKafkaProducer kafkaProducer) {
        this.kafkaProducer = kafkaProducer;
    }

    @PostMapping("/publish")
    public void sendMessageToKafkaTopic(@RequestParam("message") String message) {
        log.debug("REST request to send to Kafka topic the message : {}", message);
        this.kafkaProducer.send(message);
    }
}
