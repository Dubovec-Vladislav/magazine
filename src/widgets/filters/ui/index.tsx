// General
import React, { FC } from 'react'
import style from './index.module.scss'
import filters from '../img/filters.svg'
// Components
import { ColorSelectionLine } from 'features/color-selection-line'
import { SizeSelectionLine } from 'features/size-selection-line'
// Api
import { ClothingInterface } from 'app/api'
import { InputRange } from 'shared/ui'

interface FiltersProps {
  data: ClothingInterface[] | undefined,
  sortedData: ClothingInterface[] | undefined,
  isLoading: boolean,
  selectedColorsList: string[],
  changeSelectedColorsList: (newList: string[]) => void,
  selectedSizesList: number[],
  changeSelectedSizesList: (newList: number[]) => void,
}

export const Filters: FC<FiltersProps> = (
  { data, sortedData, isLoading,
    selectedColorsList, changeSelectedColorsList,
    selectedSizesList, changeSelectedSizesList }
) => {
  const colorsList: string[] = [];
  const sizesList: number[] = [];
  data?.forEach(item => colorsList.push(item.imageObjects[0].color)); // Get all colors of clothing on the page
  sortedData?.forEach(item => item.sizesList.forEach(size => !sizesList.includes(size) && sizesList.push(size))); // Get all sizes of clothing on the page

  const handleColorClick = (i: number) => {
    const color = colorsList[i];
    selectedColorsList.includes(color)
      ? changeSelectedColorsList(selectedColorsList.filter(item => item !== color)) // If includes, remove it
      : changeSelectedColorsList([...selectedColorsList, color]) // if not included, expand the old array and add a new element
  };

  const handleSizeClick = (i: number) => {
    const size = sizesList[i];
    selectedSizesList.includes(size)
      ? changeSelectedSizesList(selectedSizesList.filter(item => item !== size)) // If includes, remove it
      : changeSelectedSizesList([...selectedSizesList, size]) // if not included, expand the old array and add a new element
  };

  return (
    <section className={style.block}>
      <div className={style.body}>
        <div className={style.item}>
          <div className={style.title}><span>Фильтры</span><img src={filters} alt="filters" /></div>
        </div>
        <div className={style.item}>
          <div className={style.title}>Цена</div>
          <InputRange />
        </div>
        <div className={style.item}>
          <div className={style.title}>Расцветки</div>
          {isLoading
            ? <div>Идет загрузка расцветок...</div>
            : colorsList
              ? <ColorSelectionLine
                colorsList={colorsList}
                selectedColorsList={selectedColorsList}
                handleColorClick={handleColorClick}
              />
              : <div>Упс... кажется что-то пошло не так</div>
          }
        </div>
        <div className={style.item}>
          <div className={style.title}>Размер</div>
          {isLoading
            ? <div>Идет загрузка размеров...</div>
            : colorsList
              ? <SizeSelectionLine
                sizesList={sizesList.sort()}
                selectedSizesList={selectedSizesList}
                handleSizeClick={handleSizeClick}
              />
              : <div>Упс... кажется что-то пошло не так</div>
          }
        </div>
        <div className={style.item}>
          <div className={style.title}>Другие категории</div>
          {/* <SizeSelectionLine /> */}
        </div>
      </div>
    </section>
  );
};