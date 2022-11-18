import React, { useEffect, useState } from 'react';
import styles from './CardNFT.module.scss';
import classnames from 'classnames';
import NonFungible from 'modules/nonFungible/nonFungible';
import { Blockchains } from 'core/enums/blockchains';
import logger from 'core/logger/logger';
import { NonFungibleToken } from 'modules/nonFungible/types/nonFungibleToken';
import { formatTime } from 'core/helpers/datetimeHelper';

interface CardNFTProps {
  sender: string;
  content: string;
  align: 'left' | 'right';
  timestamp?: number;
}

const CardNFT = ({ sender, content, align, timestamp }: CardNFTProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isInvalid, setIsInvalid] = useState<boolean>(false);
  const [nft, setNFT] = useState<NonFungibleToken>();

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      setIsLoading(true);
      const contentJson: { contractAddress: string; tokenId: string } = JSON.parse(content);
      const nft = await NonFungible.getToken(
        Blockchains.NEAR,
        contentJson.contractAddress,
        Number(contentJson.tokenId),
      );

      if (!nft) {
        logger.logError('NFT', 'Could not find NFT');
        setIsInvalid(true);
        setIsLoading(false);
      } else {
        setNFT(nft);
        setIsInvalid(false);
        setIsLoading(false);
      }

    } catch (e) {
      logger.logError('NFT', 'Failed to load NFT', e);
      setIsInvalid(true);
      setIsLoading(false);
    }
  };

  return (
    <div className={classnames(align === 'left' ? styles.messageItemLeft : styles.messageItemRight)}>
      <div className={classnames('shadow p-3 bg-white', styles.messageItem)}>
        <div className={styles.userName}>
          <b>{sender}</b>
        </div>

        {isLoading && (
          <div className={styles.frame}>
            <div className={styles.title}>
              <span className={styles.pill}>NFT</span>
            </div>
            <div>Loading...</div>
          </div>
        )}

        {!isLoading && isInvalid && (
          <div className={styles.frame}>
            <div className={styles.title}>
              <span className={styles.pill}>NFT</span>
            </div>
            <div>Failed to load NFT</div>
          </div>
        )}

        {!isLoading && !isInvalid && (
          <>
            <div className={styles.frame}>
              <div className={styles.title}>
                <span className={styles.pill}>NFT</span> {nft.title} #{nft.tokenId}
              </div>
              <div>by {nft.contract.address}</div>
            </div>
            <div>
              <img
                className={styles.image}
                src={nft.mediaUrl}
                alt=""
              />
            </div>
            <div className={styles.tagsWrapper}>
              <span className={styles.tagsItem}>
                <a href="#" target="_blank">
                  View on NEAR
                </a>
              </span>
            </div>
          </>
        )}
      </div>
      {timestamp && (
        <div className={styles.timestamp}>{formatTime(new Date(timestamp))}</div>
      )}
    </div>
  );
};

export default CardNFT;
