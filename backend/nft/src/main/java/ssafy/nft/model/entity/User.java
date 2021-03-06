package ssafy.nft.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Getter @Builder
@AllArgsConstructor @NoArgsConstructor
public class User {

    @Id
    @GeneratedValue
    private Long id;

    private String tokenId;
    private String pictureUrl;
}
