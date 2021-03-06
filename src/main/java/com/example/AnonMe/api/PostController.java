package com.example.AnonMe.api;

import com.example.AnonMe.database.PostRepository;
import com.example.AnonMe.model.PostEntry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(path="/posts")
public class PostController {
    @Autowired
    PostRepository postRepository;


    @GetMapping(path="/getAllPosts")
    public List<PostEntry> getAllPosts(){
        return postRepository.getAllPosts(50);
    }
    @GetMapping(path="/postsByScreenName")
    public List<PostEntry> postByScreenName(@RequestParam String screenName){
        return postRepository.getPostsAuth(screenName);
    }
    @GetMapping(path="/recentPosts")
    public List<PostEntry> recentPosts(){
        return postRepository.getPostsRecent(25,50);
    }
    @GetMapping(path="/mostLikedPosts")
    public List<PostEntry> mostLikedPosts(){
        return postRepository.getPostsLiked(25,50);
    }
    @GetMapping(path="/postsByPhone")
    public List<PostEntry> postsByPhone(@RequestParam String phoneNumber){
        return postRepository.getPostsPnum(phoneNumber);
    }
    @GetMapping(path="/postById")
    public PostEntry postById(@RequestParam String id){
        return postRepository.getPostID(id);
    }
    @GetMapping(path="/PostInterest")
    public List<PostEntry> PostInterest(@RequestParam String user){
        return postRepository.postInterest(user);
    }
    @PostMapping(path="/insertPost")
    public void insertPost(@RequestBody PostEntry postEntry){
        System.out.println("Inserted Post: " + postEntry.getPost_id());
        postRepository.insertPost(postEntry);
    }

    @PostMapping(path="/LikePost")
    public boolean LikePost(@RequestParam String id, @RequestParam String user){
        System.out.println("Liked Post: " + id);
        return postRepository.postLike(id,user);
    }
    @PostMapping(path="/FlagPost")
    public boolean FlagPost(@RequestParam String id, @RequestParam String user){
        System.out.println("Flagged Post: " + id);
        return postRepository.postFlag(id,user);
    }
    @DeleteMapping(path="/deletePostByID")
    public void deletePost(@RequestParam String id){
        System.out.println("Deleted Post: " + id);
        postRepository.removePostID(id);
    }
    @DeleteMapping(path="/deleteAllAuthorPosts")
    public void deleteAllAuthorPost(@RequestParam String phoneNumber){
        System.out.println("Deleted Posts by user: " + phoneNumber);
        postRepository.removePost(phoneNumber);
    }

}
