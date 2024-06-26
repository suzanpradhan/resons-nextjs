import { privacy_code } from '@/core/constants/appConstants';
import classNames from 'classnames';
import { Detective, GlobeHemisphereWest, LockSimple } from 'phosphor-react';

interface AddAudienceType {
  handleAudienceChange: (value: number) => void;
  privacy_value: string;
}

const PRIVACY_CODE_ICONS = [
  <GlobeHemisphereWest
    className="text-2xl max-[356px]:text-xl"
    weight="fill"
    key={0}
  />,
  <LockSimple className="text-2xl max-[356px]:text-xl" weight="fill" key={1} />,
  <Detective className="text-2xl max-[356px]:text-xl" weight="fill" key={1} />,
];

const PRIVACY_CODE_ELEMENTS = privacy_code.map((item, index) => {
  return {
    id: index,
    name: item.name,
    value: item.id,
    icon: PRIVACY_CODE_ICONS[index],
  };
});

const AddAudience = ({
  handleAudienceChange,
  privacy_value,
}: AddAudienceType) => {
  return (
    <div className="h-full flex flex-col">
      <div className="px-4 max-[356px]:px-3 py-2 border-b-2 bg-white text-base max-[356px]:text-sm">
        Post Audience
      </div>
      <div className="bg-white flex-1 overflow-y-scroll pb-14">
        {PRIVACY_CODE_ELEMENTS.map((item, index) => (
          <div key={index}>
            <label
              className={classNames(
                `mb-1 w-full flex items-center px-4 max-[356px]:px-3 py-3 font-normal text-base max-[356px]:text-sm`,
                Number(privacy_value) === item.id
                  ? 'bg-red-500'
                  : 'bg-whiteShade',
                Number(privacy_value) === item.id
                  ? 'text-white'
                  : 'text-dark-500'
              )}
              htmlFor={'privacy_code' + item.id}
            >
              {item.icon}
              <span className="ml-1">{item.name}</span>
            </label>
            <input
              hidden
              id={'privacy_code' + item.id}
              type="radio"
              name="privacy_code"
              value={item.id}
              onChange={() => handleAudienceChange(item.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddAudience;
