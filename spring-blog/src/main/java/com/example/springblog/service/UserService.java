package com.example.springblog.service;

import com.example.springblog.model.Role;
import com.example.springblog.model.User;

import java.util.HashMap;
import java.util.List;

public interface UserService {

    public User saveUser(String name, String username, String email, String password);

    public User findByUsername(String username);

    public User findByEmail(String email);

    public List<User> userList();

    public User updateUser(User user, HashMap<String, String> request);

    public User findUserById(Long id);

    public void deleteUser(User user);

    public List<User> getUsersListByUsername(String username);

    public User simpleSaveUser(User user);

    public Role findUserRoleByName(String name);

    public Role saveRole(Role role);
}
