import { DotsSix, DotsThreeOutlineVertical, Play } from 'phosphor-react';
import { useDrag } from 'react-dnd';

// Define ItemTypes in the same file
export const ItemTypes = {
  BOX: 'box',
};

interface DraggableItemProps {
  name: string;
  index: number; // Add index to the props
  moveItem: (dragIndex: number, hoverIndex: number) => void; // Add moveItem to the props
}

const DraggableItem: React.FC<DraggableItemProps> = ({
  name,
  index,
  moveItem,
}) => {
  const [, drag] = useDrag({
    type: ItemTypes.BOX,
    item: { name, index },
  });

  return (
    <div
      ref={drag}
      className="group cursor-pointer p-2 m-2 flex justify-between"
    >
      <div className="flex items-center gap-2">
        <span className="w-9 h-9 bg-gray-700 rounded-full flex items-center justify-center">
          <Play size={21} weight="fill" className="text-white" />
        </span>
        <div className="flex flex-col">
          <p className="text-xs sm:text-sm text-gray-900 font-medium">{name}</p>
          <span className="text-xs font-light text-gray-690">
            Tommy Shaw • 4.51
          </span>
        </div>
      </div>

      <div className="w-4 hidden items-center justify-center group-hover:flex">
        <DotsThreeOutlineVertical size={32} weight="fill" />
      </div>
      <div className="w-4 flex items-center justify-center group-hover:hidden">
        <DotsSix size={32} />
      </div>
    </div>
  );
};

export default DraggableItem;
