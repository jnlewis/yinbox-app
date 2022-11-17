import { Tag } from 'core/entities/tags';
import { HTMLAttributes, ReactElement } from 'react';
import styles from './TagList.module.scss';

interface TagListProps extends HTMLAttributes<HTMLDivElement> {
  tags?: Tag[];
}

const TagList = ({ tags }: TagListProps): ReactElement => {
  return (
    tags &&
    tags.length && (
      <div className={styles.tagsWrapper}>
        {tags?.map((item: Tag, index: number) => {
          return (
            <span key={index} className={styles.tagsItem}>
              <a href={item.link} target="_blank">
                {item.name}
              </a>
            </span>
          );
        })}
      </div>
    )
  );
};

export default TagList;
