'use client';

import update from "immutability-helper";
import { useCallback } from "react";
import Card from "./Card";

interface CardItem {
  id: string;
  text?: string;
  // Add other properties as needed based on your card structure
}

interface ContainerProps {
  setImageUrl: React.Dispatch<React.SetStateAction<CardItem[]>>;
  imageUrl: CardItem[];
  handleRemoveImage: (image: CardItem) => void;
}

const Container = ({ setImageUrl, imageUrl, handleRemoveImage }: ContainerProps) => {
  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      setImageUrl((prevCards: CardItem[]) =>
        update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex]],
          ],
        })
      );
    },
    [setImageUrl]
  );

  const renderCard = useCallback(
    (card: CardItem, i: number) => {
      return (
        <Card
          key={i + 1}
          index={i}
          id={card.id}
          text={card.text}
          moveCard={moveCard}
          image={card}
          handleRemoveImage={handleRemoveImage}
        />
      );
    },
    [moveCard, handleRemoveImage]
  );
  
  return <>{imageUrl.map((card, i) => renderCard(card, i))}</>;
};

export default Container;