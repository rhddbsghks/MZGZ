package ssafy.nft.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.nft.model.entity.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findByTokenId(String tokenId);
}
