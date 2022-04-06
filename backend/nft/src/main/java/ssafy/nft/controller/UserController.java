package ssafy.nft.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ssafy.nft.component.Uploader;
import ssafy.nft.model.dto.ApiMessage;
import ssafy.nft.model.dto.UserApiRequest;
import ssafy.nft.model.dto.UserApiResponse;
import ssafy.nft.model.entity.User;
import ssafy.nft.model.enums.Status;
import ssafy.nft.model.repository.UserRepository;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final Uploader uploader;
    private final UserRepository userRepository;

    @PostMapping("/picture")
    public ApiMessage<List<String>> registerPicture(@RequestParam("id")String id, @RequestPart("images") MultipartFile file) throws IOException {
        System.out.println("post token id = " + id);
        List<String> urls = new ArrayList<>();
        String imageUrl = uploader.upload(file, "images");
        urls.add(imageUrl);
        User user = User.builder()
                .pictureUrl(imageUrl)
                .tokenId(id)
                .build();
        userRepository.save(user);
        return ApiMessage.RESPONSE(Status.OK,urls);
    }

    @GetMapping("/picture")
    public ApiMessage<UserApiResponse> getPicture(@RequestParam("id") String id){
        Optional<User> byTokenId = userRepository.findByTokenId(id);

        User user = byTokenId.orElseThrow(RuntimeException::new);

        UserApiResponse userApiResponse = UserApiResponse.builder()
                .pictureUrl(user.getPictureUrl())
                .build();

        return ApiMessage.RESPONSE(Status.OK,userApiResponse);
    }
}
