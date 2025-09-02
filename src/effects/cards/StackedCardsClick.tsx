import React, { useState } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';

interface StackedCardsClickProps {
  cards: Array<{
    id: string;
    content: React.ReactNode;
    backContent?: React.ReactNode;
    backgroundColor?: string;
    image?: string;
  }>;
  clickAction?: 'shuffle' | 'expand' | 'flip' | 'swipe';
  springConfig?: { stiffness: number; damping: number };
  className?: string;
}

/**
 * Click and swipe interactions for stacked cards
 * Supports shuffle, expand, flip, and swipe gestures
 */
export const StackedCardsClick: React.FC<StackedCardsClickProps> = ({
  cards: initialCards,
  clickAction = 'shuffle',
  springConfig = { stiffness: 200, damping: 25 },
  className = '',
}) => {
  const [cards, setCards] = useState(initialCards);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());
  const [swipedCards, setSwipedCards] = useState<Set<string>>(new Set());

  const handleShuffle = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
  };

  const handleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleFlip = (cardId: string) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });
  };

  const handleSwipe = (cardId: string, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 100) {
      setSwipedCards(prev => new Set(prev).add(cardId));
      setTimeout(() => {
        setCards(prev => prev.filter(c => c.id !== cardId));
        setSwipedCards(prev => {
          const newSet = new Set(prev);
          newSet.delete(cardId);
          return newSet;
        });
      }, 300);
    }
  };

  const getClickHandler = (card: any, index: number) => {
    switch (clickAction) {
      case 'shuffle':
        return handleShuffle;
      case 'expand':
        return () => handleExpand(index);
      case 'flip':
        return () => handleFlip(card.id);
      default:
        return () => {};
    }
  };

  return (
    <div
      className={`stacked-cards-click ${className}`}
      style={{
        position: 'relative',
        height: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: '1200px',
      }}
    >
      <AnimatePresence mode="popLayout">
        {cards.map((card, index) => {
          const isExpanded = expandedIndex === index;
          const isFlipped = flippedCards.has(card.id);
          const isSwiped = swipedCards.has(card.id);
          const visibleIndex = cards.filter(c => !swipedCards.has(c.id)).indexOf(card);

          return (
            <motion.div
              key={card.id}
              layout
              className="stacked-card-click"
              onClick={getClickHandler(card, index)}
              drag={clickAction === 'swipe'}
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={1}
              onDragEnd={(_, info) => {
                if (clickAction === 'swipe') {
                  handleSwipe(card.id, info);
                }
              }}
              initial={{ 
                scale: 0.8, 
                opacity: 0,
                y: 100,
              }}
              animate={{
                scale: isExpanded ? 1.2 : 1 - visibleIndex * 0.05,
                opacity: isSwiped ? 0 : 1,
                y: isExpanded ? 0 : visibleIndex * 30,
                x: isSwiped ? 500 : 0,
                rotateY: isFlipped ? 180 : 0,
                zIndex: isExpanded ? 100 : cards.length - visibleIndex,
              }}
              exit={{
                scale: 0.5,
                opacity: 0,
                transition: { duration: 0.3 },
              }}
              transition={{ type: 'spring', ...springConfig }}
              style={{
                position: 'absolute',
                width: isExpanded ? '100%' : '90%',
                maxWidth: isExpanded ? '900px' : '600px',
                height: isExpanded ? '90%' : '400px',
                borderRadius: '20px',
                overflow: 'hidden',
                background: card.backgroundColor || '#ffffff',
                boxShadow: isExpanded 
                  ? '0 50px 100px -20px rgba(0,0,0,0.5)'
                  : `0 ${20 + visibleIndex * 10}px ${40 + visibleIndex * 10}px -10px rgba(0,0,0,${0.3 - visibleIndex * 0.05})`,
                cursor: clickAction === 'swipe' ? 'grab' : 'pointer',
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden',
              }}
              whileHover={{
                scale: isExpanded ? 1.2 : (1 - visibleIndex * 0.05) * 1.02,
                y: isExpanded ? 0 : visibleIndex * 30 - 5,
              }}
              whileTap={{
                scale: isExpanded ? 1.18 : (1 - visibleIndex * 0.05) * 0.98,
              }}
              whileDrag={{
                scale: 1.05,
                cursor: 'grabbing',
              }}
            >
              {/* Front face */}
              <div
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  backfaceVisibility: 'hidden',
                }}
              >
                {/* Glass morphism overlay */}
                <motion.div
                  className="glass-overlay"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: `linear-gradient(135deg, 
                      rgba(255,255,255,0.1) 0%, 
                      rgba(255,255,255,0.05) 100%)`,
                    backdropFilter: 'blur(10px)',
                    opacity: 0.5,
                  }}
                />
                
                {/* Card content */}
                {card.image && (
                  <img
                    src={card.image}
                    alt=""
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                )}
                
                <div
                  className="card-content"
                  style={{
                    position: 'relative',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '3rem',
                    zIndex: 1,
                  }}
                >
                  {card.content}
                </div>

                {/* Action indicators */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '2rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'center',
                  }}
                >
                  {clickAction === 'shuffle' && (
                    <motion.div
                      style={{
                        padding: '0.5rem 1rem',
                        background: 'rgba(255,255,255,0.2)',
                        borderRadius: '20px',
                        fontSize: '0.9rem',
                        color: 'white',
                        backdropFilter: 'blur(10px)',
                      }}
                      whileHover={{ scale: 1.1 }}
                    >
                      Click to Shuffle
                    </motion.div>
                  )}
                  {clickAction === 'expand' && (
                    <motion.div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backdropFilter: 'blur(10px)',
                      }}
                      whileHover={{ scale: 1.2 }}
                    >
                      {isExpanded ? '−' : '+'}
                    </motion.div>
                  )}
                  {clickAction === 'flip' && (
                    <motion.div
                      style={{
                        padding: '0.5rem 1rem',
                        background: 'rgba(255,255,255,0.2)',
                        borderRadius: '20px',
                        fontSize: '0.9rem',
                        color: 'white',
                        backdropFilter: 'blur(10px)',
                      }}
                      whileHover={{ scale: 1.1 }}
                    >
                      Click to Flip
                    </motion.div>
                  )}
                  {clickAction === 'swipe' && (
                    <motion.div
                      style={{
                        padding: '0.5rem 1rem',
                        background: 'rgba(255,255,255,0.2)',
                        borderRadius: '20px',
                        fontSize: '0.9rem',
                        color: 'white',
                        backdropFilter: 'blur(10px)',
                      }}
                    >
                      Swipe Away →
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Back face (for flip action) */}
              {clickAction === 'flip' && (
                <div
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '3rem',
                  }}
                >
                  {card.backContent || (
                    <div style={{ textAlign: 'center', color: 'white' }}>
                      <h3>Back Side</h3>
                      <p>Additional information here</p>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Shuffle indicator animation */}
      {clickAction === 'shuffle' && (
        <motion.div
          className="shuffle-indicator"
          style={{
            position: 'absolute',
            bottom: '2rem',
            pointerEvents: 'none',
          }}
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          🔀
        </motion.div>
      )}
    </div>
  );
};