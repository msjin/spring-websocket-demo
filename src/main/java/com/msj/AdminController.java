package com.msj;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.socket.TextMessage;

@Controller
public class AdminController {
	
	@Resource
	private SystemWebSocketHandler socketHandler;
	
	@RequestMapping("/push")
	@ResponseBody
	public String pushMsgToUser(String user){
		socketHandler.sendMessageToUser(user, new TextMessage("hello"));
		return "ok";
	}

}
