package ssafy.nft.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.nft.model.entity.User;

public interface UserRepository extends JpaRepository<User,Long> {
}
