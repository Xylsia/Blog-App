package com.example.springblog.controller;

import com.example.springblog.model.User;
import com.example.springblog.service.UserService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;


    @GetMapping("/list")
    public ResponseEntity<?> getUserList() {
        List<User> users = userService.userList();
        if (users.isEmpty()) {
            return new ResponseEntity<>("No Users Found..", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/{username}")
    public ResponseEntity<?> getUserInfo(@PathVariable String username) {
        User user = userService.findByUsername(username);
        if (user == null) {
            return new ResponseEntity<>("User is not found..", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/findByUsername/{username}")
    public ResponseEntity<?> getUsersByUsername(@PathVariable String username) {
        List<User> user = userService.getUsersListByUsername(username);
        if (user.isEmpty()) {
            return new ResponseEntity<>("No Users Found..", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody HashMap<String, String> request) {
        String username = request.get("username");
        if (userService.findByUsername(username) != null) {
            return new ResponseEntity<>("usernameExists", HttpStatus.CONFLICT);
        }
        String email = request.get("email");
        if (userService.findByEmail(email) != null) {
            return new ResponseEntity<>("emailExists", HttpStatus.CONFLICT);
        }
        String name = request.get("name");
        String password = request.get("password");
        try {
            User user = userService.saveUser(name, username, email, password);
            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("An error occurred", HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/update")
    public ResponseEntity<?> updateProfile(@RequestBody HashMap<String, String> request) {
        String id = request.get("id");
        User user = userService.findUserById(Long.parseLong(id));
        if (user == null) {
            return new ResponseEntity<>("userNotFound", HttpStatus.NOT_FOUND);
        }
        try {
            userService.updateUser(user, request);
            return new ResponseEntity<>(user, HttpStatus.OK);

        } catch (Exception e){
            return new ResponseEntity<>("An error occurred", HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/delete/{username}")
    public ResponseEntity<?> deleteUser(@PathVariable("username") String username) {
        User user = userService.findByUsername(username);
        if (user == null) {
            return new ResponseEntity<>("User not found..", HttpStatus.NOT_FOUND);
        }
        try {
            userService.deleteUser(user);
            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("An error occurred: ", HttpStatus.BAD_REQUEST);
        }
    }

}
