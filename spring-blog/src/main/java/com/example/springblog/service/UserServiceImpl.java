package com.example.springblog.service;

import com.example.springblog.model.Role;
import com.example.springblog.model.User;
import com.example.springblog.model.UserRole;
import com.example.springblog.repository.IRoleRepository;
import com.example.springblog.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@Transactional
public class UserServiceImpl implements UserService {


    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private IRoleRepository roleRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    @Transactional
    public User saveUser(String name, String username, String email, String password){
        User user = new User();
        user.setPassword(password);
        String encryptedPassword = bCryptPasswordEncoder.encode(password);
        user.setName(name);
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(encryptedPassword);
        Set<UserRole> userRoles = new HashSet<>();
        userRoles.add(new UserRole(user, userService.findUserRoleByName("USER")));
        user.setUserRoles(userRoles);
        userRepository.save(user);
        return user;
    }

    @Override
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public List<User> userList() {
        return userRepository.findAll();
    }

    @Override
    public User updateUser(User user, HashMap<String, String> request) {
        String name = request.get("name");
        String email = request.get("email");
        String bio = request.get("bio");
        String imageUrl = request.get("imageUrl");
        String newPassword = request.get("password");
        if(newPassword != ""){
            user.setPassword(newPassword);
            String encryptedPassword = bCryptPasswordEncoder.encode(newPassword);
            user.setPassword(encryptedPassword);
        }
        user.setName(name);
        user.setEmail(email);
        user.setBio(bio);
        user.setImageUrl(imageUrl);
        userRepository.save(user);
        return user;
    }

    @Override
    public User findUserById(Long id) {
        return userRepository.findUserById(id);
    }

    @Override
    public void deleteUser(User user) {
        userRepository.delete(user);
    }

    @Override
    public List<User> getUsersListByUsername(String username) {
        return userRepository.findByUsernameContaining(username);
    }

    @Override
    public User simpleSaveUser(User user){
        userRepository.save(user);
        return user;
    }

    @Override
    public Role saveRole(Role role) {
        return roleRepository.save(role);
    }

    @Override
    public Role findUserRoleByName(String name) {
        return roleRepository.findRoleByName(name);
    }
}
