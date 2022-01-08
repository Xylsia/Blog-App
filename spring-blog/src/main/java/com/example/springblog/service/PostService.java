package com.example.springblog.service;

import com.example.springblog.model.Post;
import com.example.springblog.model.User;

import java.util.HashMap;
import java.util.List;

public interface PostService {

    public Post savePost(User User, HashMap<String, String> request);

    public List<Post> postList();

    public Post getPostById(Long id);

    public List<Post> findPostByUsername(String username);

    public Post deletePost(Post post);

}
