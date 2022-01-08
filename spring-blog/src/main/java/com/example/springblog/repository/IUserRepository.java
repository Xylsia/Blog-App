package com.example.springblog.repository;

import com.example.springblog.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IUserRepository extends JpaRepository<User, Long> {

    public User findByUsername(String username);

    public User findByEmail(String email);

    @Query("SELECT user FROM User user WHERE user.id=:param")
    public User findUserById(@Param("param") Long id);

    public List<User> findByUsernameContaining(String username);

}
