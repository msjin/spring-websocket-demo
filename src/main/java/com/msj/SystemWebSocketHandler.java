package com.msj;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;


@Component
public class SystemWebSocketHandler implements WebSocketHandler {
	
	private static Logger logger = LoggerFactory.getLogger(SystemWebSocketHandler.class);
	
	private static final List<WebSocketSession> users;
	
	static{
		users = Collections.synchronizedList(new ArrayList<WebSocketSession>()) ;
	}

	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		users.add(session);
		logger.info("{}加入WebSocketSession队列",session.getAttributes().get(Constants.WEBSOCKET_USERNAME));
	}

	/**
	 * 接收客户端信息
	 */
	@Override
	public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {
//		sendMessageToUser("hz_java", (TextMessage)message);
	}

	@Override
	public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
		if(session.isOpen()){
			session.close();
		}
		users.remove(session);
		logger.info("error {}退出ebSocketSession队列",session.getAttributes().get(Constants.WEBSOCKET_USERNAME));
	}

	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus closeStatus) throws Exception {
		users.remove(session);
		logger.info("closed {}退出ebSocketSession队列",session.getAttributes().get(Constants.WEBSOCKET_USERNAME));
	}

	@Override
	public boolean supportsPartialMessages() {
		// TODO Auto-generated method stub
		return false;
	}
	
	/**
     * 发送信息给全部用户
     *
     * @param message
     */
    public void sendMessageToUsers(TextMessage message) {
        for (WebSocketSession user : users) {
            try {
                if (user.isOpen()) {
                    user.sendMessage(message);
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
	
	/**
	 * 发送信息给某个用户
     * @param userName
     * @param message
     */
    public void sendMessageToUser(String userName, TextMessage message) {
        for (WebSocketSession user : users) {
            if (user.getAttributes().get(Constants.WEBSOCKET_USERNAME).equals(userName)) {
                try {
                    if (user.isOpen()) {
                        user.sendMessage(message);
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                }
                break;
            }
        }
    }

}
