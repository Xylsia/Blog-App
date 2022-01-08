package com.example.springblog.service;

import com.example.springblog.model.Post;
import com.example.springblog.model.User;
import com.example.springblog.repository.IPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

@Service
@Transactional
public class PostServiceImpl implements PostService  {


    @Autowired
    private IPostRepository postRepository;

    @Override
    public Post savePost(User user, HashMap<String, String> request) {
        String title = request.get("title");
        String content = request.get("content");
        String imageUrl = request.get("imageUrl");
        Post post = new Post();
        post.setTitle(title);
        post.setContent(content);
        post.setImageUrl(imageUrl);
        post.setUsername(user.getUsername());
        post.setPostedDate(new Date());
        user.setPost(post);
        postRepository.save(post);
        return post;
    }

    @Override
    public List<Post> postList() {
        return postRepository.findAll();
    }

    @Override
    public Post getPostById(Long id) {
        return postRepository.findPostById(id);
    }

    @Override
    public List<Post> findPostByUsername(String username) {
        return postRepository.findPostByUsername(username);
    }

    @Override
    public Post deletePost(Post post) {
        postRepository.deletePostById(post.getId());
        return post;
    }
}
