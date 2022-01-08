package com.example.springblog.service;

import com.example.springblog.model.Comment;
import com.example.springblog.model.Post;

public interface CommentService {

    public void saveComment(Post post, String username, String content);

}
