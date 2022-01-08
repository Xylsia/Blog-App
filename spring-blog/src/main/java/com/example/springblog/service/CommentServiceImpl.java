package com.example.springblog.service;

import com.example.springblog.model.Comment;
import com.example.springblog.model.Post;
import com.example.springblog.repository.ICommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Date;

@Service
@Transactional
public class CommentServiceImpl implements CommentService {


    @Autowired
    private ICommentRepository commentRepository;

    @Override
    public void saveComment(Post post, String username, String content) {
        Comment comment = new Comment();
        comment.setContent(content);
        comment.setUsername(username);
        comment.setPostedDate(new Date());
        post.setComments(comment);
        commentRepository.save(comment);
    }
}
