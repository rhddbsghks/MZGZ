import React from "react";
import { Image } from "@chakra-ui/react";

const AnimalCard = ({ animalType }) => {
  return (
    <Image
      w={150}
      h={150}
      src={`img/${animalType}.png`}
      alt="AnimalCard"
    ></Image>
  );
};

export default AnimalCard;
