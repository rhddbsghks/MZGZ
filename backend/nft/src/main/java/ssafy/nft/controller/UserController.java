package ssafy.nft.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ssafy.nft.component.Uploader;
import ssafy.nft.model.dto.ApiMessage;
import ssafy.nft.model.dto.UserApiRequest;
import ssafy.nft.model.entity.User;
import ssafy.nft.model.enums.Status;
import ssafy.nft.model.repository.UserRepository;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final Uploader uploader;
    private final UserRepository userRepository;

    @PostMapping("/picture")
    public ApiMessage<List<String>> registerPicture(@RequestParam("id")String id, @RequestPart("images") List<MultipartFile> images) throws IOException {
        List<String> urls = new ArrayList<>();
        for(MultipartFile file : images){
            String imageUrl = uploader.upload(file, "images");
            urls.add(imageUrl);
            User user = User.builder()
                    .pictureUrl(imageUrl)
                    .tokenId(id)
                    .build();
            userRepository.save(user);
        }

        return ApiMessage.RESPONSE(Status.OK,urls);
    }
}