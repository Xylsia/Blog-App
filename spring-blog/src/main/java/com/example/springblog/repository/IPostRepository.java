package com.example.springblog.repository;

import com.example.springblog.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IPostRepository extends JpaRepository<Post, Long> {

    @Query("SELECT post FROM Post post ORDER BY post.postedDate DESC")
    public List<Post> findAll();

    @Query("SELECT post FROM Post post WHERE post.username=:param ORDER BY post.postedDate DESC")
    public List<Post> findPostByUsername(@Param("param") String username);

    @Query("SELECT post FROM Post post WHERE post.id=:param")
    public Post findPostById(@Param("param") Long id);

    @Modifying
    @Query("DELETE Post WHERE id=:param")
    public void deletePostById(@Param("param") Long id);
}
